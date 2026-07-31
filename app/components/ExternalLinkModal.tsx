'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, X } from 'lucide-react';

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
        if (urlObj.origin === window.location.origin || urlObj.hostname.includes('curn.me')) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        setTargetUrl(href);
        setIsOpen(true);
      } catch {}
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
      {/* 遮罩 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-[20000] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 select-none"
      >
        {/* 顶级美化外链弹窗 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[380px] rounded-3xl bg-[var(--page)] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-[var(--line)]/60 overflow-hidden space-y-5 select-none"
        >
          {/* 顶栏微光斑 */}
          <div className="pointer-events-none absolute -top-12 -left-12 w-40 h-40 bg-sky-500/15 rounded-full blur-2xl" />

          {/* 关闭按钮 */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors cursor-pointer z-10"
          >
            <X size={16} />
          </button>

          {/* 头部图标 + 提示 */}
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20 shadow-2xs">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>

            <div className="space-y-0.5 min-w-0 flex-1">
              <h3 className="font-black text-base text-[var(--text)] tracking-tight">
                站外链接跳转确认
              </h3>
              <p className="text-xs text-[var(--muted)] font-normal">
                即将离开本站访问外部链接
              </p>
            </div>
          </div>

          {/* 高级域名卡片 */}
          <div className="relative z-10 p-3.5 rounded-2xl bg-[var(--page-alt)]/60 border border-[var(--line)]/40 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500" />
              </span>
              <span className="font-mono text-sm font-bold text-[var(--text)] truncate tracking-tight">
                {displayDomain}
              </span>
            </div>
            <span className="font-sans font-medium text-[10px] text-[var(--muted)] bg-[var(--page)] px-2 py-0.5 rounded-md border border-[var(--line)]/30 shrink-0">
              第三方站点
            </span>
          </div>

          {/* 底部按钮组 */}
          <div className="flex items-center justify-end gap-2.5 pt-1 relative z-10">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-bold text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors cursor-pointer"
            >
              留在本站
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black bg-[var(--text)] text-[var(--page)] hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span>继续前往</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
