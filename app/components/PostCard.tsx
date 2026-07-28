import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = post.pubDate
    ? format(new Date(post.pubDate), "yyyy年MM月dd日", { locale: zhCN })
    : "";

  return (
    <article className="fly-post-card group flex flex-col min-w-0 bg-transparent">
      {/* 16:10 封面图框 (图片左下角带玻璃分类 Pill) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[var(--page-alt)] shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
        <Link href={`/posts/${post.slug}/`} className="block w-full h-full" aria-label={`阅读：${post.title}`}>
          <img
            src={post.cover || "/assets/images/fallback-cover.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* 左下角分类 Pill 标签 */}
        {post.category && (
          <span className="absolute bottom-2 left-2 z-10 inline-flex items-center px-2 py-0.5 text-[11px] font-bold rounded-md bg-white/90 dark:bg-black/90 text-black dark:text-white shadow-xs backdrop-blur-md">
            {post.category}
          </span>
        )}
      </div>

      {/* 下方正文：文章标题 + 底部日期 */}
      <div className="flex flex-col flex-1 pt-2.5 min-w-0">
        {/* 文章标题 */}
        <h2 className="text-xs sm:text-sm font-bold tracking-tight text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors">
          <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
        </h2>

        {/* 底部元数据：文章标签 (时间左侧) + 日期 */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--mute)] pt-2 flex-wrap">
          {/* 标签 (时间左侧) */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-hidden">
              {post.tags.slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag.toLowerCase())}/`}
                  className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] transition-colors font-medium max-w-[110px] truncate"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {post.tags && post.tags.length > 0 && formattedDate && (
            <span className="text-[var(--mute)] opacity-60">•</span>
          )}

          {/* 发布时间 */}
          <time dateTime={post.pubDate} className="whitespace-nowrap">
            {formattedDate}
          </time>
        </div>
      </div>
    </article>
  );
}
