'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

export function ExternalLinkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // 排除内部锚点、相对路径、mailto、tel、javascript 链接
      if (
        href.startsWith('#') ||
        href.startsWith('/') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      try {
        const urlObj = new URL(href, window.location.origin);
        // 若为本站域名，放行正常跳转
        if (urlObj.origin === window.location.origin || urlObj.hostname.includes('curn.me')) {
          return;
        }

        // 拦截外部链接跳转，弹出确认悬浮胶囊
        e.preventDefault();
        e.stopPropagation();
        setTargetUrl(href);
        setIsOpen(true);
      } catch {
        // URL 解析非绝对路径时不处理
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, []);

  const handleConfirm = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  let displayDomain = targetUrl;
  try {
    displayDomain = new URL(targetUrl).hostname.replace(/^www\./, '');
  } catch {
    displayDomain = targetUrl;
  }

  return (
    <AnimatePresence>
      {/* 顶部居中通透悬浮胶囊 Bar (无遮罩、零厚重感) */}
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -25, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[20000] flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-[var(--page)]/90 backdrop-blur-xl border border-[var(--line)]/60 shadow-xl max-w-[92vw] sm:max-w-md select-none"
      >
        {/* 左侧域名前缀 */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
          <div className="flex items-center gap-1.5 min-w-0 text-xs sm:text-sm font-semibold text-[var(--text)]">
            <span className="text-[var(--muted)] font-normal shrink-0">即将访问</span>
            <span className="font-extrabold truncate max-w-[150px] sm:max-w-[200px] text-[var(--text)]">
              {displayDomain}
            </span>
          </div>
        </div>

        {/* 右侧操作按钮组 */}
        <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-[var(--line)]/40">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-2.5 py-1 rounded-full text-xs font-medium text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-90 transition-all cursor-pointer shadow-2xs"
          >
            <span>前往</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
