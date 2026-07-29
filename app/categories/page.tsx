import React from "react";
import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "全部分类", description: "探索知识拓扑，按主题分类阅读深度技术文章。", path: "/categories/" });

export default function CategoriesPage() {
  const categories = getAllCategories();
  const allPosts = getAllPosts();

  // 为每个分类获取精选文章 preview
  const categoriesWithPosts = categories.map((cat) => {
    const catPosts = allPosts.filter((p) => p.category === cat.name || p.category === cat.slug);
    return {
      ...cat,
      recentPosts: catPosts.slice(0, 2),
    };
  });

  return (
    <div className="fly-categories-page w-full max-w-6xl mx-auto space-y-8 sm:space-y-10 transition-all duration-350">
      {/* 顶部 Hero Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--page-alt)] via-[var(--page)] to-[var(--page-alt)] p-6 sm:p-8 border border-[var(--line)] shadow-xs">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent)]/10 text-[var(--accent)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            TOPIC TAXONOMY
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--text)]">
            全部分类
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl">
            精准构建知识结构体系，涵盖人工智能、安全攻防、算法演进与基础建设等多重领域。
          </p>
        </div>
      </header>

      {/* 分类网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categoriesWithPosts.map((cat) => (
          <div
            key={cat.slug}
            className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[var(--page)] border border-[var(--line)] hover:border-[var(--accent)]/50 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* 背景修饰装饰圈 */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[var(--accent)]/5 group-hover:bg-[var(--accent)]/10 transition-colors pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  <Link href={`/categories/${encodeURIComponent(cat.slug)}/`}>
                    {cat.name}
                  </Link>
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                  {cat.count} 篇
                </span>
              </div>

              {/* 分类下最新 2 篇文章极简预览 */}
              <div className="space-y-2 pt-1">
                {cat.recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}/`}
                    className="block text-xs text-[var(--muted)] hover:text-[var(--text)] line-clamp-1 transition-colors pl-2.5 border-l-2 border-[var(--line)] hover:border-[var(--accent)]"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* 底部跳转连接 */}
            <div className="pt-5 mt-4 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
              <Link
                href={`/categories/${encodeURIComponent(cat.slug)}/`}
                className="inline-flex items-center gap-1 hover:underline"
              >
                <span>探索此分类</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
