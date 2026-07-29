import React from "react";
import { getLinks } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Users, Link2, Copy, Check } from "lucide-react";
import { LinksClient } from "./LinksClient";

export const metadata = pageMetadata({
  title: "友情链接",
  description: "发现值得持续关注的网站与创作者，互换灵感火花。",
  path: "/links/",
});

export default function LinksPage() {
  const links = getLinks();
  const groups = Array.from(new Set(links.map((l) => l.group)));

  return (
    <div className="fly-links-page w-full max-w-6xl lg:max-w-[1240px] mx-auto space-y-6 sm:space-y-8 py-1 pb-10 transition-all duration-350 select-none">
      {/* 极简清爽 Header */}
      <header className="flex items-center justify-between border-b border-[var(--line)]/20 pb-4">
        {/* 左侧：标准清爽大标题 */}
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-[var(--accent)] opacity-80" />
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">
            友情链接
          </h1>
        </div>

        {/* 右侧：统计概览 */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--muted)] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>收录 {links.length} 位创作者</span>
          {groups.length > 1 && (
            <>
              <span>·</span>
              <span>{groups.length} 个分类</span>
            </>
          )}
        </div>
      </header>

      {/* 友链客户端交互核心 */}
      <LinksClient links={links} />
    </div>
  );
}
