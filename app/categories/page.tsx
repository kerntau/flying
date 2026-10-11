import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "全部分类",
  description: "按主题浏览序栈记录的技术文章。",
  path: "/categories/",
});

export default function CategoriesPage() {
  const categories = getAllCategories();
  const posts = getAllPosts();

  return (
    <div className="fly-categories-page w-full space-y-6 pb-8 sm:space-y-8">
      <header className="flex items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="text-xs font-medium text-[var(--muted)]">内容索引</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--text)]">分类</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">按主题浏览文章，共 {posts.length} 篇。</p>
        </div>
        <span className="shrink-0 text-xs font-mono text-[var(--muted)]">{categories.length} 个分类</span>
      </header>

      <section aria-labelledby="categories-title">
        <h2 id="categories-title" className="sr-only">全部分类</h2>
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}/`}
                className="group flex min-h-20 items-center gap-4 px-2 py-4 transition-colors hover:bg-[var(--page-alt)]/45 sm:px-4"
              >
                <span className="w-7 shrink-0 text-xs font-mono text-[var(--muted)]/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                    {category.name}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-[var(--muted)]">{category.count} 篇</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                  strokeWidth={1.8}
                />
              </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
