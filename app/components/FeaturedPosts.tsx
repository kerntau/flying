"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post } from "@/lib/types";
import { Icon } from "./Icon";

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
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => {
            const formattedDate = post.pubDate
              ? format(new Date(post.pubDate), "yyyy年MM月dd日", { locale: zhCN })
              : "";

            return (
              <div key={post.slug} className="flex-[0_0_100%] min-w-0">
                <article className="fly-home-carousel-card">
                  {/* 左侧 Copy 区域 */}
                  <div className="fly-home-carousel-copy">
                    <div className="flex flex-col items-start gap-2 w-full">
                      {/* 作者头像 */}
                      <div className="fly-home-carousel-avatars">
                        <img
                          src="/assets/images/avatar.png"
                          alt={post.author || "Kerntau"}
                          className="w-10 h-10 rounded-full object-cover bg-[var(--page)]"
                        />
                      </div>

                      {/* 分类 / 路径 */}
                      <div className="fly-home-carousel-terms">
                        <span>{post.category || "精选推荐"}</span>
                      </div>

                      {/* 文章标题 */}
                      <h2>
                        <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
                      </h2>

                      {/* 描述摘要 */}
                      {post.description && <p>{post.description}</p>}
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
                      )}
                    </div>
                  </div>

                  {/* 右侧 Media 区域 (比例 8/5，右下角 2 个磨砂标签) */}
                  <div className="fly-home-carousel-media">
                    <Link href={`/posts/${post.slug}/`} className="block w-full h-full">
                      <img
                        src={post.cover || "/assets/images/fallback-cover.svg"}
                        alt={post.title}
                        className="fly-home-carousel-image"
                      />
                    </Link>

                    {/* 右上角 Icon Badge */}
                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white border border-white/10 shadow-xs">
                      <Icon name="video" size={13} />
                    </div>

                    {/* 右下角日期与阅读数 */}
                    <div className="fly-home-carousel-media-meta">
                      <span>{formattedDate}</span>
                      <span>294 次阅读</span>
                    </div>
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
