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

      {/* 下方正文：左侧作者头像 + 右侧双行标题 */}
      <div className="flex flex-col flex-1 pt-2.5 min-w-0">
        <div className="flex items-start gap-2">
          {/* 作者头像 */}
          <img
            src="/assets/images/avatar.png"
            alt={post.author || "Kerntau"}
            className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5 border border-black/10 dark:border-white/10"
          />

          {/* 文章标题 */}
          <h2 className="text-xs sm:text-sm font-bold tracking-tight text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors">
            <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
          </h2>
        </div>

        {/* 底部元数据：日期 */}
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--mute)] pt-2 pl-8">
          <time dateTime={post.pubDate}>{formattedDate}</time>
        </div>
      </div>
    </article>
  );
}
