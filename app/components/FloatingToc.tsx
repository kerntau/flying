'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToc } from './TocContext';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export interface TocHeadingItem {
  value?: string;
  text?: string;
  url?: string;
  id?: string;
  depth?: number;
  level?: number;
}

function getTargetId(urlOrId: string) {
  const hashPart = urlOrId.includes('#') ? urlOrId.split('#').pop() || '' : urlOrId;
  const normalized = hashPart.replace(/^#/, '').trim();
  if (!normalized) return '';
  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
}

function TooltipIconButton({
  label,
  children,
  side = 'bottom',
}: {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function FloatingToc({ toc }: { toc?: TocHeadingItem[] }) {
  const { isTocOpen: open, setIsTocOpen: setOpen } = useToc();
  const [activeId, setActiveId] = useState('');
  const listContainerRef = useRef<HTMLElement | null>(null);
  const isUserInteractingRef = useRef(false);
  const interactTimerRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const tocItems = useMemo(() => {
    return (toc || [])
      .map((item) => {
        const value = item.value || item.text || '';
        const rawUrl = item.url || item.id || '';
        const depth = item.depth || item.level || 2;
        const targetId = getTargetId(rawUrl);
        const url = rawUrl.startsWith('#') ? rawUrl : `#${targetId}`;
        return { value, url, depth, targetId };
      })
      .filter((item) => item.depth >= 2 && item.depth <= 4 && item.targetId);
  }, [toc]);

  const tocIds = useMemo(() => {
    return tocItems.map((item) => item.targetId);
  }, [tocItems]);

  const activeIndex = useMemo(() => {
    if (!activeId) return -1;
    return tocItems.findIndex((item) => item.targetId === activeId);
  }, [activeId, tocItems]);

  const progressLabel = useMemo(() => {
    if (!tocItems.length) return '0%';
    if (activeIndex < 0) return '0%';
    const percent = Math.round(((activeIndex + 1) / tocItems.length) * 100);
    return `${percent}%`;
  }, [activeIndex, tocItems.length]);

  const updateActiveToc = useCallback(() => {
    if (!tocIds.length) {
      setActiveId('');
      return;
    }

    const headings = tocIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!headings.length) {
      setActiveId('');
      return;
    }

    const viewportHeight = window.innerHeight;
    // 调整检测阈值至 0.45，实现正文滚动到近中间位置时即切换高亮
    const threshold = viewportHeight * 0.45;

    let currentActive = '';

    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      const rect = heading.getBoundingClientRect();

      if (rect.top <= threshold) {
        currentActive = heading.id;
        break;
      }
    }

    if (!currentActive && window.scrollY < 100) {
      setActiveId('');
    } else if (currentActive) {
      setActiveId(currentActive);
    }
  }, [tocIds]);

  useEffect(() => {
    if (!tocIds.length) return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        updateActiveToc();
        tickingRef.current = false;
      });
    };

    const onHashChange = () => updateActiveToc();
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('hashchange', onHashChange);
    const initTimer = window.setTimeout(updateActiveToc, 80);

    return () => {
      document.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('hashchange', onHashChange);
      window.clearTimeout(initTimer);
    };
  }, [tocIds, updateActiveToc]);

  useEffect(() => {
    if (!open || !activeId || isUserInteractingRef.current || !listContainerRef.current) return;

    const container = listContainerRef.current;
    const activeLink = container.querySelector<HTMLAnchorElement>(`a[data-target="${CSS.escape(activeId)}"]`);
    if (!activeLink) return;

    const scrollToIndex = () => {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const relativeTop = linkRect.top - containerRect.top;
      const currentScrollTop = container.scrollTop;

      const isPastLowerBound = relativeTop > container.clientHeight * 0.75;
      const isPastUpperBound = relativeTop < container.clientHeight * 0.25;

      if (isPastLowerBound || isPastUpperBound) {
        const targetScrollTop = currentScrollTop + relativeTop - container.clientHeight * 0.5;

        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      }
    };

    const timer = setTimeout(scrollToIndex, 100);
    return () => clearTimeout(timer);
  }, [activeId, open]);

  // 处理面板初次打开时的对齐
  useEffect(() => {
    if (open && activeId && listContainerRef.current) {
      const container = listContainerRef.current;
      const timer = setTimeout(() => {
        const activeLink = container.querySelector<HTMLAnchorElement>(`a[data-target="${CSS.escape(activeId)}"]`);
        if (activeLink) {
          const containerRect = container.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          const relativeTop = linkRect.top - containerRect.top;
          const targetScrollTop = container.scrollTop + relativeTop - container.clientHeight * 0.5;
          container.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeId, open]);

  useEffect(() => {
    if (!open || !listContainerRef.current) return;

    const handleInteraction = () => {
      isUserInteractingRef.current = true;
      if (interactTimerRef.current) {
        window.clearTimeout(interactTimerRef.current);
      }
      interactTimerRef.current = window.setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 500);
    };

    const container = listContainerRef.current;
    container.addEventListener('wheel', handleInteraction, { passive: true });
    container.addEventListener('touchstart', handleInteraction, { passive: true });
    container.addEventListener('touchmove', handleInteraction, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleInteraction);
      container.removeEventListener('touchstart', handleInteraction);
      container.removeEventListener('touchmove', handleInteraction);
      if (interactTimerRef.current) {
        window.clearTimeout(interactTimerRef.current);
        interactTimerRef.current = null;
      }
      isUserInteractingRef.current = false;
    };
  }, [open]);

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 160);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (!tocItems.length) return null;

  return (
    <>
      {/* 桌面端与移动端悬浮控制按钮组 (桌面端居右垂直居中 sm:top-[55%] sm:-translate-y-1/2) */}
      <div className="fixed z-[90] flex flex-col items-end gap-2.5 transition-all duration-500 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 sm:top-[55%] sm:bottom-auto sm:-translate-y-1/2 xl:right-10">
        {/* 目录 Toggle 胶囊按钮 */}
        <TooltipIconButton label={open ? '关闭目录' : '文章目录'} side="left">
          <motion.button
            type="button"
            aria-label={open ? '关闭目录' : '打开目录'}
            aria-expanded={open}
            aria-controls="floating-toc-panel"
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.92 }}
            className={`group relative flex items-center justify-center transition-all duration-500 h-12 w-12 sm:w-auto sm:min-w-[52px] sm:px-3.5 rounded-full bg-[var(--page)]/90 backdrop-blur-xl border border-[var(--line)] shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] text-[var(--muted)] hover:text-[var(--accent)] cursor-pointer ${
              open
                ? 'border-[var(--accent)]/25 text-[var(--accent)] bg-[var(--accent)]/15 sm:opacity-0 sm:pointer-events-none'
                : ''
            }`}
          >
            {/* 汉堡图标 */}
            <div className="relative h-3.5 w-[15px] flex-shrink-0">
              <motion.div
                initial={false}
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 0 : -5,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-1/2 left-0 h-[1.5px] w-[15px] -translate-y-1/2 origin-center rounded-full bg-current"
              />
              <motion.div
                initial={false}
                animate={{
                  opacity: open ? 0 : 1,
                  scaleX: open ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-1/2 left-0 h-[1.5px] w-[11px] -translate-y-1/2 origin-left rounded-full bg-current"
              />
              <motion.div
                initial={false}
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? 0 : 5,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-1/2 left-0 h-[1.5px] w-[15px] -translate-y-1/2 origin-center rounded-full bg-current"
              />
            </div>

            {/* 桌面端展示阅读进度 % Label */}
            <span className="hidden text-[14px] font-black tracking-tighter transition-colors sm:ml-2 sm:inline-block group-hover:text-[var(--accent)]">
              {progressLabel}
            </span>
          </motion.button>
        </TooltipIconButton>
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            id="floating-toc-panel"
            key="toc-panel"
            layout
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            }}
            exit={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(4px)' }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-1.5 sm:right-3 z-[105] flex max-h-[50vh] w-[min(85vw,300px)] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--page)]/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-zinc-900/95 lg:relative lg:bottom-auto lg:right-auto lg:top-0 lg:max-h-[min(70vh,600px)] lg:w-[270px] lg:rounded-none lg:rounded-bl-2xl lg:border-0 lg:border-l lg:border-zinc-200/50 lg:dark:border-white/5 lg:bg-transparent lg:dark:bg-transparent lg:backdrop-blur-none lg:shadow-none select-none will-change-transform will-change-opacity origin-bottom-right lg:origin-top-right"
          >
            {/* Header 控制栏 */}
            <div className="flex items-center justify-between px-3 pt-1.5 pb-0">
              <h3 className="text-[14px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                目录
              </h3>
              <div className="flex items-center gap-1.5">
                <TooltipIconButton label="回到顶部" side="bottom">
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg>
                  </button>
                </TooltipIconButton>

                <TooltipIconButton label="查看评论" side="bottom">
                  <button
                    type="button"
                    onClick={() => {
                      const commentsEl = document.getElementById('comment') || document.getElementById('article-footer') || document.querySelector('.comment-section');
                      commentsEl?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                  </button>
                </TooltipIconButton>

                <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

                <TooltipIconButton label="关闭目录" side="bottom">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </TooltipIconButton>
              </div>
            </div>

            {/* TOC Item 滚动区域 */}
            <div className="flex flex-1 flex-col pl-0 pr-1.5 pt-0 pb-0 min-h-0 sm:pr-2">
              <nav
                ref={listContainerRef}
                className="no-scrollbar min-h-0 flex-1 overflow-y-auto pr-1 [mask-image:linear-gradient(to_bottom,transparent,black_24px,black_calc(100%-24px),transparent)]"
              >
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.03,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="relative py-2 space-y-[2px]"
                >
                  {tocItems.map((item, index) => {
                    const isActive = activeId === item.targetId;
                    return (
                      <motion.li
                        key={`${item.url}-${index}`}
                        variants={{
                          hidden: { opacity: 0, x: 10 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative leading-normal"
                      >
                        <a
                          href={item.url}
                          data-target={item.targetId}
                          aria-current={isActive ? 'location' : undefined}
                          onClick={() => {
                            if (window.innerWidth < 640) {
                              setOpen(false);
                            }
                          }}
                          className={`group relative flex items-start rounded-lg px-2.5 py-1.5 transition-all duration-300 ${
                            isActive
                              ? 'bg-[var(--page-alt)] font-bold text-zinc-900 dark:bg-white/10 dark:text-zinc-100'
                              : 'font-medium text-zinc-500 hover:bg-[var(--page-alt)]/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100'
                          }`}
                          style={{
                            paddingLeft: `${Math.max(0, item.depth - 2) * 12 + 12}px`,
                            fontSize: item.depth === 2 ? '13px' : '12px',
                          }}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="active-toc-indicator"
                              className="absolute -left-[1.5px] top-1 bottom-1 w-[3px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(59,130,246,0.6)] z-20"
                              transition={{
                                type: 'tween',
                                ease: [0.25, 1, 0.5, 1],
                                duration: 0.4,
                              }}
                            />
                          )}
                          <span className={isActive ? 'whitespace-normal break-words' : 'truncate'}>
                            {item.value}
                          </span>
                        </a>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
