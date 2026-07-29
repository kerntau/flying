import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { site, authors, links } from "@/data/site";
import type { Post, Photo, Moment, Author, Link } from "./types";

const contentDir = path.join(process.cwd(), "app", "content");

// --- Posts ---
export function getAllPosts(): Post[] {
  const postsDir = path.join(contentDir, "posts");
  if (!fs.existsSync(postsDir)) return [];

  const fileNames = fs.readdirSync(postsDir);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const title = data.title || slug;
      const category = data.category || "默认分类";
      const tags = Array.isArray(data.tags) ? data.tags : [];

      const ogParams = new URLSearchParams();
      ogParams.set("title", title);
      ogParams.set("category", category);
      if (tags.length > 0) {
        ogParams.set("tags", tags.slice(0, 3).join(","));
      }
      const ogCover = `/api/og?${ogParams.toString()}`;

      return {
        slug,
        title,
        description: data.description || "",
        pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString(),
        updatedDate: data.updatedDate ? new Date(data.updatedDate).toISOString() : undefined,
        cover: ogCover,
        category,
        tags,
        author: data.author || site.author,
        content,
      } as Post;
    });

  // Sort by pubDate descending
  return posts.sort((a, b) => (new Date(a.pubDate) > new Date(b.pubDate) ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  const decodedSlug = decodeURIComponent(slug);
  return posts.find((p) => p.slug === slug || p.slug === decodedSlug);
}

// --- Categories & Tags ---
export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  posts.forEach((p) => {
    const cat = p.category || "默认分类";
    map.set(cat, (map.get(cat) || 0) + 1);
  });

  return Array.from(map.entries()).map(([name, count]) => ({
    name,
    slug: name,
    count,
  }));
}

export function getAllTags(): { name: string; slug: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  posts.forEach((p) => {
    p.tags.forEach((tag) => {
      map.set(tag, (map.get(tag) || 0) + 1);
    });
  });

  return Array.from(map.entries()).map(([name, count]) => ({
    name,
    slug: name,
    count,
  }));
}

// --- Photos ---
export function getAllPhotos(): Photo[] {
  const photosDir = path.join(contentDir, "photos");
  if (!fs.existsSync(photosDir)) return [];

  const fileNames = fs.readdirSync(photosDir);
  const photos = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const slug = fileName.replace(/\.json$/, "");
      const fullPath = path.join(photosDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const data = JSON.parse(fileContents);

      return {
        slug,
        title: data.title || slug,
        url: data.url || "",
        description: data.description || "",
        group: data.group || "日常纪行",
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      } as Photo;
    });

  return photos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function getPhotoBySlug(slug: string): Photo | undefined {
  const photos = getAllPhotos();
  const decodedSlug = decodeURIComponent(slug);
  return photos.find((p) => p.slug === slug || p.slug === decodedSlug);
}

// --- Moments ---
export function getAllMoments(): Moment[] {
  const momentsDir = path.join(contentDir, "moments");
  if (!fs.existsSync(momentsDir)) return [];

  const fileNames = fs.readdirSync(momentsDir);
  const moments = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const slug = fileName.replace(/\.json$/, "");
      const fullPath = path.join(momentsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const data = JSON.parse(fileContents);

      return {
        slug,
        content: data.content || "",
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        tags: Array.isArray(data.tags) ? data.tags : [],
      } as Moment;
    });

  return moments.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function getMomentBySlug(slug: string): Moment | undefined {
  const moments = getAllMoments();
  const decodedSlug = decodeURIComponent(slug);
  return moments.find((m) => m.slug === slug || m.slug === decodedSlug);
}

// --- Authors & Links ---
export function getAuthors(): Author[] {
  return authors;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  const decodedSlug = decodeURIComponent(slug);
  return authors.find((a) => a.slug === slug || a.slug === decodedSlug);
}

export function getLinks(): Link[] {
  return links;
}
