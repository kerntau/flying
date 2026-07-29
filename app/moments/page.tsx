import React from "react";
import { getGitCommits } from "@/lib/git-commits";
import { MomentsClient } from "./MomentsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "日志",
  description: "记录站点的 Git 提交历史与版本演进。",
  path: "/moments/",
});

export default function MomentsPage() {
  const commits = getGitCommits(60);

  return (
    <div className="fly-moments-page w-full space-y-6">
      {/* 全宽 Header 头部面板 */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--line)]/20 pb-5 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">
              更新日志
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 shadow-2xs">
              {commits.length} Commits
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            实时记录本站点的 Git 代码提交历史、版本演进足迹与需求重构
          </p>
        </div>
      </header>

      <MomentsClient commits={commits} />
    </div>
  );
}
