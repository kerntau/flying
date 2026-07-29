import React from "react";
import Link from "next/link";
import { getAllTags } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "文章标签", description: "探索知识图谱，通过多彩标签云快速检索特定主题内容。", path: "/tags/" });

export default function TagsPage() {
  const tags = getAllTags().sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  return (
    <div className="fly-tags-page w-full space-y-12 transition-all duration-350 pb-16">
      {/* 顶部超大排版 Hero 区 */}
      <header className="relative flex flex-col items-center justify-center py-24 overflow-hidden rounded-3xl bg-[var(--page-alt)] border border-[var(--line)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-[var(--page)] text-[var(--text)] border border-[var(--line)] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Tag Cloud & Topics
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-[var(--text)]">
            标签矩阵
          </h1>
          <p className="text-sm sm:text-base font-medium text-[var(--muted)] max-w-xl">
            收录 {tags.length} 个技术细分标签，涵盖具体协议、算法细分、工具使用与攻防实践。
          </p>
        </div>
        
        {/* 背景大字 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-black tracking-tighter text-[var(--line)] opacity-20 pointer-events-none select-none mix-blend-overlay">
          TAGS
        </div>
      </header>

      {/* 标签云面板 - 更加分散与动感的布局 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-0">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-8">
          {tags.map((tag) => {
            // 根据热度计算尺寸等级和样式
            const isHot = tag.count >= Math.max(2, maxCount * 0.5);
            const sizeRatio = Math.max(0.7, Math.min(1.5, tag.count / maxCount + 0.7));
            
            return (
              <Link
                key={tag.slug}
                href={`/tags/${encodeURIComponent(tag.slug)}/`}
                className={`group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-500 hover:-translate-y-1.5 border overflow-hidden ${
                  isHot
                    ? "bg-[var(--accent)] text-white border-transparent shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 hover:scale-105 z-10"
                    : "bg-[var(--page)] border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)] hover:shadow-xl hover:shadow-[var(--accent)]/10 hover:z-10"
                }`}
                style={{
                  transform: `scale(${isHot ? 1.05 : 1})`,
                }}
              >
                {/* 悬停时的光晕扫过效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                
                <span className="relative font-bold whitespace-nowrap" style={{ fontSize: `${sizeRatio}rem` }}>
                  #{tag.name}
                </span>
                
                <span className={`relative flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-xs font-black transition-colors ${
                  isHot 
                    ? "bg-white/20 text-white" 
                    : "bg-[var(--page-alt)] text-[var(--muted)] group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)]"
                }`}>
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
