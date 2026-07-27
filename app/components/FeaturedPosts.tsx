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
    <section className="fly-featured-section relative w-full mb-10 overflow-hidden rounded-3xl bg-[var(--page-alt)] border border-[var(--line)]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div key={post.slug} className="flex-[0_0_100%] min-w-0 relative aspect-[21/9] min-h-[320px]">
              <img
                src={post.cover || "/assets/images/fallback-cover.svg"}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                {post.category && (
                  <span className="inline-block self-start px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-md">
                    {post.category}
                  </span>
                )}
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight mb-2 line-clamp-2">
                  <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
                </h2>
                {post.description && (
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-2xl mb-4">
                    {post.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <AuthorPopover name={post.author} />
                  <span>•</span>
                  <span>{new Date(post.pubDate).toLocaleDateString("zh-CN")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {posts.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
            aria-label="上一页"
          >
            <Icon name="chevron-left" size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
            aria-label="下一页"
          >
            <Icon name="chevron-right" size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
