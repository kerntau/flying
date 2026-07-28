"use client";

import React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import type { Post } from "@/lib/types";
import { Icon } from "./Icon";
import { AuthorPopover } from "./AuthorPopover";

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="fly-featured-section relative w-full mb-10 overflow-hidden rounded-3xl bg-[var(--page-alt)] border border-[var(--line)] p-2 sm:p-3 shadow-xs">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div key={post.slug} className="flex-[0_0_100%] min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center bg-[var(--page)] border border-[var(--line)] rounded-2xl p-3 sm:p-5 shadow-xs group transition-all duration-300">
                {/* 左侧 (7列)：无黑色渐变遮罩的高清原图展示区 */}
                <div className="md:col-span-7 aspect-[16/9] sm:aspect-[16/10] overflow-hidden rounded-xl bg-[var(--page-alt)] relative">
                  <img
                    src={post.cover || "/assets/images/fallback-cover.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* 右侧 (5列)：精细文本与元数据信息区 */}
                <div className="md:col-span-5 flex flex-col justify-between gap-3 py-1 px-1 min-w-0">
                  <div className="flex flex-col gap-2.5">
                    {post.category && (
                      <span className="self-start px-2.5 py-1 text-xs font-semibold rounded-md bg-[var(--accent-soft)] text-[var(--text)] border border-[var(--line)]">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
                    </h2>
                    {post.description && (
                      <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--mute)] pt-3 border-t border-[var(--line)] mt-2">
                    <div className="flex items-center gap-2">
                      <AuthorPopover name={post.author} />
                      <span>•</span>
                      <span>{new Date(post.pubDate).toLocaleDateString("zh-CN")}</span>
                    </div>

                    <Link
                      href={`/posts/${post.slug}/`}
                      className="inline-flex items-center gap-1 font-semibold text-xs text-[var(--text)] hover:translate-x-0.5 transition-transform"
                    >
                      阅读全文
                      <Icon name="chevron-right" size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部翻页控制器 */}
      {posts.length > 1 && (
        <div className="flex items-center justify-end gap-2 pt-3 px-3">
          <button
            type="button"
            onClick={scrollPrev}
            className="p-1.5 rounded-full border border-[var(--line)] bg-[var(--page)] text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors shadow-xs"
            aria-label="上一页"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="p-1.5 rounded-full border border-[var(--line)] bg-[var(--page)] text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors shadow-xs"
            aria-label="下一页"
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
