import React from "react";
import Link from "next/link";
import { getAllTags } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "文章标签", description: "探索知识图谱，通过多彩标签云快速检索特定主题内容。", path: "/tags/" });

export default function TagsPage() {
  const tags = getAllTags().sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  return (
    <div className="fly-tags-page w-full max-w-6xl mx-auto space-y-8 sm:space-y-10 transition-all duration-350">
      {/* 顶部 Hero Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--page-alt)] via-[var(--page)] to-[var(--page-alt)] p-6 sm:p-8 border border-[var(--line)] shadow-xs">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent)]/10 text-[var(--accent)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            TAG CLOUD & TOPICS
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--text)]">
            文章标签
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl">
            收录 {tags.length} 个技术细分标签，涵盖具体协议、算法细分、工具使用与攻防实践。
          </p>
        </div>
      </header>

      {/* 标签云面板 */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--page)] border border-[var(--line)] shadow-2xs">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
          {tags.map((tag) => {
            // 根据热度计算尺寸等级
            const isHot = tag.count >= Math.max(2, maxCount * 0.5);
            return (
              <Link
                key={tag.slug}
                href={`/tags/${encodeURIComponent(tag.slug)}/`}
                className={`group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-300 hover:-translate-y-0.5 border ${
                  isHot
                    ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)] font-bold text-sm sm:text-base shadow-xs hover:shadow-md"
                    : "bg-[var(--page-alt)] border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)]/50 text-xs sm:text-sm font-medium"
                }`}
              >
                <span>#{tag.name}</span>
                <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded-md bg-[var(--page)] text-[var(--mute)] group-hover:text-[var(--accent)] transition-colors">
                  {tag.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
