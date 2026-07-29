'use client';

import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface PostCopyrightCardProps {
  title: string;
  author?: string;
  pubDate?: string;
  slug: string;
  wordCount?: number;
}

export function PostCopyrightCard({ title, author = 'Kerntau', slug }: PostCopyrightCardProps) {
  const [postUrl, setPostUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPostUrl(`${window.location.origin}/posts/${slug}`);
  }, [slug]);

  const copyUrl = () => {
    if (!postUrl) return;
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="group/license relative overflow-hidden rounded-xl sm:rounded-2xl bg-[var(--page-alt)]/60 p-3.5 sm:p-4 backdrop-blur-md transition-all mt-4 sm:mt-6">
      {/* 装饰性背景 CC 水印 */}
      <div className="absolute -bottom-6 -right-6 z-0 select-none opacity-[0.05] pointer-events-none text-[var(--text)]">
        <svg className="w-28 h-28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-11c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.87 0 1.63-.44 2.09-1.1l1.61.96C12.49 15.11 11.34 16 10 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.34 0 2.49.89 2.91 2.13l-1.61.96c-.46-.66-1.22-1.09-2.09-1.09zm5 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.87 0 1.63-.44 2.09-1.1l1.61.96c-.71 1.25-1.86 2.14-3.21 2.14-2.21 0-4-1.79-4-4s1.79-4 4-4c1.34 0 2.49.89 2.91 2.13l-1.61.96c-.46-.66-1.22-1.09-2.09-1.09z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* 带官方蓝 V 认证标的 OG 图像 */}
          <div className="relative shrink-0">
            <img
              src="/og-image.jpg"
              alt="OG Card"
              className="w-8 h-8 rounded-full object-cover border border-black/10 dark:border-white/15 shadow-2xs"
            />
            <span
              title="官方蓝 V 认证"
              className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#1D9BF0] text-white shadow-2xs ring-1.5 ring-[var(--page-alt)]"
            >
              <svg className="w-1.8 h-1.8 fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
          </div>
          <div className="flex flex-col text-xs space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5 font-bold text-[var(--text)] flex-wrap">
              <span>{author} 原创文章认证</span>
              <span className="text-[10px] text-[var(--muted)]/60">•</span>
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline font-extrabold"
              >
                CC BY-NC-SA 4.0
              </a>
            </div>
            <p className="text-[11px] text-[var(--muted)] truncate max-w-full">
              {postUrl || title}
            </p>
          </div>
        </div>

        {/* 一键复制链接按钮 */}
        {postUrl && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={copyUrl}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--page)] px-3 py-1 text-[11px] sm:text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors shadow-2xs cursor-pointer shrink-0 max-sm:w-full max-sm:justify-center border border-[var(--line)]/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{copied ? '✓ 已复制链接' : '复制文章链接'}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">点击复制原文链接</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
