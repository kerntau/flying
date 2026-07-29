"use client";

import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { GitCommit as GitIcon, Copy, Check, Terminal, Filter, Calendar, User, Code2 } from "lucide-react";
import type { GitCommit } from "@/lib/types";
import { gsap } from "@/lib/gsap";

interface MomentsClientProps {
  commits: GitCommit[];
}

export function MomentsClient({ commits }: MomentsClientProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // 快捷复制 Commit Hash
  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // 预设类型分类
  const types = ["all", "feat", "fix", "refactor", "docs", "style", "chore"];

  const filteredCommits =
    selectedType === "all" ? commits : commits.filter((c) => c.type === selectedType);

  // GSAP 入场动画
  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".gsap-commit-item");
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 16, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.45,
        stagger: 0.025,
        ease: "power2.out",
        clearProps: "filter,transform",
      }
    );
  }, [selectedType]);

  // 解析 Commit Body 段落（针对 [背景], [问题], [方案] 等结构化输入优化展示）
  const parseCommitBody = (bodyStr?: string) => {
    if (!bodyStr) return null;

    // 匹配 [背景] xxx [问题] xxx 模式
    const sections = bodyStr.split(/(?=\[[^\]]+\])/g).filter(Boolean);

    if (sections.length <= 1 && !bodyStr.includes("[")) {
      return (
        <div className="text-xs text-[var(--muted)] whitespace-pre-wrap leading-relaxed">
          {bodyStr}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
        {sections.map((section, idx) => {
          const match = section.match(/^\[([^\]]+)\]([\s\S]*)/);
          if (match) {
            const title = match[1];
            const content = match[2].trim();
            return (
              <div
                key={idx}
                className="p-2 sm:p-2.5 rounded-lg bg-[var(--page)]/80 border border-[var(--line)]/20 space-y-1"
              >
                <div className="text-[11px] font-bold font-mono text-[var(--accent)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
                  <span>{title}</span>
                </div>
                <div className="text-xs text-[var(--muted)] whitespace-pre-wrap leading-relaxed pl-2">
                  {content}
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="text-xs text-[var(--muted)] whitespace-pre-wrap leading-relaxed">
              {section}
            </div>
          );
        })}
      </div>
    );
  };

  // 获取 Commit 类型 Pill 颜色
  const getCommitTypeBadge = (type?: string) => {
    switch (type) {
      case "feat":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "fix":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "refactor":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "docs":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "style":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
      default:
        return "bg-[var(--line)]/30 text-[var(--muted)] border-[var(--line)]/40";
    }
  };

  return (
    <div ref={containerRef} className="w-full space-y-5">
      {/* 顶部 Filter 栏目铺满整行 */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)]/20 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-mono text-[var(--mute)] flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 opacity-60" />
            <span>类型:</span>
          </span>
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all border cursor-pointer ${
                selectedType === type
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] font-semibold shadow-2xs"
                  : "bg-[var(--page-alt)]/60 text-[var(--muted)] hover:text-[var(--text)] border-transparent hover:border-[var(--line)]/30"
              }`}
            >
              {type === "all" ? "全部 (ALL)" : type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--mute)]">
          <Terminal className="w-3.5 h-3.5 opacity-60" />
          <span>main branch</span>
        </div>
      </div>

      {/* 无匹配日志时 */}
      {filteredCommits.length === 0 && (
        <div className="w-full text-center py-10 text-[var(--muted)] space-y-2">
          <p className="text-sm font-bold">暂无该类型的 Git 提交记录</p>
          <button
            type="button"
            onClick={() => setSelectedType("all")}
            className="text-xs text-[var(--accent)] underline underline-offset-4"
          >
            显示全部 Commit
          </button>
        </div>
      )}

      {/* Git Commit 链条时间轴全宽布局 */}
      <div className="w-full relative space-y-4 pl-3 sm:pl-4 border-l-2 border-[var(--line)]/30">
        {filteredCommits.map((commit) => {
          const formattedDate = commit.date
            ? format(new Date(commit.date), "yyyy-MM-dd HH:mm", { locale: zhCN })
            : "";

          return (
            <div
              key={commit.hash || commit.abbrevHash}
              className="gsap-commit-item w-full relative group pl-4 sm:pl-6"
            >
              {/* 时间轴 Git 节点圆点 */}
              <div className="absolute -left-[19px] sm:-left-[23px] top-3.5 w-3 h-3 rounded-full bg-[var(--page)] border-2 border-[var(--accent)] group-hover:scale-125 transition-transform duration-300 shadow-2xs" />

              {/* Commit 卡片，全宽展示 */}
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-[var(--page-alt)]/60 hover:bg-[var(--page-alt)] border border-[var(--line)]/30 space-y-3 transition-all duration-300 hover:shadow-sm">
                {/* 头部：Badge + 标题 + 复制按钮 */}
                <div className="w-full flex flex-wrap items-start justify-between gap-2.5 border-b border-[var(--line)]/15 pb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className={`shrink-0 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border uppercase ${getCommitTypeBadge(
                        commit.type
                      )}`}
                    >
                      {commit.type || "commit"}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-[var(--text)] tracking-tight break-words">
                      {commit.subject}
                    </h2>
                  </div>

                  {/* Hash 复制 */}
                  <button
                    type="button"
                    onClick={() => handleCopyHash(commit.hash)}
                    className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--page)] text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)]/30 transition-all active:scale-95 cursor-pointer shadow-2xs hover:shadow-xs"
                    title="点击复制完整 Hash"
                  >
                    {copiedHash === commit.hash ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-60" />
                    )}
                    <span>{commit.abbrevHash}</span>
                  </button>
                </div>

                {/* Body 结构化段落 */}
                {parseCommitBody(commit.body)}

                {/* 底部元数据 */}
                <div className="w-full flex items-center justify-between pt-1 text-xs font-mono text-[var(--mute)]">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 opacity-60" />
                    <span className="font-medium text-[var(--muted)]">{commit.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 opacity-60" />
                    <time dateTime={commit.date}>{formattedDate}</time>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
