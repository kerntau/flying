'use client';

import { useToc } from './TocContext';
import { ReactNode } from 'react';

export function PostLayoutContent({
  header,
  children,
  toc,
}: {
  header?: ReactNode;
  children: ReactNode;
  toc?: ReactNode;
}) {
  const { isTocOpen } = useToc();

  return (
    <div className="w-full space-y-10">
      {/* 顶部 Header：对齐容器 max-width */}
      {header && (
        <header
          className={`fly-post-header border-b border-[var(--line)] pb-6 pt-1 mx-auto px-1 sm:px-2 transition-all duration-500 ease-in-out
            ${isTocOpen ? 'max-w-[1340px]' : 'max-w-5xl'}
          `}
        >
          {header}
        </header>
      )}

      {/* 标题与封面下方的正文 + TOC 侧边栏 */}
      <div
        className={`relative mx-auto flex w-full transition-all duration-500 ease-in-out px-1 sm:px-2 gap-4 lg:gap-12
          ${isTocOpen ? 'max-w-[1340px]' : 'max-w-5xl'}
        `}
      >
        <article className="min-w-0 flex-1 w-full transition-all duration-500">
          {children}
        </article>

        {/* Desktop TOC 侧边栏 */}
        <div
          className={`hidden lg:block shrink-0 transition-all duration-500 ease-in-out
            ${isTocOpen ? 'w-[270px]' : 'w-0 overflow-hidden'}
          `}
        >
          <div className="sticky top-[15vh] z-10 w-[270px]">
            {toc}
          </div>
        </div>

        {/* Mobile / Tablet 悬浮目录与按钮组 */}
        <div className="lg:hidden">
          {toc}
        </div>
      </div>
    </div>
  );
}
