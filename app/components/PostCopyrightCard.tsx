'use client';

import React, { useEffect, useState } from 'react';

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
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group/copyright relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--page-alt)]/60 p-4 sm:p-6 backdrop-blur-md transition-all hover:border-[var(--muted)]/30 dark:bg-zinc-900/40 my-8">
      {/* 艺术化 CC 背景水印 */}
      <div className="absolute -bottom-10 -right-10 z-0 select-none opacity-[0.04] transition-transform duration-700 group-hover/copyright:scale-105 dark:opacity-[0.07] pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text)]">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-11c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.87 0 1.63-.44 2.09-1.1l1.61.96C12.49 15.11 11.34 16 10 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.34 0 2.49.89 2.91 2.13l-1.61.96c-.46-.66-1.22-1.09-2.09-1.09zm5 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.87 0 1.63-.44 2.09-1.1l1.61.96c-.71 1.25-1.86 2.14-3.21 2.14-2.21 0-4-1.79-4-4s1.79-4 4-4c1.34 0 2.49.89 2.91 2.13l-1.61.96c-.46-.66-1.22-1.09-2.09-1.09z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
        {/* 标题 & 可点击复制的 URL 标签 */}
        <div className="space-y-1.5">
          <h4 className="text-sm sm:text-base font-semibold tracking-tight text-[var(--text)] line-clamp-1">
            {title}
          </h4>
          {postUrl && (
            <button
              onClick={copyUrl}
              type="button"
              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[var(--page)] border border-[var(--line)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--muted)]/50 transition-all cursor-pointer truncate max-w-full"
              title="点击复制文章链接"
            >
              <span className="truncate">{postUrl}</span>
              <span className="text-[10px] text-blue-500 font-sans shrink-0 font-medium">
                {copied ? '✓ 已复制' : '复制'}
              </span>
            </button>
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
