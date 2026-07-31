"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post } from "@/lib/types";
import { gsap } from "@/lib/gsap";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    const coverEl = coverRef.current;
    if (!cardEl || typeof window === "undefined") return;

    // GSAP Hover 监听与弹性物理回弹
    const onMouseEnter = () => {
      gsap.to(cardEl, {
        y: -4,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
      if (coverEl) {
        gsap.to(coverEl, {
          scale: 1.03,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(cardEl, {
        y: 0,
        duration: 0.45,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
      if (coverEl) {
        gsap.to(coverEl, {
          scale: 1,
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          duration: 0.45,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      }
    };

    cardEl.addEventListener("mouseenter", onMouseEnter);
    cardEl.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cardEl.removeEventListener("mouseenter", onMouseEnter);
      cardEl.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const formattedDate = post.pubDate
    ? format(new Date(post.pubDate), "yyyy年MM月dd日", { locale: zhCN })
    : "";

  return (
    <article
      ref={cardRef}
      className="fly-post-card group flex flex-col h-full min-w-0 bg-transparent gsap-fade-item"
    >
      {/* 16:10 封面图框 (带 GSAP 阻尼与微弹平移) */}
      <div
        ref={coverRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-lg sm:rounded-xl bg-[var(--page-alt)] shadow-xs active:scale-[0.98] shrink-0 transform-gpu"
      >
        <Link href={`/posts/${post.slug}/`} className="block w-full h-full" aria-label={`阅读：${post.title}`}>
          <img
            src={post.cover ? (post.cover.includes("?") ? post.cover : `${post.cover}?v=4`) : "/assets/images/fallback-cover.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* 左下角分类 Pill 标签 */}
        {post.category && (
          <span className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 z-10 inline-flex items-center px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold rounded-md bg-white/90 dark:bg-black/90 text-black dark:text-white shadow-xs backdrop-blur-md">
            {post.category}
          </span>
        )}
      </div>

      {/* 下方正文：文章标题 (统一 2 行固定高度) + 底部置底对齐的日期/标签 */}
      <div className="flex flex-col flex-1 justify-between pt-1.5 sm:pt-2 min-w-0">
        {/* 文章标题 */}
        <h2 className="text-xs sm:text-sm font-bold tracking-tight text-[var(--text)] line-clamp-2 leading-[1.35] sm:min-h-[2.7em] min-h-0 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
        </h2>

        {/* 底部元数据：文章标签 + 日期 */}
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[var(--muted)] pt-1.5 sm:pt-2 mt-auto whitespace-nowrap overflow-hidden min-w-0 font-medium">
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-1 overflow-hidden min-w-0 shrink">
              {post.tags.slice(0, 2).map((tag, index) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag.toLowerCase())}/`}
                  className={`items-center px-1 py-0.5 rounded-md bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] transition-colors font-medium max-w-[80px] sm:max-w-[100px] truncate shrink ${
                    index === 0 ? "inline-flex" : "hidden sm:inline-flex"
                  }`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {post.tags && post.tags.length > 0 && formattedDate && (
            <span className="text-[var(--mute)] opacity-60 shrink-0">•</span>
          )}

          {formattedDate && (
            <time dateTime={post.pubDate} className="whitespace-nowrap shrink-0">
              {formattedDate}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}
