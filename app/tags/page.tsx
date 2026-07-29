import React from "react";
import Link from "next/link";
import { getAllTags, getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Tag, Flame, Hash } from "lucide-react";

export const metadata = pageMetadata({
  title: "文章标签",
  description: "探索知识图谱，通过多彩热力标签云快速检索特定主题内容。",
  path: "/tags/",
});

export default function TagsPage() {
  const tags = getAllTags().sort((a, b) => b.count - a.count);
  const allPosts = getAllPosts();

  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  // 区分核心热门标签与全景标签
  const popularTags = tags.filter((t) => t.count >= Math.max(2, maxCount * 0.3));
  const otherTags = tags.filter((t) => t.count < Math.max(2, maxCount * 0.3));

  return (
    <div className="fly-tags-page w-full max-w-6xl lg:max-w-[1240px] mx-auto space-y-5 sm:space-y-6 py-0.5 pb-8 transition-all duration-350 select-none">
      {/* 顶部 Header */}
      <header className="flex items-center justify-between border-b border-[var(--line)]/20 pb-3">
        {/* 左侧大标题 */}
        <div className="flex items-center gap-2.5">
          <Tag className="w-5 h-5 text-[var(--accent)] opacity-85" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
            标签矩阵
          </h1>
        </div>

        {/* 右侧统计概览 */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>{tags.length} 个标签</span>
          <span>·</span>
          <span>{allPosts.length} 篇</span>
        </div>
      </header>

      {/* 1. 核心热门主题区 (精致 Mini 卡片) */}
      {popularTags.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>核心热门主题</span>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
            {popularTags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${encodeURIComponent(tag.slug)}/`}
                className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--page-alt)]/40 hover:bg-[var(--page-alt)]/80 text-[var(--text)] hover:text-[var(--accent)] transition-all duration-200 shadow-2xs hover:shadow-sm shrink-0"
              >
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-[var(--accent)] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xs sm:text-sm font-semibold tracking-tight">
                    {tag.name}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors opacity-80">
                  ({tag.count})
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2. 全景探索标签矩阵 (极简微底色 Cloud) */}
      <section className="space-y-2.5 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5 opacity-60" />
          <span>全景技术图谱</span>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2">
          {otherTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${encodeURIComponent(tag.slug)}/`}
              className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--page-alt)]/25 hover:bg-[var(--page-alt)]/65 transition-all duration-150 shrink-0"
            >
              <span className="text-xs font-medium text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
                {tag.name}
              </span>

              <span className="text-[10px] font-mono text-[var(--mute)] group-hover:text-[var(--accent)] transition-colors opacity-70">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
