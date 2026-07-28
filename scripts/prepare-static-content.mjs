import { access, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const root = process.cwd();
const contentRoot = path.join(root, "app", "content");
const publicRoot = path.join(root, "public");
const failures = [];

const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  cover: z.string().optional(),
  category: z.string().min(1).default("默认分类"),
  tags: z.array(z.string()).default([]),
  author: z.string().min(1).default("Kerntau"),
});
const photoSchema = z.object({ title: z.string().min(1), url: z.string().min(1), description: z.string().optional(), group: z.string().min(1).default("日常纪行"), date: z.coerce.date() });
const momentSchema = z.object({ content: z.string().min(1), date: z.coerce.date(), tags: z.array(z.string()).default([]) });

const normalize = (pathname) => pathname.endsWith("/") ? pathname : `${pathname}/`;
const internalRoutes = new Set(["/", "/about/", "/archives/", "/authors/", "/categories/", "/links/", "/moments/", "/photos/", "/tags/"]);

async function collectionFiles(directory, extension) {
  return (await readdir(path.join(contentRoot, directory), { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension));
}

async function verifyAsset(value, source) {
  if (!value?.startsWith("/assets/")) return;
  try { await access(path.join(publicRoot, value)); } catch { failures.push(`${source}: missing local asset ${value}`); }
}

function verifyLinks(markdown, source) {
  for (const match of markdown.matchAll(/!?\[[^\]]*\]\(([^\s)]+)/g)) {
    const target = match[1].replace(/["']/g, "").split(/[?#]/)[0];
    if (!target.startsWith("/") || target.startsWith("//") || target.startsWith("/assets/")) continue;
    if (!internalRoutes.has(normalize(target))) failures.push(`${source}: broken internal link ${target}`);
  }
}

const posts = [];
const seenPostSlugs = new Set();
for (const file of await collectionFiles("posts", ".md")) {
  const slug = file.name.slice(0, -3);
  if (seenPostSlugs.has(slug)) failures.push(`duplicate post slug: ${slug}`);
  seenPostSlugs.add(slug);
  internalRoutes.add(`/posts/${slug}/`);
  try {
    const parsed = matter(await readFile(path.join(contentRoot, "posts", file.name), "utf8"));
    const data = postSchema.parse(parsed.data);
    await verifyAsset(data.cover, file.name);
    posts.push({ slug, ...data });
    verifyLinks(parsed.content, file.name);
  } catch (error) { failures.push(`${file.name}: ${error instanceof Error ? error.message : String(error)}`); }
}

for (const [directory, schema] of [["photos", photoSchema], ["moments", momentSchema]]) {
  const seen = new Set();
  for (const file of await collectionFiles(directory, ".json")) {
    const slug = file.name.slice(0, -5);
    if (seen.has(slug)) failures.push(`duplicate ${directory} slug: ${slug}`);
    seen.add(slug);
    internalRoutes.add(`/${directory}/${slug}/`);
    try {
      const data = schema.parse(JSON.parse(await readFile(path.join(contentRoot, directory, file.name), "utf8")));
      if (directory === "photos") await verifyAsset(data.url, file.name);
    } catch (error) { failures.push(`${file.name}: ${error instanceof Error ? error.message : String(error)}`); }
  }
}

if (failures.length) {
  console.error("Static content validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
await writeFile(path.join(publicRoot, "search-index.json"), JSON.stringify(posts.map(({ slug, title, category, description }) => ({ slug, title, category, description }))), "utf8");

const siteUrl = "https://blog.cot.wiki";
const lastBuildDate = posts.reduce((latest, post) => Math.max(latest, (post.updatedDate ?? post.pubDate).getTime()), 0);
const items = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}/</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}/</guid>
      <description><![CDATA[${post.description || post.title}]]></description>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`).join("");
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[序栈]]></title>
    <description><![CDATA[用理性梳理日常，用技术温柔时光，不慌不忙，自在生长。]]></description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;
await writeFile(path.join(publicRoot, "rss.xml"), rss, "utf8");
console.log(`Validated ${posts.length} posts and generated static search and RSS data.`);
