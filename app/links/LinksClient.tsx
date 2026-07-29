'use client';

import React, { useState } from "react";
import type { Link as LinkItem } from "@/lib/types";
import { site } from "@/data/site";
import { ArrowUpRight, Sparkles, Copy, Check, ChevronDown } from "lucide-react";

interface LinksClientProps {
  links: LinkItem[];
}

export function LinksClient({ links }: LinksClientProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("全部");
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const groups = ["全部", ...Array.from(new Set(links.map((l) => l.group)))];

  const filteredLinks =
    selectedGroup === "全部"
      ? links
      : links.filter((l) => l.group === selectedGroup);

  const handleCopySiteInfo = () => {
    const text = `名称：${site.title}\n网址：${site.url}\n图标：${site.url}/logo.png\n描述：${site.subtitle || site.description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. 软胶囊 Tab 组别控制器 (消除纯黑底块) */}
      {groups.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((group) => {
            const active = selectedGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-250 cursor-pointer ${
                  active
                    ? "bg-[var(--page-alt)] text-[var(--accent)] font-extrabold shadow-2xs"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/50 font-medium"
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>
      )}

      {/* 2. 画廊风格高感友链卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredLinks.map((link) => {
          let domain = "";
          try {
            domain = new URL(link.href).hostname.replace(/^www\./, "");
          } catch {
            domain = link.href;
          }

          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 sm:p-4.5 rounded-2xl bg-[var(--page-alt)]/50 hover:bg-[var(--page-alt)]/80 transition-colors duration-200 border-0 flex items-start gap-3.5"
            >
              {/* 头像 */}
              <div className="relative shrink-0 w-11 h-11">
                <img
                  src={link.avatar}
                  alt={link.title}
                  className="w-full h-full rounded-xl object-cover bg-[var(--page)] border border-[var(--line)]/15"
                />
              </div>

              {/* 文本区域 */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {link.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted)] opacity-40 group-hover:opacity-90 group-hover:text-[var(--accent)] transition-colors shrink-0 ml-1" />
                </div>
                <p className="text-xs text-[var(--muted)]/80 line-clamp-1 font-medium">
                  {link.description || "暂无描述"}
                </p>
                <div className="text-[0.7rem] font-mono text-[var(--muted)]/50 truncate pt-0.5">
                  {domain}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* 3. 底部“申请互换友链”轻量面板 (默认隐藏详细参数代码) */}
      <section className="bg-[var(--page-alt)]/30 rounded-3xl p-5 sm:p-6 border-0 shadow-2xs mt-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <h3 className="font-extrabold text-base text-[var(--text)]">
                申请互换友链
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-medium">
              欢迎优秀创作者互换友链，请先在贵站添加本站链接后留言反馈。
            </p>
          </div>

          {/* 右侧胶囊操作组 */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--page)]/90 hover:bg-[var(--page-alt)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] border-0 shadow-2xs transition-all cursor-pointer"
            >
              <span>本站格式</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDetails ? "rotate-180 text-[var(--accent)]" : ""}`} />
            </button>

            <button
              type="button"
              onClick={handleCopySiteInfo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--page)]/90 hover:bg-[var(--page-alt)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] border-0 shadow-2xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 opacity-70" />
                  <span>一键复制</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 按需折叠展开的详细格式面板 */}
        {showDetails && (
          <div className="bg-[var(--page)]/90 rounded-2xl p-4 text-xs sm:text-sm font-mono text-[var(--muted)] space-y-2 border-0 shadow-2xs animate-in fade-in zoom-in-98 duration-200">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-[11px] font-bold text-[var(--muted)] bg-[var(--page-alt)] px-2 py-0.5 rounded-md">名称</span>
              <span className="text-[var(--text)] font-semibold">{site.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-[11px] font-bold text-[var(--muted)] bg-[var(--page-alt)] px-2 py-0.5 rounded-md">网址</span>
              <span className="text-[var(--accent)] truncate">{site.url}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-[11px] font-bold text-[var(--muted)] bg-[var(--page-alt)] px-2 py-0.5 rounded-md">图标</span>
              <span className="truncate text-[var(--muted)]/80">{site.url}/logo.png</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-[11px] font-bold text-[var(--muted)] bg-[var(--page-alt)] px-2 py-0.5 rounded-md">描述</span>
              <span className="truncate text-[var(--muted)]/80">{site.subtitle || site.description}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
