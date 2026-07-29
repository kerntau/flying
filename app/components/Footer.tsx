"use client";

import React, { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { site } from "@/data/site";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

function SiteUptime() {
  const [uptime, setUptime] = useState("");

  useEffect(() => {
    const startTimeStr = site.siteCreatedAt || "2025-11-10T00:07:03";
    const startTime = new Date(startTimeStr).getTime();

    const update = () => {
      const diff = Date.now() - startTime;
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setUptime(`${days}天${hours}时${mins}分${secs}秒`);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!uptime) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
      <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      <span>已运行 <span className="font-mono text-[var(--text)] font-medium tabular-nums">{uptime}</span></span>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="fly-site-footer w-full mt-8 border-t border-[var(--line)]/60 text-xs text-[var(--muted)] pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* 1. 移动端布局 (< 640px)：清晰垂直居中分行排版 */}
        <div className="flex flex-col items-center gap-2 text-center sm:hidden">
          {/* Row 1: 版权标 */}
          <div className="font-medium text-[var(--text)] inline-flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="fly-brand-text text-sm font-black">{site.title}</span>
          </div>

          {/* Row 2: 备案信息 */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
            {site.icp && (
              <a
                href={site.icpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[var(--text)] transition-colors inline-flex items-center gap-1 text-[var(--muted)]"
              >
                <img src="/assets/images/icp-beian.webp" alt="ICP备案" className="w-3.5 h-3.5 object-contain shrink-0" />
                <span>{site.icp}</span>
              </a>
            )}
            {site.icp && site.gongan && <span className="opacity-40">•</span>}
            {site.gongan && (
              <a
                href={site.gonganUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[var(--text)] transition-colors inline-flex items-center gap-1 text-[var(--muted)]"
              >
                <img src="/assets/images/gongan-beian.png" alt="公安备案" className="w-3.5 h-3.5 object-contain shrink-0" />
                <span>{site.gongan}</span>
              </a>
            )}
          </div>

          {/* Row 3: 运行时间 */}
          <div className="pt-0.5">
            <SiteUptime />
          </div>

          {/* Row 4: 驱动胶囊 & 开源项目 */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
              <svg className="w-3.5 h-3.5 fill-current shrink-0 opacity-90" viewBox="0 0 24 24">
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.8 8 12 11.8 5.2 8 12 4.2zM5 9.5l6 3.3v6.7l-6-3.3V9.5zm8 10v-6.7l6-3.3v6.7l-6 3.3z" />
              </svg>
              <span>腾讯云 EdgeOne 驱动</span>
            </span>

            <a
              href="https://github.com/kerntau/flying"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--page-alt)] hover:bg-[var(--hover-bg-color)] text-[var(--text)] transition-all border border-[var(--line)] shadow-2xs group"
            >
              <Github className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 transition-opacity shrink-0" />
              <span>Theme Flying</span>
            </a>
          </div>
        </div>

        {/* 2. 桌面端布局 (>= 640px)：单行连贯排布 */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2.5 text-center">
          {/* 版权 */}
          <span className="font-medium text-[var(--text)] inline-flex items-center gap-1">© {new Date().getFullYear()} <span className="fly-brand-text text-sm font-black">{site.title}</span></span>

          {/* ICP 备案 */}
          {site.icp && (
            <>
              <span className="text-[var(--line)]">•</span>
              <a
                href={site.icpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[var(--text)] transition-colors inline-flex items-center gap-1 text-[var(--muted)]"
              >
                <img src="/assets/images/icp-beian.webp" alt="ICP备案" className="w-3.5 h-3.5 object-contain shrink-0" />
                <span>{site.icp}</span>
              </a>
            </>
          )}

          {/* 公安网安备案 */}
          {site.gongan && (
            <>
              <span className="text-[var(--line)]">•</span>
              <a
                href={site.gonganUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[var(--text)] transition-colors inline-flex items-center gap-1 text-[var(--muted)]"
              >
                <img src="/assets/images/gongan-beian.png" alt="公安备案" className="w-3.5 h-3.5 object-contain shrink-0" />
                <span>{site.gongan}</span>
              </a>
            </>
          )}

          {/* 动态运行时间 */}
          <span className="text-[var(--line)]">•</span>
          <SiteUptime />

          {/* 驱动胶囊 */}
          <span className="text-[var(--line)]">•</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
            <svg className="w-3.5 h-3.5 fill-current shrink-0 opacity-90" viewBox="0 0 24 24">
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.8 8 12 11.8 5.2 8 12 4.2zM5 9.5l6 3.3v6.7l-6-3.3V9.5zm8 10v-6.7l6-3.3v6.7l-6 3.3z" />
            </svg>
            <span>腾讯云 EdgeOne 驱动</span>
          </span>

          {/* 开源仓库胶囊 */}
          <span className="text-[var(--line)]">•</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/kerntau/flying"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--page-alt)] hover:bg-[var(--hover-bg-color)] text-[var(--text)] transition-all border border-[var(--line)] shadow-2xs hover:shadow-xs group"
              >
                <Github className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 transition-opacity shrink-0" />
                <span>Theme Flying</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">查看 Theme Flying GitHub 开源仓库</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
}
