"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post } from "@/lib/types";
import { site } from "@/data/site";
import { countWords, estimateReadTime, formatWordCount } from "@/lib/word-count";
import { Icon } from "./Icon";

import { AuthorPopover } from "./AuthorPopover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // 1. 监听 slide 切换状态
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // 2. 丝滑自动轮播 (支持鼠标悬停暂停与离开恢复)
  useEffect(() => {
    if (!emblaApi || posts.length <= 1) return;

    let timer: NodeJS.Timeout | null = null;

    const startAutoplay = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        emblaApi.scrollNext();
      }, 4000);
    };

    const stopAutoplay = () => {
      if (timer) clearInterval(timer);
    };

    startAutoplay();

    const rootNode = emblaApi.rootNode();
    rootNode.addEventListener("mouseenter", stopAutoplay);
    rootNode.addEventListener("mouseleave", startAutoplay);

    return () => {
      stopAutoplay();
      rootNode.removeEventListener("mouseenter", stopAutoplay);
      rootNode.removeEventListener("mouseleave", startAutoplay);
    };
  }, [emblaApi, posts.length]);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="fly-home-carousel" aria-label="精选文章">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {posts.map((post, index) => {
            const formattedDate = post.pubDate
              ? format(new Date(post.pubDate), "yyyy年MM月dd日", { locale: zhCN })
              : "";

            return (
              <div
                key={post.slug}
                className="flex-[0_0_100%] min-w-0"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  opacity: selectedIndex === index ? 1 : 0,
                  pointerEvents: selectedIndex === index ? 'auto' : 'none',
                  transition: 'opacity 300ms ease-in-out',
                }}
              >
                <article className="fly-home-carousel-card">
                  {/* 左侧 Copy 区域 */}
                  <div className="fly-home-carousel-copy">
                    <div className="flex flex-col items-start gap-3 sm:gap-4 w-full">
                      {/* 顶部元数据：作者头像 + 分类 Badge Pill + 标签 Badges 物理中轴线 100% 对齐 */}
                      <div className="flex flex-wrap items-center gap-2 w-full select-none">
                        <AuthorPopover name={post.author || site.author} />

                        {/* 分类 Badge Pill */}
                        <Link
                          href={`/categories/${encodeURIComponent(post.category || "默认分类")}/`}
                          className="inline-flex items-center justify-center h-7.5 sm:h-8 px-3 text-xs font-bold rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors shrink-0 leading-none"
                        >
                          <span>{post.category || "精选推荐"}</span>
                        </Link>

                        {/* 标签 Pills 列表 (移动端隐藏) */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="hidden sm:flex flex-wrap items-center gap-2 shrink-0">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Link
                                key={tag}
                                href={`/tags/${encodeURIComponent(tag.toLowerCase())}/`}
                                className="inline-flex items-center justify-center h-7.5 sm:h-8 px-2.5 rounded-lg bg-[var(--page-alt)]/60 hover:bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] text-xs font-medium transition-colors border-0 shrink-0 leading-none"
                              >
                                <span>#{tag}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 文章标题 */}
                      <h2>
                        <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
                      </h2>

                      {/* 描述摘要 (移动端隐藏) */}
                      {post.description && <p className="hidden sm:block">{post.description}</p>}

                      {/* 桌面端大胶囊元数据栏 (移动端隐藏) */}
                      <div className="hidden sm:inline-flex flex-wrap items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[var(--page-alt)]/60 text-xs text-[var(--muted)] font-medium mt-1">
                        {formattedDate && (
                          <span className="flex items-center gap-1.5 font-medium">
                            <Icon name="calendar" size={13} className="text-[var(--muted)]/70" />
                            <time dateTime={post.pubDate}>{formattedDate}</time>
                          </span>
                        )}
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Icon name="clock" size={13} className="text-[var(--muted)]/70" />
                          <span>约 {estimateReadTime(post.content)} 分钟阅读</span>
                        </span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Icon name="file-text" size={13} className="text-[var(--muted)]/70" />
                          <span>{formatWordCount(countWords(post.content))}</span>
                        </span>
                      </div>
                    </div>

                    {/* 底部阅读全文与切换控制按键 */}
                    <div className="fly-home-carousel-actions">
                      <Link href={`/posts/${post.slug}/`} className="fly-home-carousel-read">
                        <span>阅读全文</span>
                        <Icon name="arrow-right" size={14} />
                      </Link>

                      {posts.length > 1 && (
                        <div className="flex items-center gap-3 text-[var(--text)]">
                          {/* 动态轮播 Indicator 点 */}
                          <div className="flex items-center gap-1.5 mr-2">
                            {posts.map((_, i) => (
                              <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => scrollTo(i)}
                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer outline-none ${
                                      selectedIndex === i
                                        ? "w-5 bg-[var(--accent)]"
                                        : "w-2 bg-[var(--muted)]/30 hover:bg-[var(--muted)]/60"
                                    }`}
                                    aria-label={`跳转至第 ${i + 1} 张精选文章`}
                                  />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  跳转至第 {i + 1} 页
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>

                          {/* 移动端：显示发布时间 */}
                          {formattedDate && (
                            <time dateTime={post.pubDate} className="fly-carousel-mobile-date text-[10px] text-[var(--muted)] whitespace-nowrap">
                              {formattedDate}
                            </time>
                          )}

                          {/* 桌面端：左右切换箭头 */}
                          <div className="fly-carousel-nav-arrows flex items-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={scrollPrev}
                                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer outline-none"
                                aria-label="上一页"
                              >
                                <Icon name="arrow-left" size={18} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">上一篇精选</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={scrollNext}
                                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer outline-none"
                                aria-label="下一页"
                              >
                                <Icon name="arrow-right" size={18} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">下一篇精选</TooltipContent>
                          </Tooltip>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 右侧 Media 区域 */}
                  <div className="fly-home-carousel-media">
                    <Link href={`/posts/${post.slug}/`} className="block w-full h-full" aria-label={`阅读：${post.title}`}>
                      <img
                        src={post.cover ? (post.cover.includes("?") ? post.cover : `${post.cover}?v=4`) : "/assets/images/fallback-cover.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
