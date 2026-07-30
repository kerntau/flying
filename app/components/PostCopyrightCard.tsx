'use client';

import React, { useEffect, useState } from 'react';
import { site } from '@/data/site';

interface PostCopyrightCardProps {
  title: string;
  author?: string;
  pubDate?: string;
  slug: string;
  wordCount?: number;
}

export function PostCopyrightCard({ title, author = 'Kerntau', slug }: PostCopyrightCardProps) {
  const [postUrl, setPostUrl] = useState('');

  useEffect(() => {
    setPostUrl(`${window.location.origin}/posts/${slug}`);
  }, [slug]);

  return (
    <div className="group/license relative overflow-hidden rounded-xl sm:rounded-2xl bg-[var(--page-alt)]/50 p-3.5 sm:p-4 border border-[var(--line)]/50 backdrop-blur-md transition-all mt-6 sm:mt-8">
      {/* 装饰性背景 CC 水印 */}
      <div className="absolute -bottom-6 -right-6 z-0 select-none opacity-[0.035] pointer-events-none text-[var(--text)]">
        <svg className="w-28 h-28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-11c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.87 0 1.63-.44 2.09-1.1l1.61.96C12.49 15.11 11.34 16 10 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.34 0 2.49.89 2.91 2.13l-1.61.96c-.46-.66-1.22-1.09-2.09-1.09zm5 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.87 0 1.63-.44 2.09-1.1l1.61.96c-.71 1.25-1.86 2.14-3.21 2.14-2.21 0-4-1.79-4-4s1.79-4 4-4c1.34 0 2.49.89 2.91 2.13l-1.61.96c-.46-.66-1.22-1.09-2.09-1.09z" />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* 带官方蓝 V 认证标的头像 */}
          <div className="relative shrink-0">
            <img
              src={site.logo}
              alt="Author Avatar"
              className="w-8.5 h-8.5 rounded-full object-cover border border-[var(--line)]/60 shadow-2xs"
            />
            <span
              title="官方蓝 V 认证"
              className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1D9BF0] text-white shadow-2xs ring-2 ring-[var(--page-alt)]"
            >
              <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
          </div>

          <div className="flex flex-col text-xs space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[var(--text)] flex-wrap">
              <span className="font-extrabold text-xs sm:text-[13px] text-[var(--text)]">{author}</span>
              <span className="text-xs text-[var(--muted)] font-normal">原创文章</span>
              <span className="text-[10px] text-[var(--muted)]/40">•</span>
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-[var(--page-alt)]/80 hover:bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--accent)] text-[10px] sm:text-[11px] font-mono font-semibold transition-colors border-0"
              >
                CC BY-NC-SA 4.0
              </a>
            </div>
            <p className="text-[11px] font-mono text-[var(--muted)]/75 select-all truncate max-w-full">
              <span className="opacity-60 font-sans mr-1">本文链接：</span>
              {postUrl || title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
