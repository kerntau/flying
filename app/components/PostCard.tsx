import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post } from "@/lib/types";
import { AuthorPopover } from "./AuthorPopover";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = post.pubDate
    ? format(new Date(post.pubDate), "yyyy年MM月dd日", { locale: zhCN })
    : "";

  return (
    <article className="fly-post-card group flex flex-col overflow-hidden rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="fly-post-image-frame relative aspect-[16/9] overflow-hidden bg-[var(--page)]">
        <Link href={`/posts/${post.slug}/`} className="block w-full h-full">
          <img
            src={post.cover || "/assets/images/fallback-cover.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {post.category && (
          <Link
            href={`/categories/${encodeURIComponent(post.category)}/`}
            className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
          >
            {post.category}
          </Link>
        )}
      </div>

      <div className="fly-post-body flex flex-col flex-1 p-5 gap-3 justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="fly-post-title text-lg font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
          </h2>

          {post.description && (
            <p className="fly-post-excerpt text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        <footer className="fly-post-meta flex items-center justify-between pt-3 border-t border-[var(--line)]/50 text-xs text-[var(--muted)]">
          <AuthorPopover name={post.author} />
          <time dateTime={post.pubDate}>{formattedDate}</time>
        </footer>
      </div>
    </article>
  );
}
