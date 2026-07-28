import React from "react";
import Link from "next/link";
import { getAllTags } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "标签", description: "使用标签探索内容。", path: "/tags/" });

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="fly-tags-page max-w-4xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">文章标签</h1>
        <p className="text-sm text-[var(--muted)] mt-1">共有 {tags.length} 个标签</p>
      </header>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${encodeURIComponent(tag.slug)}/`}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <span>#{tag.name}</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--page)] text-[var(--mute)]">
              {tag.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
