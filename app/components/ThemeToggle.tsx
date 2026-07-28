"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-[var(--page-alt)] opacity-50 justify-self-end" />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    if (typeof document === "undefined") {
      setTheme(nextTheme);
      return;
    }

    // 获取按钮在屏幕中的绝对中心点
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 检查现代浏览器 View Transitions 原生支持
    if ("startViewTransition" in document) {
      const doc = document as any;
      const transition = doc.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        // 真实网页 DOM 新视图在最顶层 (z-index: 99999) 以按钮为圆心极速全屏擦除膨胀展开
        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 280,
            easing: "cubic-bezier(0.2, 0, 0, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <button
      type="button"
      className="fly-theme-toggle-btn justify-self-end"
      onClick={handleToggle}
      aria-label={isDark ? "切换为亮色模式" : "切换为暗色模式"}
      title={isDark ? "切换为亮色模式" : "切换为暗色模式"}
    >
      <div
        className="fly-theme-toggle-icon"
        style={{
          transform: isDark ? "rotate(360deg)" : "rotate(0deg)",
        }}
      >
        {isDark ? (
          /* 暗色模式：极简线条月亮 */
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          /* 亮色模式：极简线条太阳 */
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </div>
    </button>
  );
}



