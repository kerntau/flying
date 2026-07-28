import React from "react";
import Link from "next/link";
import { getAllCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "分类", description: "按主题浏览内容。", path: "/categories/" });

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="fly-categories-page max-w-4xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">全部分类</h1>
        <p className="text-sm text-[var(--muted)] mt-1">共有 {categories.length} 个文章分类</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${encodeURIComponent(cat.slug)}/`}
            className="flex items-center justify-between p-5 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] hover:border-[var(--accent)] hover:shadow-md transition-all group"
          >
            <span className="font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {cat.name}
            </span>
            <span className="px-2.5 py-1 text-xs rounded-full bg-[var(--page)] text-[var(--muted)] font-medium">
              {cat.count} 篇
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
