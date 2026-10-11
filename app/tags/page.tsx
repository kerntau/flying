import React from "react";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "文章标签",
  description: "按关键词浏览序栈记录的技术文章。",
  path: "/tags/",
});

export default function TagsPage() {
  const tags = getAllTags().sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  const posts = getAllPosts();

  return (
    <div className="fly-tags-page w-full space-y-6 pb-8 sm:space-y-8">
      <header className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="text-xs font-medium text-[var(--muted)]">内容索引</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--text)]">标签</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">用关键词找到相近的文章，共 {posts.length} 篇。</p>
        </div>
        <span className="shrink-0 text-xs font-mono text-[var(--muted)]">{tags.length} 个标签</span>
      </header>

      <section aria-labelledby="tags-title">
        <h2 id="tags-title" className="sr-only">全部标签</h2>
        <div className="flex flex-wrap gap-x-2 gap-y-2.5 sm:gap-x-3">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}/`}
              className="group inline-flex items-center gap-1 rounded-lg border border-[var(--line)]/70 bg-[var(--page-alt)]/35 px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--page-alt)] hover:text-[var(--text)]"
            >
              <span className="text-[var(--accent)]/75">#</span>
              <span>{tag.name}</span>
              <span className="font-mono text-[10px] text-[var(--muted)]/75 group-hover:text-[var(--accent)]">{tag.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
