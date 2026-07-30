"use client";

import React, { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
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
import { Flip, gsap } from "@/lib/gsap";

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
  const listContainerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<any>(null);
  const isInitialMount = useRef<boolean>(true);

  // 记录 Flip 状态的辅助方法
  const captureFlipState = () => {
    if (typeof window !== "undefined" && listContainerRef.current) {
      const items = listContainerRef.current.querySelectorAll(".archive-animate-item");
      if (items.length > 0) {
        flipStateRef.current = Flip.getState(items);
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    captureFlipState();
    setSelectedCategory(category);
    setCategoryOpen(false);
  };

  const handleSortChange = (newSortBy: "date" | "words") => {
    captureFlipState();
    setSortBy(newSortBy);
    setSortOpen(false);
  };

  const handleOrderChange = (ascending: boolean) => {
    captureFlipState();
    setIsAscending(ascending);
    setSortOpen(false);
  };

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

  // 首次渲染时的 GSAP 逐条交错渐显滑入
  useEffect(() => {
    if (!listContainerRef.current) return;
    const items = listContainerRef.current.querySelectorAll(".archive-animate-item");
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 18, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.025,
        ease: "power2.out",
        clearProps: "filter,transform",
      }
    );
    isInitialMount.current = false;
  }, []);

  // 当 sortedPosts 变化导致 DOM 重新渲染后执行精细打磨的 GSAP Flip 动画
  useLayoutEffect(() => {
    if (isInitialMount.current) return;

    if (flipStateRef.current) {
      Flip.from(flipStateRef.current, {
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.015,
        scale: false,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.97, filter: "blur(4px)", y: 8 },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.35,
              ease: "power2.out",
              clearProps: "filter,scale,transform",
            }
          ),
        onLeave: (elements) =>
          gsap.to(elements, {
            opacity: 0,
            scale: 0.97,
            filter: "blur(4px)",
            duration: 0.2,
            ease: "power2.in",
          }),
        onComplete: () => {
          flipStateRef.current = null;
        },
      });
    }
  }, [sortedPosts]);

  return (
    <div
      ref={listContainerRef}
      className="fly-archives-client w-full space-y-2.5 sm:space-y-4 py-0.5 pb-1 transition-all duration-350 select-none"
    >
      {/* 无结果时的 Empty 提示 */}
      {groups.length === 0 && (
        <div className="text-center py-6 text-[var(--muted)] space-y-2 animate-in fade-in duration-300">
          <p className="text-base font-bold text-[var(--text)]">暂无符合该分类的文章</p>
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[var(--page-alt)] text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
          >
            重置分类筛选
          </button>
        </div>
      )}

      {/* 按年份分组的归档流 */}
      {groups.map(({ year, posts }, yearIndex) => (
        <section key={year} className="relative space-y-1.5">
          {/* 年份 Header 与 控制菜单 */}
          <div className="relative flex items-end justify-between border-b border-[var(--line)]/20 pb-1 gap-2 min-h-[32px]">
            {/* 左侧：艺术水墨大字年份 */}
            <div className="flex items-baseline gap-2 shrink-0">
              <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[var(--text)] opacity-15 font-serif italic leading-none hover:opacity-25 transition-opacity duration-500">
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
                    className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                      categoryOpen
                        ? "bg-[var(--page-alt)] text-[var(--accent)] shadow-xs"
                        : "bg-[var(--page-alt)]/50 hover:bg-[var(--page-alt)] text-[var(--text)] hover:text-[var(--accent)]"
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 opacity-70" />
                    <span>
                      {selectedCategory === "all"
                        ? "全部分类"
                        : categories.find((c) => c.name === selectedCategory)?.name || selectedCategory}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-250 ease-out ${
                        categoryOpen ? "rotate-180 text-[var(--accent)]" : "opacity-60"
                      }`}
                    />
                  </button>

                  {/* 分类下拉菜单面板 */}
                  {categoryOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-44 p-1.5 rounded-2xl bg-[var(--page)] border border-[var(--line)]/40 shadow-xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 transform-gpu">
                      <div className="text-[10px] font-bold text-[var(--mute)] px-2.5 py-1 tracking-wider uppercase">
                        文章分类
                      </div>
                      <div className="space-y-0.5 max-h-60 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => handleCategoryChange("all")}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            selectedCategory === "all"
                              ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                              : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                          }`}
                        >
                          <span>全部归档</span>
                          <span className="text-[10px] font-mono text-[var(--mute)]">
                            {initialPosts.length}
                          </span>
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.slug}
                            type="button"
                            onClick={() => handleCategoryChange(cat.name)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                              selectedCategory === cat.name
                                ? "bg-[var(--page-alt)] text-[var(--text)] font-semibold"
                                : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                            }`}
                          >
                            <span className="truncate pr-2">{cat.name}</span>
                            <span className="text-[10px] font-mono text-[var(--mute)] shrink-0">
                              {cat.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. 排序方式下拉触发器 */}
                <div className="relative" ref={sortRef}>
                  <button
                    type="button"
                    onClick={() => setSortOpen(!sortOpen)}
                    className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                      sortOpen
                        ? "bg-[var(--page-alt)] text-[var(--accent)] shadow-xs"
                        : "bg-[var(--page-alt)]/50 hover:bg-[var(--page-alt)] text-[var(--text)] hover:text-[var(--accent)]"
                    }`}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-70" />
                    <span>{sortBy === "date" ? "按日期" : "按字数"}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-250 ease-out ${
                        sortOpen ? "rotate-180 text-[var(--accent)]" : "opacity-60"
                      }`}
                    />
                  </button>

                  {/* 排序面板 */}
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 p-1.5 rounded-2xl bg-[var(--page)] border border-[var(--line)]/40 shadow-xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2 transform-gpu">
                      {/* 维度切换 */}
                      <div>
                        <div className="text-[10px] font-bold text-[var(--mute)] px-2.5 py-1 tracking-wider uppercase">
                          排序维度
                        </div>
                        <div className="grid grid-cols-2 gap-1 p-0.5 bg-[var(--page-alt)]/40 rounded-xl">
                          <button
                            type="button"
                            onClick={() => handleSortChange("date")}
                            className={`flex items-center justify-center gap-1 py-1 rounded-lg text-xs font-medium transition-all ${
                              sortBy === "date"
                                ? "bg-[var(--page)] text-[var(--text)] shadow-xs font-semibold"
                                : "text-[var(--muted)] hover:text-[var(--text)]"
                            }`}
                          >
                            <Calendar className="w-3 h-3 opacity-70" />
                            <span>日期</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSortChange("words")}
                            className={`flex items-center justify-center gap-1 py-1 rounded-lg text-xs font-medium transition-all ${
                              sortBy === "words"
                                ? "bg-[var(--page)] text-[var(--text)] shadow-xs font-semibold"
                                : "text-[var(--muted)] hover:text-[var(--text)]"
                            }`}
                          >
                            <FileText className="w-3 h-3 opacity-70" />
                            <span>字数</span>
                          </button>
                        </div>
                      </div>

                      {/* 正倒序选择 */}
                      <div className="border-t border-[var(--line)]/15 pt-1 space-y-0.5">
                        <button
                          type="button"
                          onClick={() => handleOrderChange(false)}
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
                          onClick={() => handleOrderChange(true)}
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
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 归档文章列表 */}
          <div className="divide-y divide-[var(--line)]/10">
            {posts.map((post) => {
              const dateStr = post.pubDate ? format(new Date(post.pubDate), "MM-dd") : "01-01";
              return (
                <article
                  key={post.slug}
                  data-flip-id={post.slug}
                  className="archive-animate-item group relative flex items-center justify-between gap-2 sm:gap-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 hover:bg-[var(--page-alt)]/80 px-2 -mx-2 transform-gpu"
                >
                  {/* 左侧：MM-DD 日期 */}
                  <time className="shrink-0 text-xs sm:text-sm font-mono font-medium text-[var(--mute)] group-hover:text-[var(--text)] transition-colors duration-300 tracking-wider w-10 sm:w-14">
                    {dateStr}
                  </time>

                  {/* 中间：分类 Tag + 标题 + 字数/阅读时间 */}
                  <div className="flex-1 min-w-0 pr-1 sm:pr-2 flex items-center gap-1.5 sm:gap-2.5">
                    {/* 分类 Tag */}
                    {post.category && (
                      <span className="shrink-0 hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold rounded-md bg-[var(--accent)]/10 text-[var(--accent)] leading-none shadow-2xs group-hover:bg-[var(--accent)]/20 transition-colors">
                        {post.category}
                      </span>
                    )}

                    {/* 标题 */}
                    <Link
                      href={`/posts/${post.slug}/`}
                      className="inline-block text-xs sm:text-sm md:text-base font-medium text-[var(--text)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300 ease-out truncate tracking-tight flex-1"
                    >
                      {post.title}
                    </Link>

                    {/* 元数据：字数 & 阅读时长 */}
                    <div className="shrink-0 hidden sm:flex items-center gap-1 text-xs font-mono text-[var(--mute)] opacity-80 group-hover:opacity-100 transition-opacity">
                      <span>{formatWordCount(post.wordCount)}</span>
                      <span>·</span>
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  {/* 右侧：缩略图 */}
                  <Link
                    href={`/posts/${post.slug}/`}
                    className="shrink-0 w-20 sm:w-36 lg:w-44 h-7 sm:h-9.5 lg:h-10 rounded-md sm:rounded-lg overflow-hidden relative archive-cover-mask bg-[var(--page-alt)] border border-[var(--line)]/20 transition-all duration-300 opacity-85 group-hover:opacity-100 group-hover:shadow-md group-hover:-translate-y-0.5"
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
