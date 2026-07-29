"use client";

import React, { useState } from "react";
import type { Link as LinkItem } from "@/lib/types";
import { site } from "@/data/site";
import { ArrowUpRight, Globe, Sparkles, Copy, Check } from "lucide-react";

interface LinksClientProps {
  links: LinkItem[];
}

export function LinksClient({ links }: LinksClientProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("全部");
  const [copied, setCopied] = useState(false);

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
      {/* 1. 无边框 Pill 组别控制器 */}
      {groups.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((group) => {
            const active = selectedGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-[var(--page-alt)] text-[var(--accent)] shadow-2xs scale-102"
                    : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]/60"
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>
      )}

      {/* 2. 画廊风格高感友链卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map((link) => {
          // 提取干净的域名后缀显示
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
              className="group relative p-4 rounded-2xl bg-[var(--page-alt)]/50 hover:bg-[var(--page-alt)] transition-all duration-300 hover:-translate-y-1 shadow-2xs hover:shadow-md border-0 flex items-start gap-3.5"
            >
              {/* 头像 */}
              <div className="relative shrink-0 w-12 h-12">
                <img
                  src={link.avatar}
                  alt={link.title}
                  className="w-full h-full rounded-2xl object-cover shadow-2xs bg-[var(--page)] border border-[var(--line)]/20 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* 文本区域 */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {link.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                </div>
                <p className="text-xs text-[var(--muted)] line-clamp-1 font-medium">
                  {link.description || "暂无描述"}
                </p>
                <div className="text-[0.7rem] font-mono text-[var(--mute)] truncate pt-0.5">
                  {domain}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* 3. 底部水墨“申请互换友链”面板 */}
      <section className="bg-[var(--page-alt)]/40 rounded-3xl p-6 sm:p-7 space-y-5 border-0 shadow-2xs mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[var(--accent)]" />
              <h3 className="font-black text-lg text-[var(--text)]">
                申请互换友链
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-medium">
              欢迎优秀创作者互换友链，请先在贵站添加本站链接后留言反馈。
            </p>
          </div>

          {/* 一键复制博客信息 */}
          <button
            type="button"
            onClick={handleCopySiteInfo}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--page)] hover:bg-[var(--page-alt)] text-xs font-bold text-[var(--text)] border-0 shadow-2xs hover:shadow-md transition-all shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">已复制本站信息</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>一键复制本站信息</span>
              </>
            )}
          </button>
        </div>

        {/* 无边框通透水墨代码展示面板 */}
        <div className="bg-[var(--page)]/90 rounded-2xl p-5 text-xs sm:text-sm font-mono text-[var(--muted)] space-y-2.5 border-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-xs font-bold text-[var(--text)] bg-[var(--page-alt)]/80 px-2 py-0.5 rounded-md">名称</span>
            <span className="text-[var(--text)] font-semibold">{site.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-xs font-bold text-[var(--text)] bg-[var(--page-alt)]/80 px-2 py-0.5 rounded-md">网址</span>
            <span className="text-[var(--accent)] truncate">{site.url}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-xs font-bold text-[var(--text)] bg-[var(--page-alt)]/80 px-2 py-0.5 rounded-md">图标</span>
            <span className="truncate">{site.url}/logo.png</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-xs font-bold text-[var(--text)] bg-[var(--page-alt)]/80 px-2 py-0.5 rounded-md">描述</span>
            <span className="truncate">{site.subtitle || site.description}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
