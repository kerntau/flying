"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Folder,
  ArrowUpDown,
  Calendar,
  FileText,
  ChevronDown,
  Check,
  Tag,
  SortAsc,
  SortDesc,
} from "lucide-react";
import type { Post } from "@/lib/types";
import { countWords, estimateReadTime, formatWordCount } from "@/lib/word-count";

interface ArchiveClientProps {
  initialPosts: Post[];
  categories: { name: string; slug: string; count: number }[];
}

export function ArchiveClient({ initialPosts, categories }: ArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"date" | "words">("date");

  // 下拉浮层显示状态
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // 点击外部收起 Popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. 计算文章字数与阅读时间
  const postsWithStats = useMemo(() => {
    return initialPosts.map((post) => {
      const wordCount = countWords(post.content);
      const readTime = estimateReadTime(post.content);
      return {
        ...post,
        wordCount,
        readTime,
      };
    });
  }, [initialPosts]);

  // 2. 分类筛选
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return postsWithStats;
    return postsWithStats.filter((p) => p.category === selectedCategory);
  }, [postsWithStats, selectedCategory]);

  // 3. 动态排序
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
      } else {
        comparison = a.wordCount - b.wordCount;
      }
      return isAscending ? comparison : -comparison;
    });
  }, [filteredPosts, sortBy, isAscending]);

  // 4. 按年份分组
  const groups = useMemo(() => {
    const groupMap: Record<string, typeof sortedPosts> = {};
    sortedPosts.forEach((post) => {
      const year = post.pubDate ? new Date(post.pubDate).getFullYear().toString() : "未知年份";
      if (!groupMap[year]) groupMap[year] = [];
      groupMap[year].push(post);
    });

    const sortedYears = Object.keys(groupMap).sort((a, b) => {
      const numA = parseInt(a, 10) || 0;
      const numB = parseInt(b, 10) || 0;
      return isAscending ? numA - numB : numB - numA;
    });

    return sortedYears.map((year) => {
      const yearPosts = groupMap[year];
      return {
        year,
        posts: yearPosts,
      };
    });
  }, [sortedPosts, isAscending]);



  return (
    <div className="fly-archives-client w-full max-w-6xl lg:max-w-[1240px] mx-auto space-y-4 sm:space-y-6 py-1 pb-1 transition-all duration-350 select-none">
      {/* 无结果时的 Empty 提示 */}
      {groups.length === 0 && (
        <div className="text-center py-4 text-[var(--muted)] space-y-1">
          <p className="text-base font-bold">暂无符合该分类的文章</p>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="text-xs text-[var(--accent)] underline underline-offset-4"
          >
            重置分类筛选
          </button>
        </div>
      )}

      {/* 按年份分组的归档流 */}
      {groups.map(({ year, posts }, yearIndex) => (
        <section key={year} className="relative space-y-3">
          {/* 年份 Header 与 控制菜单 */}
          <div className="relative flex items-end justify-between border-b border-[var(--line)]/30 pb-2 gap-2 min-h-[44px]">
            {/* 左侧：艺术水墨大字年份 */}
            <div className="flex items-baseline gap-2 shrink-0">
              <span className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter text-[var(--text)] opacity-15 font-serif italic leading-none hover:opacity-25 transition-opacity duration-500">
                {year}
              </span>
            </div>

            {/* 右侧：下拉控制菜单 */}
            {yearIndex === 0 && (
              <div className="flex items-center gap-1 sm:gap-2 pb-0.5 shrink-0">
                {/* 1. 分类下拉触发器 */}
                <div className="relative" ref={categoryRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      categoryOpen
                        ? 'bg-[var(--page-alt)] text-[var(--accent)]'
                        : 'bg-[var(--page-alt)]/60 hover:bg-[var(--page-alt)] text-[var(--text)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 opacity-85 shrink-0" />
                    <span className="truncate max-w-[90px] sm:max-w-none">
                      {selectedCategory === "all" ? "全部分类" : selectedCategory}
                    </span>
                    <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50 transition-transform duration-200 ${categoryOpen ? "rotate-180 text-[var(--accent)]" : ""}`} />
                  </button>

                  {/* 分类下拉弹出面板 */}
                  {categoryOpen && (
                    <div className="absolute right-0 sm:left-0 top-full mt-1.5 w-44 sm:w-48 p-1.5 rounded-2xl bg-[var(--page)] border border-[var(--line)]/60 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory("all");
                          setCategoryOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
                          selectedCategory === "all"
                            ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                            : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Folder className="w-3.5 h-3.5 text-blue-500 opacity-80" />
                          <span>全部分类</span>
                        </div>
                        {selectedCategory === "all" ? (
                          <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                        ) : (
                          <span className="text-[0.7rem] font-mono opacity-50">({postsWithStats.length})</span>
                        )}
                      </button>

                      {categories.map((cat) => (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setCategoryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
                            selectedCategory === cat.name
                              ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                              : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5 opacity-60" />
                            <span className="truncate">{cat.name}</span>
                          </div>
                          {selectedCategory === cat.name ? (
                            <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                          ) : (
                            <span className="text-[0.7rem] font-mono opacity-50">({cat.count})</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. 排序规则下拉触发器 */}
                <div className="relative" ref={sortRef}>
                  <button
                    type="button"
                    onClick={() => setSortOpen(!sortOpen)}
                    className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      sortOpen
                        ? 'bg-[var(--page-alt)] text-[var(--accent)]'
                        : 'bg-[var(--page-alt)]/60 hover:bg-[var(--page-alt)] text-[var(--text)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 opacity-85 shrink-0" />
                    <span>{sortBy === "date" ? "按日期" : "按字数"}</span>
                    <span className="text-[0.7rem] sm:text-xs font-mono opacity-60">
                      ({isAscending ? "升序" : "降序"})
                    </span>
                    <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50 transition-transform duration-200 ${sortOpen ? "rotate-180 text-[var(--accent)]" : ""}`} />
                  </button>

                  {/* 排序下拉弹出面板 */}
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-44 sm:w-52 p-1.5 rounded-2xl bg-[var(--page)] border border-[var(--line)]/60 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                      <div className="px-2.5 py-0.5 text-[0.65rem] font-bold text-[var(--mute)] uppercase tracking-wider">
                        排序依据
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSortBy("date");
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
                          sortBy === "date"
                            ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                            : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-emerald-500 opacity-80" />
                          <span>按创建日期</span>
                        </div>
                        {sortBy === "date" && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSortBy("words");
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
                          sortBy === "words"
                            ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                            : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-purple-500 opacity-80" />
                          <span>按文章字数</span>
                        </div>
                        {sortBy === "words" && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                      </button>

                      <div className="my-1 border-t border-[var(--line)]/30" />

                      <div className="px-2.5 py-0.5 text-[0.65rem] font-bold text-[var(--mute)] uppercase tracking-wider">
                        排序方向
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsAscending(false);
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
                          !isAscending
                            ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                            : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <SortDesc className="w-3.5 h-3.5 opacity-70" />
                          <span>降序 (最新优先)</span>
                        </div>
                        {!isAscending && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsAscending(true);
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all ${
                          isAscending
                            ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                            : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <SortAsc className="w-3.5 h-3.5 opacity-70" />
                          <span>升序 (最早优先)</span>
                        </div>
                        {isAscending && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 归档文章列表 */}
          <div className="divide-y divide-[var(--line)]/10">
            {posts.map((post, postIndex) => {
              const dateStr = post.pubDate ? format(new Date(post.pubDate), "MM-dd") : "01-01";
              return (
                <article
                  key={post.slug}
                  style={{ animationDelay: `${Math.min(postIndex * 25, 250)}ms` }}
                  className="archive-animate-item group relative flex items-center justify-between gap-3 sm:gap-4 py-1.5 rounded-xl transition-all duration-300 hover:bg-[var(--page-alt)]/80 px-2 -mx-2"
                >
                  {/* 左侧：MM-DD 日期 */}
                  <time className="shrink-0 text-xs sm:text-sm font-mono font-medium text-[var(--mute)] group-hover:text-[var(--text)] transition-colors duration-300 tracking-wider w-12 sm:w-16">
                    {dateStr}
                  </time>

                  {/* 中间：分类 Tag + 标题 + 字数/阅读时间 */}
                  <div className="flex-1 min-w-0 pr-1 sm:pr-2 flex items-center gap-2 sm:gap-3">
                    {/* 分类 Tag (全站统一 Theme Accent 高亮 Pill) */}
                    {post.category && (
                      <span className="shrink-0 hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-bold rounded-md bg-[var(--accent)]/10 text-[var(--accent)] leading-none shadow-2xs">
                        {post.category}
                      </span>
                    )}

                    {/* 标题 */}
                    <Link
                      href={`/posts/${post.slug}/`}
                      className="inline-block text-xs sm:text-base font-medium text-[var(--text)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300 ease-out truncate tracking-tight flex-1"
                    >
                      {post.title}
                    </Link>

                    {/* 元数据：字数 & 阅读时长 */}
                    <div className="shrink-0 hidden sm:flex items-center gap-1.5 text-xs font-mono text-[var(--mute)]">
                      <span>{formatWordCount(post.wordCount)}</span>
                      <span>·</span>
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  {/* 右侧：缩略图 */}
                  <Link
                    href={`/posts/${post.slug}/`}
                    className="shrink-0 w-24 sm:w-48 lg:w-60 h-9 sm:h-13 lg:h-14 rounded-lg overflow-hidden relative archive-cover-mask bg-[var(--page-alt)] border border-[var(--line)]/20 transition-all duration-300 opacity-85 group-hover:opacity-100 group-hover:shadow-sm"
                  >
                    {post.cover ? (
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-end px-3 bg-gradient-to-r from-transparent via-[var(--line)]/10 to-[var(--accent)]/10 text-xs font-mono font-bold text-[var(--muted)] opacity-60">
                        {post.category || "FLY"}
                      </div>
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
