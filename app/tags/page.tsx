import React from "react";
import Link from "next/link";
import { getAllTags, getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Tag, Flame } from "lucide-react";

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
    <div className="fly-tags-page w-full max-w-5xl mx-auto space-y-10 sm:space-y-12 py-4 pb-16 transition-all duration-350 select-none">
      {/* 极简清爽 Header */}
      <header className="flex items-center justify-between border-b border-[var(--line)]/20 pb-4">
        {/* 左侧：大标题 */}
        <div className="flex items-center gap-3">
          <Tag className="w-6 h-6 text-[var(--accent)] opacity-80" />
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">
            标签矩阵
          </h1>
        </div>

        {/* 右侧：统计概览轻标 */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--muted)] font-mono">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>{tags.length} 个细分标签</span>
          <span>·</span>
          <span>{allPosts.length} 篇文章</span>
        </div>
      </header>

      {/* 1. 核心热门标签区（去除 # 符号） */}
      {popularTags.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>核心热门主题</span>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
            {popularTags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${encodeURIComponent(tag.slug)}/`}
                className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[var(--page-alt)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg hover:shadow-[var(--accent)]/15 border-0 shrink-0"
              >
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[var(--accent)] group-hover:text-white transition-colors opacity-80" />
                  <span className="text-base sm:text-lg font-extrabold tracking-tight">
                    {tag.name}
                  </span>
                </div>

                <span className="bg-[var(--page)] group-hover:bg-white/20 text-[var(--accent)] group-hover:text-white px-2.5 py-0.5 rounded-lg text-xs font-mono font-black transition-colors shadow-2xs">
                  {tag.count} 篇
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2. 全景探索标签矩阵（去除 # 符号） */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5 opacity-60" />
          <span>全景技术图谱</span>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3 py-2">
          {otherTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${encodeURIComponent(tag.slug)}/`}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--page-alt)]/60 hover:bg-[var(--page-alt)] hover:text-[var(--accent)] transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-md border-0 shrink-0"
            >
              <span className="text-xs sm:text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {tag.name}
              </span>

              <span className="bg-[var(--page)] text-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:text-white px-1.5 py-0.5 rounded-md text-[0.7rem] font-mono font-bold transition-all shadow-2xs">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
