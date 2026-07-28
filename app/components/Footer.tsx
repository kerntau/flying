"use client";

import React, { useState, useEffect } from "react";
import { site } from "@/data/site";

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
      <span>已运行 <span className="font-mono text-[var(--text)] font-semibold tabular-nums">{uptime}</span></span>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="fly-site-footer w-full mt-5 border-t border-[var(--line)] text-xs text-[var(--mute)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 text-center">
        {/* 单行横向排列：版权 */}
        <span className="font-semibold text-[var(--text)]">© {new Date().getFullYear()} {site.title}</span>

        <span className="text-[var(--mute)] opacity-40">•</span>

        {/* 动态运行时间 */}
        <SiteUptime />

        <span className="text-[var(--mute)] opacity-40">•</span>

        {/* EdgeOne 驱动 */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20">
          <svg className="w-3.5 h-3.5 fill-current shrink-0 opacity-90" viewBox="0 0 24 24">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.8 8 12 11.8 5.2 8 12 4.2zM5 9.5l6 3.3v6.7l-6-3.3V9.5zm8 10v-6.7l6-3.3v6.7l-6 3.3z" />
          </svg>
          <span>腾讯云 EdgeOne 驱动</span>
        </span>

        <span className="text-[var(--mute)] opacity-40">•</span>

        {/* Theme Flying 仓库 */}
        <a
          href="https://github.com/kerntau/flying"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--page-alt)] hover:bg-[var(--hover-bg-color)] text-[var(--text)] transition-all border border-[var(--line)] shadow-2xs hover:shadow-xs group"
          title="查看 Theme Flying GitHub 开源仓库"
        >
          <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity shrink-0" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>Theme Flying</span>
        </a>
      </div>
    </footer>
  );
}
