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
    <div className="fly-categories-page w-full max-w-5xl mx-auto space-y-4 sm:space-y-5 py-1 pb-8 transition-all duration-350 select-none">
      {/* 大气清爽 Header */}
      <header className="flex items-center justify-between border-b border-[var(--line)]/20 pb-4">
        {/* 左侧：标准清爽中文大标题 */}
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-[var(--accent)] opacity-80" />
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">
            全部分类
          </h1>
        </div>

        {/* 右侧：统计概览轻标 */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--muted)] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{categories.length} 个主题领域</span>
          <span>·</span>
          <span>{allPosts.length} 篇文章</span>
        </div>
      </header>

      {/* 舒展大气画廊风分类卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
        {categoriesWithPosts.map((cat) => (
          <div
            key={cat.slug}
            className="group relative flex flex-col justify-between bg-[var(--page-alt)]/50 hover:bg-[var(--page-alt)] rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-lg border-0 overflow-hidden"
          >
            <div>
              {/* 卡片头部：序号 + 分类大标题 + 篇数 Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  {/* 标准数字序号 */}
                  <span className="text-xs sm:text-sm font-mono font-bold text-[var(--mute)] bg-[var(--page)] px-2.5 py-1 rounded-md shadow-2xs">
                    {cat.indexNumber}
                  </span>
                  <Link
                    href={`/categories/${encodeURIComponent(cat.slug)}/`}
                    className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
                  >
                    <Folder className="w-5 h-5 text-blue-500 opacity-80" />
                    <span>{cat.name}</span>
                  </Link>
                </div>

                {/* 篇数 Badge */}
                <Link
                  href={`/categories/${encodeURIComponent(cat.slug)}/`}
                  className="px-3 py-1 rounded-full text-xs sm:text-sm font-mono font-semibold bg-[var(--page)] text-[var(--muted)] group-hover:bg-[var(--text)] group-hover:text-[var(--page)] transition-all shrink-0 shadow-2xs"
                >
                  {cat.count} 篇
                </Link>
              </div>

              {/* 卡片中部：近期文章单行微预览 */}
              {cat.recentPosts.length > 0 && (
                <div className="space-y-2.5 my-4 border-t border-[var(--line)]/15 pt-3.5">
                  {cat.recentPosts.map((post) => {
                    const dateStr = post.pubDate ? format(new Date(post.pubDate), "MM-dd") : "01-01";
                    return (
                      <Link
                        key={post.slug}
                        href={`/posts/${post.slug}/`}
                        className="flex items-center justify-between gap-3 py-1 text-xs sm:text-sm text-[var(--muted)] hover:text-[var(--text)] group/item transition-colors"
                      >
                        <span className="truncate flex-1 font-medium group-hover/item:translate-x-1 transition-transform">
                          {post.title}
                        </span>
                        <time className="shrink-0 font-mono text-[var(--mute)] text-xs">
                          {dateStr}
                        </time>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 卡片底部：查看全部入口 */}
            <div className="pt-3.5 border-t border-[var(--line)]/15 flex items-center justify-between text-xs sm:text-sm font-semibold text-[var(--mute)] group-hover:text-[var(--accent)] transition-colors">
              <span>共 {cat.count} 篇文章</span>
              <Link
                href={`/categories/${encodeURIComponent(cat.slug)}/`}
                className="inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
              >
                <span>进入领域</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
