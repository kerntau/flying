"use client";

import React, { createContext, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ViewTransitionsContextType {
  push: (href: string) => void;
  replace: (href: string) => void;
  startTransition: (cb: () => void) => void;
}

const ViewTransitionsContext = createContext<ViewTransitionsContextType | null>(null);

// 安全调用 View Transitions API helper 函数
function safeStartViewTransition(cb: () => void) {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    const doc = document as unknown as {
      startViewTransition?: (callback: () => void) => void;
    };
    if (doc.startViewTransition) {
      doc.startViewTransition(cb);
      return;
    }
  }
  cb();
}

export function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const startTransition = useCallback((cb: () => void) => {
    safeStartViewTransition(cb);
  }, []);


  const push = useCallback(
    (href: string) => {
      if (href === pathname) return;
      startTransition(() => {
        router.push(href);
      });
    },
    [pathname, router, startTransition]
  );

  const replace = useCallback(
    (href: string) => {
      if (href === pathname) return;
      startTransition(() => {
        router.replace(href);
      });
    },
    [pathname, router, startTransition]
  );

  // 全局拦截同源 <a> 点击事件，自动应用 View Transition API
  useEffect(() => {
    if (typeof window === "undefined" || !("startViewTransition" in document)) {
      return;
    }

    const handleAnchorClick = (e: MouseEvent) => {
      // 忽略辅助按键或右键
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");
      const download = target.getAttribute("download");

      // 忽略新窗口、下载、空链接、外部链接和纯 hash 导航
      if (!href || targetAttr === "_blank" || download !== null || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      // 验证是否同源
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;

        // 如果是纯锚点跳转，忽略 View Transition
        if (url.pathname === window.location.pathname && url.hash !== "") return;
        // 如果是相同页面，忽略
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;

        // 执行 View Transition
        e.preventDefault();
        safeStartViewTransition(() => {
          router.push(url.pathname + url.search + url.hash);
        });
      } catch {
        // 无效 URL
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [router]);

  return (
    <ViewTransitionsContext.Provider value={{ push, replace, startTransition }}>
      {children}
    </ViewTransitionsContext.Provider>
  );
}
