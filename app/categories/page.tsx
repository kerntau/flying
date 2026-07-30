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

export default function CategoriesPage() {
  const categories = getAllCategories();
  const allPosts = getAllPosts();

  // 为每个分类获取文章 preview 与 编号
  const categoriesWithPosts = categories.map((cat, index) => {
    const catPosts = allPosts.filter(
      (p) => p.category === cat.name || p.category === cat.slug
    );
    return {
      ...cat,
      indexNumber: (index + 1).toString().padStart(2, "0"),
      recentPosts: catPosts.slice(0, 3),
    };
  });

  return (
    <div className="fly-categories-page w-full space-y-3.5 sm:space-y-4 py-0.5 pb-8 transition-all duration-350 select-none">
      {/* 顶部 Header */}
      <header className="flex items-center justify-between border-b border-[var(--line)]/20 pb-3">
        {/* 左侧大标题 */}
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-[var(--accent)] opacity-85" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
            全部分类
          </h1>
        </div>

        {/* 右侧统计 */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{categories.length} 个主题</span>
          <span>·</span>
          <span>{allPosts.length} 篇</span>
        </div>
      </header>

      {/* 轻量紧凑分类卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {categoriesWithPosts.map((cat) => (
          <div
            key={cat.slug}
            className="group relative flex flex-col justify-between bg-[var(--page-alt)]/35 hover:bg-[var(--page-alt)]/70 rounded-xl p-4 sm:p-4.5 transition-all duration-300 shadow-2xs overflow-hidden"
          >
            <div>
              {/* 卡片头部：序号 + 分类标题 + 篇数 Badge */}
              <div className="flex items-center justify-between gap-2.5 mb-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded">
                    {cat.indexNumber}
                  </span>
                  <Link
                    href={`/categories/${encodeURIComponent(cat.slug)}/`}
                    className="flex items-center gap-2 text-base sm:text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate"
                  >
                    <Folder className="w-4 h-4 text-blue-500 opacity-85 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </Link>
                </div>

                {/* 篇数 Badge */}
                <Link
                  href={`/categories/${encodeURIComponent(cat.slug)}/`}
                  className="px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-[var(--page)]/80 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0"
                >
                  {cat.count} 篇
                </Link>
              </div>

              {/* 卡片中部：文章列表预览 (精致紧凑行) */}
              {cat.recentPosts.length > 0 && (
                <div className="space-y-1 my-2.5 border-t border-[var(--line)]/10 pt-2">
                  {cat.recentPosts.map((post) => {
                    const dateStr = post.pubDate ? format(new Date(post.pubDate), "MM-dd") : "01-01";
                    return (
                      <Link
                        key={post.slug}
                        href={`/posts/${post.slug}/`}
                        className="flex items-center justify-between gap-2.5 py-1 px-1.5 rounded-md hover:bg-[var(--page)]/70 text-xs text-[var(--muted)] hover:text-[var(--text)] group/item transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="w-1 h-1 rounded-full bg-[var(--muted)]/40 group-hover/item:bg-[var(--accent)] transition-colors shrink-0" />
                          <span className="truncate font-medium group-hover/item:translate-x-0.5 transition-transform">
                            {post.title}
                          </span>
                        </div>
                        <time className="shrink-0 font-mono text-[11px] opacity-70">
                          {dateStr}
                        </time>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 卡片底部：共 X 篇 & 进入领域 */}
            <div className="pt-2.5 border-t border-[var(--line)]/10 flex items-center justify-between text-xs text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
              <span className="font-mono text-[11px]">共 {cat.count} 篇文章</span>
              <Link
                href={`/categories/${encodeURIComponent(cat.slug)}/`}
                className="inline-flex items-center gap-1 font-medium text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all"
              >
                <span>进入领域</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
