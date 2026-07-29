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
      recentPosts: catPosts.slice(0, 3), // Show up to 3 for better visuals
    };
  });

  return (
    <div className="fly-categories-page w-full space-y-12 transition-all duration-350 pb-16">
      {/* 顶部超大排版 Hero 区 */}
      <header className="relative flex flex-col items-center justify-center py-24 overflow-hidden rounded-3xl bg-[var(--page-alt)] border border-[var(--line)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-[var(--page)] text-[var(--text)] border border-[var(--line)] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Topic Taxonomy
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-[var(--text)]">
            知识拓扑
          </h1>
          <p className="text-sm sm:text-base font-medium text-[var(--muted)] max-w-xl">
            构建结构化的技术栈体系，共计 {categories.length} 个主要领域。
          </p>
        </div>
        
        {/* 背景大字 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] font-black tracking-tighter text-[var(--line)] opacity-20 pointer-events-none select-none mix-blend-overlay">
          CATEGORIES
        </div>
      </header>

      {/* 分类网格 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categoriesWithPosts.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${encodeURIComponent(cat.slug)}/`}
            className="group relative flex flex-col h-full bg-[var(--page)] rounded-3xl border border-[var(--line)] hover:border-[var(--accent)]/50 shadow-sm hover:shadow-2xl hover:shadow-[var(--accent)]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* 巨大背景数字水印 */}
            <div className="absolute -right-4 -bottom-4 text-[8rem] font-black leading-none text-[var(--line)] group-hover:text-[var(--accent)]/5 transition-colors duration-500 pointer-events-none select-none">
              {cat.count.toString().padStart(2, '0')}
            </div>

            {/* 顶部彩色强调线 */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-10">
              <div className="flex items-start justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {cat.name}
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--page-alt)] border border-[var(--line)] text-[var(--muted)] shrink-0 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-transparent transition-all">
                  {cat.count} POSTS
                </span>
              </div>

              {/* 分类下最新文章极简预览 */}
              <div className="space-y-3 mt-auto">
                <h3 className="text-xs font-bold text-[var(--mute)] uppercase tracking-wider mb-2">Recent Notes</h3>
                {cat.recentPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-center gap-3 group/post"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--line)] group-hover/post:bg-[var(--accent)] transition-colors"></div>
                    <span className="text-sm font-medium text-[var(--muted)] group-hover/post:text-[var(--text)] line-clamp-1 transition-colors">
                      {post.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* 底部悬停提示 (仅在 Hover 时显现) */}
              <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="w-10 h-10 rounded-full bg-[var(--text)] text-[var(--page)] flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
