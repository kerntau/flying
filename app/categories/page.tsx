import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Folder, ArrowRight, Layers } from "lucide-react";

export const metadata = pageMetadata({
  title: "全部分类",
  description: "探索知识拓扑，按主题分类阅读深度技术文章。",
  path: "/categories/",
});

// 精心调配的现代化极简色彩系统
const COLOR_THEMES = [
  {
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    glow: "from-sky-500/15 via-sky-500/5 to-transparent",
    icon: "text-sky-500",
    hoverBorder: "group-hover:border-sky-500/30",
  },
  {
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    glow: "from-violet-500/15 via-violet-500/5 to-transparent",
    icon: "text-violet-500",
    hoverBorder: "group-hover:border-violet-500/30",
  },
  {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    glow: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    icon: "text-emerald-500",
    hoverBorder: "group-hover:border-emerald-500/30",
  },
  {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    glow: "from-amber-500/15 via-amber-500/5 to-transparent",
    icon: "text-amber-500",
    hoverBorder: "group-hover:border-amber-500/30",
  },
  {
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    glow: "from-rose-500/15 via-rose-500/5 to-transparent",
    icon: "text-rose-500",
    hoverBorder: "group-hover:border-rose-500/30",
  },
  {
    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    glow: "from-teal-500/15 via-teal-500/5 to-transparent",
    icon: "text-teal-500",
    hoverBorder: "group-hover:border-teal-500/30",
  },
];

export default function CategoriesPage() {
  const categories = getAllCategories();
  const allPosts = getAllPosts();

  const categoriesWithPosts = categories.map((cat, index) => {
    const catPosts = allPosts.filter(
      (p) => p.category === cat.name || p.category === cat.slug
    );
    const theme = COLOR_THEMES[index % COLOR_THEMES.length];

    return {
      ...cat,
      theme,
      recentPosts: catPosts.slice(0, 3),
    };
  });

  return (
    <div className="fly-categories-page w-full space-y-6 sm:space-y-8 py-0.5 pb-8 select-none">
      {/* 1. 页头 */}
      <header className="flex items-center justify-between border-b border-[var(--line)]/20 pb-3">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-[var(--accent)] opacity-85" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
            分类展台
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{categories.length} 个主题领域</span>
          <span>·</span>
          <span>{allPosts.length} 篇文章</span>
        </div>
      </header>

      {/* 2. 现代 3D 渐变底晕展台网格 (Hero Color Tiles) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {categoriesWithPosts.map((cat) => (
          <div
            key={cat.slug}
            className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[var(--page-alt)]/35 hover:bg-[var(--page-alt)]/75 border border-[var(--line)]/20 ${cat.theme.hoverBorder} transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-md overflow-hidden`}
          >
            {/* 卡片右上角微妙渐变光晕 */}
            <div className={`pointer-events-none absolute right-0 top-0 w-48 h-48 bg-gradient-to-bl ${cat.theme.glow} opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full`} />

            <div>
              {/* 卡片头部：分类图标 + 标题 + Count Badge */}
              <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
                <Link
                  href={`/categories/${encodeURIComponent(cat.slug)}/`}
                  className="flex items-center gap-2.5 min-w-0"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--page)] border border-[var(--line)]/40 ${cat.theme.icon} shadow-2xs group-hover:scale-105 transition-transform duration-200`}>
                    <Folder size={18} />
                  </div>
                  <h2 className="text-base sm:text-lg font-extrabold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {cat.name}
                  </h2>
                </Link>

                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${cat.theme.badge} shrink-0`}>
                  {cat.count} 篇
                </span>
              </div>

              {/* 卡片中部：精选文章单行卡片 */}
              {cat.recentPosts.length > 0 && (
                <div className="space-y-1.5 my-3 relative z-10">
                  {cat.recentPosts.map((post) => {
                    const dateStr = post.pubDate ? format(new Date(post.pubDate), "MM-dd") : "";
                    return (
                      <Link
                        key={post.slug}
                        href={`/posts/${post.slug}/`}
                        className="flex items-center justify-between gap-3 py-1.5 px-2.5 rounded-lg bg-[var(--page)]/60 hover:bg-[var(--page)] text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors group/item shadow-2xs"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]/40 group-hover/item:bg-[var(--accent)] transition-colors shrink-0" />
                          <span className="truncate font-medium group-hover/item:translate-x-0.5 transition-transform">
                            {post.title}
                          </span>
                        </div>
                        {dateStr && (
                          <time className="shrink-0 font-mono text-[11px] opacity-60">
                            {dateStr}
                          </time>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 卡片底部：进入分类按钮 */}
            <div className="pt-3 border-t border-[var(--line)]/15 flex items-center justify-between text-xs relative z-10">
              <span className="font-mono text-[11px] text-[var(--muted)] opacity-70">
                主题 ID: #{cat.slug}
              </span>
              <Link
                href={`/categories/${encodeURIComponent(cat.slug)}/`}
                className="inline-flex items-center gap-1.5 font-bold text-[var(--accent)] hover:underline group/btn"
              >
                <span>探索主题 ({cat.count})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
