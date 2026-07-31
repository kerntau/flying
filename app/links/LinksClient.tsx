'use client';

import React, { useState } from "react";
import type { Link as LinkItem } from "@/lib/types";
import { site } from "@/data/site";
import { Sparkles, Copy, Check, ChevronDown, ExternalLink } from "lucide-react";
import { fireConfetti } from "@/lib/confetti";
import { GitalkComments } from "@/components/GitalkComments";

interface LinksClientProps {
  links: LinkItem[];
}

function getDomainHost(href: string): string {
  try {
    const url = new URL(href);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
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
    void fireConfetti({ particleCount: 50, spread: 70 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. 软胶囊 Tab 组别控制器 */}
      {groups.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((group) => {
            const active = selectedGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
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

      {/* 2. 纯净无框极简友链列表网格 (去掉实体卡片背景框与边框) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 sm:gap-y-3 gap-x-6">
        {filteredLinks.map((link) => {
          const domainHost = getDomainHost(link.href);

          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-[var(--page-alt)]/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* 极简圆润头像 */}
                <img
                  src={link.avatar}
                  alt={link.title}
                  className="w-9 h-9 rounded-full object-cover shrink-0 bg-[var(--page-alt)] border border-[var(--line)]/30 group-hover:scale-105 transition-transform duration-200"
                />

                {/* 文本信息 */}
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {link.title}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--muted)] opacity-60 truncate shrink-0">
                      ({domainHost})
                    </span>
                  </div>

                  {link.description && (
                    <p className="text-xs text-[var(--muted)] truncate mt-0.5 font-normal opacity-85">
                      {link.description}
                    </p>
                  )}
                </div>
              </div>

              {/* 右侧外链指示器 */}
              <ExternalLink className="w-3.5 h-3.5 text-[var(--muted)] opacity-30 group-hover:opacity-100 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all duration-200 shrink-0 ml-2" />
            </a>
          );
        })}
      </div>

      {/* 3. 底部“申请互换友链”轻量面板 */}
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
              onClick={handleCopySiteInfo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--page-alt)]/80 hover:bg-[var(--page-alt)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] border-0 transition-all cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? "已复制本站信息" : "复制本站信息"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--page-alt)]/80 hover:bg-[var(--page-alt)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] border-0 transition-all cursor-pointer"
            >
              <span>{showDetails ? "收起格式" : "本站格式"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDetails ? "rotate-180 text-[var(--accent)]" : ""}`} />
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

      {/* 4. Gitalk 留言申请与讨论区 */}
      <GitalkComments />
    </div>
  );
}
