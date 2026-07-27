import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;
export type Photo = CollectionEntry<"photos">;

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

export function sortPhotos(photos: Photo[]): Photo[] {
  return [...photos].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export function makeSlug(value: string): string {
  if (/[^\x00-\x7F]/.test(value)) {
    return encodeURIComponent(value).replace(/%/g, "").toLowerCase();
  }

  const ascii = value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return ascii;
}

export function postUrl(post: Post): string {
  return `/posts/${post.id}/`;
}

export function categoryUrl(category: string): string {
  return `/categories/${makeSlug(category)}/`;
}

export function tagUrl(tag: string): string {
  return `/tags/${makeSlug(tag)}/`;
}

export function getCategories(posts: Post[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.data.category, (counts.get(post.data.category) || 0) + 1);
  }

  return Array.from(counts, ([name, count]) => ({
    count,
    name,
    slug: makeSlug(name),
  })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getTags(posts: Post[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return Array.from(counts, ([name, count]) => ({
    count,
    name,
    slug: makeSlug(name),
  })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
