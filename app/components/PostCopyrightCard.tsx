'use client';

import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface PostCopyrightCardProps {
  title: string;
  author?: string;
  pubDate?: string;
  slug: string;
}

export function PostCopyrightCard({ title, author = 'Kerntau', pubDate, slug }: PostCopyrightCardProps) {
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
    <div className="fly-copyright-card relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--page-alt)] p-5 sm:p-6 transition-all shadow-2xs hover:shadow-xs">
      <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
        {/* 标题 & 可点击复制的 URL 标签 */}
        <div className="space-y-1.5">
          <h4 className="text-sm sm:text-base font-semibold tracking-tight text-[var(--text)] line-clamp-1">
            {title}
          </h4>
          {postUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={copyUrl}
                  type="button"
                  className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[var(--page)] border border-[var(--line)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--muted)]/50 transition-all cursor-pointer truncate max-w-full"
                >
                  <span className="truncate">{postUrl}</span>
                  <span className="text-[10px] text-blue-500 font-sans shrink-0 font-medium">
                    {copied ? '✓ 已复制' : '复制'}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">点击复制文章链接</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* 4列属性网格 */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 sm:grid-cols-4 pt-0.5 border-t border-[var(--line)]/50">
          <div className="flex flex-col gap-0.5 pt-2">
            <span className="text-[10px] font-medium text-[var(--mute)]">作者</span>
            <span className="text-xs sm:text-sm font-medium text-[var(--text)]">{author}</span>
          </div>

          <div className="flex flex-col gap-0.5 pt-2">
            <span className="text-[10px] font-medium text-[var(--mute)]">发布时间</span>
            <time className="text-xs sm:text-sm font-medium text-[var(--text)]">{pubDate || '2026/3/20'}</time>
          </div>

          <div className="flex flex-col gap-0.5 pt-2">
            <span className="text-[10px] font-medium text-[var(--mute)]">更新时间</span>
            <time className="text-xs sm:text-sm font-medium text-[var(--text)]">{pubDate || '2026/3/20'}</time>
          </div>

          <div className="flex flex-col gap-0.5 pt-2">
            <span className="text-[10px] font-medium text-[var(--mute)]">许可协议</span>
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              CC BY-NC-SA 4.0
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
