import { access, readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = join(root, "app", "content");
const outputRoot = join(root, "out");
const siteUrl = "https://curn.me";
const baseRoutes = ["/", "/about/", "/archives/", "/authors/", "/categories/", "/links/", "/moments/", "/photos/", "/tags/"];

async function exists(filename) {
  try {
    await access(filename);
    return true;
  } catch {
    return false;
  }
}

async function files(directory, extension) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name);
}

async function collectOutputPages(directory, pages = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name);
    if (entry.isDirectory()) await collectOutputPages(filename, pages);
    else if (entry.name === "index.html") pages.push(filename);
  }
  return pages;
}

const postFiles = await files(join(contentRoot, "posts"), ".md");
const posts = await Promise.all(postFiles.map(async (filename) => {
  const parsed = matter(await readFile(join(contentRoot, "posts", filename), "utf8"));
  return {
    category: parsed.data.category || "默认分类",
    slug: filename.slice(0, -3),
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
  };
}));

const authorSource = await readFile(join(root, "app", "data", "site.ts"), "utf8");
const authors = [...authorSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const photos = (await files(join(contentRoot, "photos"), ".json")).map((filename) => filename.slice(0, -5));
const moments = (await files(join(contentRoot, "moments"), ".json")).map((filename) => filename.slice(0, -5));
const categories = [...new Set(posts.map((post) => post.category))];
const tags = [...new Set(posts.flatMap((post) => post.tags))];

const expectedRoutes = new Set([
  ...baseRoutes,
  ...posts.map((post) => `/posts/${post.slug}/`),
  ...categories.map((category) => `/categories/${category}/`),
  ...tags.map((tag) => `/tags/${tag}/`),
  ...authors.map((author) => `/authors/${author}/`),
  ...photos.map((photo) => `/photos/${photo}/`),
  ...moments.map((moment) => `/moments/${moment}/`),
]);

const outputPages = await collectOutputPages(outputRoot);
const actualRoutes = new Map(outputPages.map((filename) => {
  const directory = relative(outputRoot, dirname(filename)).replaceAll("\\", "/");
  return [directory ? `/${directory}/` : "/", filename];
}));
actualRoutes.delete("/404/");

const missingRoutes = [...expectedRoutes].filter((route) => !actualRoutes.has(route));
const unexpectedRoutes = [...actualRoutes.keys()].filter((route) => !expectedRoutes.has(route));
const failures = [];

if (missingRoutes.length) failures.push(`Missing static routes: ${missingRoutes.join(", ")}`);
if (unexpectedRoutes.length) failures.push(`Unexpected static routes: ${unexpectedRoutes.join(", ")}`);

for (const [route, filename] of actualRoutes) {
  const html = await readFile(filename, "utf8");
  const absoluteRoute = new URL(encodeURI(route), siteUrl).href;
  if (!html.includes(`<link rel="canonical" href="${absoluteRoute}"`)) {
    failures.push(`${route}: canonical URL is missing or incorrect`);
  }
  if (!html.includes(`<meta property="og:url" content="${absoluteRoute}"`)) {
    failures.push(`${route}: Open Graph URL is missing or incorrect`);
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next/")) continue;
    const pathname = decodeURIComponent(href.split(/[?#]/, 1)[0]);
    const relativePath = pathname.replace(/^\/+/, "");
    const target = pathname.endsWith("/")
      ? join(outputRoot, relativePath, "index.html")
      : join(outputRoot, relativePath);
    if (!(await exists(target))) failures.push(`${route}: broken internal href ${href}`);
  }
}

if (failures.length) {
  console.error("Static output regression failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Verified ${expectedRoutes.size} static routes, canonical metadata, Open Graph URLs, and internal links.`);
