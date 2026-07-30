"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  Copy,
  Check,
  Search,
  X,
  Sparkles,
  Bug,
  RefreshCw,
  FileText,
  Palette,
  Wrench,
  Zap,
  Box,
} from "lucide-react";
import type { GitCommit } from "@/lib/types";
import { gsap } from "@/lib/gsap";

interface MomentsClientProps {
  commits: GitCommit[];
}

export function MomentsClient({ commits }: MomentsClientProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // 快捷复制 Commit Hash
  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // 预设类型分类
  const types = [
    { key: "all", label: "全部" },
    { key: "feat", label: "feat" },
    { key: "fix", label: "fix" },
    { key: "refactor", label: "refactor" },
    { key: "docs", label: "docs" },
    { key: "style", label: "style" },
    { key: "chore", label: "chore" },
  ];

  // 计算每种类型的数量
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: commits.length };
    commits.forEach((c) => {
      if (c.type) {
        counts[c.type] = (counts[c.type] || 0) + 1;
      }
    });
    return counts;
  }, [commits]);

  // 过滤提交（支持匹配 cleanSubject、subject、scope、body、hash、author）
  const filteredCommits = useMemo(() => {
    return commits.filter((c) => {
      const matchType = selectedType === "all" || c.type === selectedType;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        c.subject.toLowerCase().includes(q) ||
        (c.cleanSubject && c.cleanSubject.toLowerCase().includes(q)) ||
        (c.scope && c.scope.toLowerCase().includes(q)) ||
        c.hash.toLowerCase().includes(q) ||
        (c.body && c.body.toLowerCase().includes(q)) ||
        (c.author && c.author.toLowerCase().includes(q));
      return matchType && matchSearch;
    });
  }, [commits, selectedType, searchQuery]);

  // GSAP 入场动画
  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".gsap-commit-item");
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  }, [selectedType, searchQuery]);

  // 多模式智能 Commit Body 解析适配（悬挂缩进规范化）
  const parseCommitBody = (bodyStr?: string) => {
    if (!bodyStr) return null;

    // 已知结构化白名单标签，防止像 shadow-[0_10px_30px...] 这类代码中括号被误切
    const KNOWN_TAGS = ["背景", "问题", "方案", "影响", "风险", "优化", "重构", "功能", "测试", "说明", "注意"];
    const tagPattern = new RegExp(`(?=\\[(?:${KNOWN_TAGS.join("|")})\\])`, "g");
    const sections = bodyStr.split(tagPattern).filter(Boolean);

    const isStructured = sections.some((s) =>
      KNOWN_TAGS.some((t) => s.trim().startsWith(`[${t}]`))
    );

    if (isStructured) {
      const getSectionTagStyle = (title: string) => {
        switch (title) {
          case "背景":
            return "text-slate-500 bg-slate-500/10 dark:text-slate-400";
          case "问题":
            return "text-amber-600 bg-amber-500/10 dark:text-amber-400";
          case "方案":
            return "text-blue-600 bg-blue-500/10 dark:text-blue-400";
          case "影响":
            return "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400";
          case "风险":
            return "text-rose-600 bg-rose-500/10 dark:text-rose-400";
          default:
            return "text-[var(--accent)] bg-[var(--accent)]/10";
        }
      };

      return (
        <div className="space-y-2 pt-0.5">
          {sections.map((section, idx) => {
            const match = section.match(/^\[([^\]]+)\]([\s\S]*)/);
            if (match && KNOWN_TAGS.includes(match[1])) {
              const title = match[1];
              const content = match[2].trim();
              const tagStyle = getSectionTagStyle(title);

              const contentLines = content
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);

              return (
                <div key={idx} className="text-xs flex items-start gap-2.5 leading-relaxed">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 mt-0.5 ${tagStyle}`}
                  >
                    {title}
                  </span>
                  <div className="text-[var(--muted)] space-y-1 flex-1 min-w-0">
                    {contentLines.map((line, lineIdx) => (
                      <div key={lineIdx} className="break-words">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className="text-xs text-[var(--muted)] leading-relaxed break-words pl-10">
                {section}
              </div>
            );
          })}
        </div>
      );
    }

    // 模式 2：列表 Bullet 点 (以 - 或 * 开头)
    const lines = bodyStr.split("\n").filter(Boolean);
    const isBulletList = lines.some((l) => /^\s*[-*]\s+/.test(l));

    if (isBulletList) {
      return (
        <ul className="space-y-1 pt-0.5 text-xs text-[var(--muted)] list-disc list-inside leading-relaxed">
          {lines.map((line, idx) => (
            <li key={idx} className="marker:text-[var(--accent)]/60">
              {line.replace(/^\s*[-*]\s+/, "")}
            </li>
          ))}
        </ul>
      );
    }

    // 模式 3：常规多行/单行文本
    return (
      <div className="text-xs text-[var(--muted)]/90 whitespace-pre-wrap leading-relaxed pt-0.5">
        {bodyStr}
      </div>
    );
  };

  // 获取 Commit 类型 Badge & 图标
  const getCommitTypeInfo = (type?: string) => {
    switch (type) {
      case "feat":
        return {
          icon: <Sparkles className="w-3 h-3" />,
          style: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
        };
      case "fix":
        return {
          icon: <Bug className="w-3 h-3" />,
          style: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
        };
      case "refactor":
        return {
          icon: <RefreshCw className="w-3 h-3" />,
          style: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
        };
      case "docs":
        return {
          icon: <FileText className="w-3 h-3" />,
          style: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
        };
      case "style":
        return {
          icon: <Palette className="w-3 h-3" />,
          style: "text-pink-600 dark:text-pink-400 bg-pink-500/10",
        };
      case "chore":
        return {
          icon: <Wrench className="w-3 h-3" />,
          style: "text-slate-600 dark:text-slate-400 bg-slate-500/10",
        };
      case "perf":
        return {
          icon: <Zap className="w-3 h-3" />,
          style: "text-orange-600 dark:text-orange-400 bg-orange-500/10",
        };
      default:
        return {
          icon: <Box className="w-3 h-3" />,
          style: "text-[var(--muted)] bg-[var(--page-alt)]",
        };
    }
  };

  return (
    <div ref={containerRef} className="w-full space-y-6">
      {/* 高级极简 Tab 栏 + 搜索框 */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)]/15 pb-1">
        {/* 极简文字 Tab，支持移动端横向平滑滚动 */}
        <nav className="flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar py-1 pr-2">
          {types.map(({ key, label }) => {
            const count = typeCounts[key] || 0;
            const isSelected = selectedType === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedType(key)}
                className={`relative pb-2 text-xs font-mono transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "text-[var(--text)] font-bold"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                <span>{label}</span>
                <span className="text-[11px] opacity-60">({count})</span>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* 轻量微通透搜索框 */}
        <div className="relative flex items-center w-full sm:w-[200px] mb-1 shrink-0">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-[var(--muted)] pointer-events-none opacity-50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索日志..."
            className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-[var(--page-alt)]/30 text-[var(--text)] placeholder-[var(--muted)]/60 focus:bg-[var(--page-alt)]/60 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-[var(--muted)] hover:text-[var(--text)] cursor-pointer"
              title="清空搜索"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 无匹配日志时 */}
      {filteredCommits.length === 0 && (
        <div className="w-full text-center py-12 text-[var(--muted)] space-y-2">
          <p className="text-sm font-medium">未找到匹配的 Git 提交记录</p>
          <button
            type="button"
            onClick={() => {
              setSelectedType("all");
              setSearchQuery("");
            }}
            className="text-xs text-[var(--accent)] underline underline-offset-4 cursor-pointer"
          >
            重置所有筛选
          </button>
        </div>
      )}

      {/* 极简流线型 Feed */}
      <div className="w-full relative space-y-6 pl-2 sm:pl-3">
        {/* 左侧连贯时间轴轨 */}
        <div className="absolute left-[3px] sm:left-[7px] top-3 bottom-3 w-[1px] bg-[var(--line)]/25 pointer-events-none" />

        {filteredCommits.map((commit) => {
          const formattedDate = commit.date
            ? format(new Date(commit.date), "yyyy-MM-dd HH:mm", { locale: zhCN })
            : "";
          const typeInfo = getCommitTypeInfo(commit.type);
          const displaySubject = commit.cleanSubject || commit.subject;

          return (
            <div
              key={commit.hash || commit.abbrevHash}
              className="gsap-commit-item w-full relative group pl-5 sm:pl-6"
            >
              {/* 深质感节点，悬浮亮主题色 */}
              <div className="absolute left-[-1px] sm:left-[3px] top-1.5 w-2 h-2 rounded-full bg-[var(--page)] border border-[var(--muted)]/50 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-all duration-200" />

              {/* Feed 核心内容排版 */}
              <div className="w-full space-y-2">
                {/* 标头行：类型 Tag + Subject + 紧随其后的 Hash */}
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--text)]">
                  <span
                    className={`shrink-0 text-[10px] font-mono font-semibold px-2 py-0.5 rounded flex items-center gap-1 uppercase ${typeInfo.style}`}
                  >
                    {typeInfo.icon}
                    <span>
                      {commit.type || "commit"}
                      {commit.scope ? `(${commit.scope})` : ""}
                    </span>
                  </span>

                  <h2 className="tracking-tight break-words text-sm font-bold text-[var(--text)]">
                    {displaySubject}
                  </h2>

                  {/* Hash 紧跟标题 */}
                  <button
                    type="button"
                    onClick={() => handleCopyHash(commit.hash)}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-mono text-[var(--muted)]/70 hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors cursor-pointer shrink-0"
                    title="点击复制 Hash"
                  >
                    {copiedHash === commit.hash ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-40" />
                    )}
                    <span>{commit.abbrevHash}</span>
                  </button>
                </div>

                {/* Body 结构化排版 */}
                {parseCommitBody(commit.body)}

                {/* 移动端显示的日期 */}
                <div className="sm:hidden text-[11px] font-mono text-[var(--muted)] opacity-60 pt-0.5">
                  {formattedDate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
