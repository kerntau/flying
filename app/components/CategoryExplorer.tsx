'use client';

import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post } from "@/lib/types";
import { Folder, ArrowRight, LayoutGrid, Tag } from "lucide-react";

export interface CategoryWithPosts {
  name: string;
  slug: string;
  count: number;
  indexNumber: string;
  recentPosts: Post[];
}

interface CategoryExplorerProps {
  categories: CategoryWithPosts[];
  allPosts: Post[];
}

export function CategoryExplorer({ categories, allPosts }: CategoryExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const selectedCat = categories.find((c) => c.slug === activeCategory || c.name === activeCategory);

  const displayedPosts = activeCategory === "all"
    ? allPosts
    : allPosts.filter((p) => p.category === selectedCat?.name || p.category === selectedCat?.slug);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. 顶部智能分类胶囊 Tab 导航 */}
      <div className="flex flex-wrap items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
            activeCategory === "all"
              ? "bg-[var(--text)] text-[var(--page)] shadow-xs"
              : "bg-[var(--page-alt)]/50 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]"
          }`}
        >
          <LayoutGrid size={13} />
          <span>全景视图</span>
          <span className="text-[10px] opacity-75 font-mono">({allPosts.length})</span>
        </button>

        {categories.map((cat) => {
          const active = activeCategory === cat.slug || activeCategory === cat.name;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-[var(--accent)] text-[var(--accent-contrast,white)] font-extrabold shadow-xs"
                  : "bg-[var(--page-alt)]/50 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] font-mono opacity-80">({cat.count})</span>
            </button>
          );
        })}
      </div>

      {/* 2. 模式 A：全景拓扑概览模式 (activeCategory === "all") */}
      {activeCategory === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="group flex flex-col justify-between border-b sm:border-b-0 border-[var(--line)]/20 pb-5 sm:pb-0"
            >
              <div className="space-y-3">
                {/* 头部：分类名 + 计数 */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--line)]/25 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.slug)}
                    className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate cursor-pointer text-left"
                  >
                    <Folder className="w-4.5 h-4.5 text-[var(--accent)] opacity-80 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.slug)}
                    className="px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-[var(--page-alt)]/60 text-[var(--muted)] hover:text-[var(--text)] transition-colors shrink-0 cursor-pointer"
                  >
                    {cat.count} 篇
                  </button>
                </div>

                {/* 文章列表预览 */}
                {cat.recentPosts.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {cat.recentPosts.map((post) => {
                      const dateStr = post.pubDate ? format(new Date(post.pubDate), "MM-dd") : "01-01";
                      return (
                        <Link
                          key={post.slug}
                          href={`/posts/${post.slug}/`}
                          className="flex items-center justify-between gap-3 py-1.5 px-2 -mx-2 rounded-lg hover:bg-[var(--page-alt)]/50 text-xs text-[var(--muted)] hover:text-[var(--text)] group/item transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="w-1 h-1 rounded-full bg-[var(--muted)]/40 group-hover/item:bg-[var(--accent)] transition-colors shrink-0" />
                            <span className="truncate font-medium group-hover/item:translate-x-0.5 transition-transform">
                              {post.title}
                            </span>
                          </div>
                          <time className="shrink-0 font-mono text-[11px] opacity-60">
                            {dateStr}
                          </time>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 展开全量入口 */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] group/btn transition-colors cursor-pointer"
                >
                  <span>探索该分类全部 {cat.count} 篇文章</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 模式 B：单分类实时联动展开模式 */
        <div className="space-y-4 pt-2 animate-in fade-in duration-200">
          {/* 单分类面板 Banner */}
          <div className="flex items-center justify-between py-3 border-b border-[var(--line)]/25">
            <div className="flex items-center gap-2.5">
              <Folder className="w-5 h-5 text-[var(--accent)]" />
              <h2 className="text-lg font-extrabold text-[var(--text)]">
                {selectedCat?.name}
              </h2>
              <span className="text-xs font-mono text-[var(--muted)] bg-[var(--page-alt)]/60 px-2 py-0.5 rounded-md">
                共 {displayedPosts.length} 篇文章
              </span>
            </div>

            <Link
              href={`/categories/${encodeURIComponent(selectedCat?.slug || activeCategory)}/`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              <span>独立分类页</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* 该分类下的文章极简流线列表 */}
          <div className="space-y-2">
            {displayedPosts.map((post) => {
              const formattedDate = post.pubDate
                ? format(new Date(post.pubDate), "yyyy-MM-dd", { locale: zhCN })
                : "";

              return (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}/`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl hover:bg-[var(--page-alt)]/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]/40 group-hover:bg-[var(--accent)] transition-colors shrink-0" />
                    <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-xs text-[var(--muted)] pl-4 sm:pl-0">
                    {post.tags && post.tags.length > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px]">
                        <Tag size={11} className="opacity-60" />
                        <span>#{post.tags[0]}</span>
                      </span>
                    )}
                    <time dateTime={post.pubDate} className="font-mono text-[11px] opacity-65">
                      {formattedDate}
                    </time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
