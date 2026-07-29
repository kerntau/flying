"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-transparent justify-self-end" />
    );
  }

  // 当前激活档位：'light' | 'dark' | 'system'
  const currentTheme = theme || "system";

  // 三档循环策略：light -> dark -> system -> light
  const getNextTheme = (curr: string) => {
    if (curr === "light") return "dark";
    if (curr === "dark") return "system";
    return "light";
  };

  const nextTheme = getNextTheme(currentTheme);

  const handleToggle = (e: any) => {
    if (typeof document === "undefined") {
      setTheme(nextTheme);
      return;
    }

    // 获取按钮中心坐标以产生扩散圈效果
    const rect = e.currentTarget?.getBoundingClientRect?.() || e.target?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

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

  // 根据 3 档确定描述文案与 Icon
  const renderThemeContent = () => {
    if (currentTheme === "light") {
      return {
        label: "亮色模式 (点击切换为暗色)",
        icon: (
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
        ),
      };
    }

    if (currentTheme === "dark") {
      return {
        label: "暗色模式 (点击切换为跟随系统)",
        icon: (
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
        ),
      };
    }

    // 跟随系统 ('system')
    return {
      label: `跟随系统 [当前:${resolvedTheme === "dark" ? "暗色" : "亮色"}] (点击切换为亮色)`,
      icon: (
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
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
    };
  };

  const { label, icon } = renderThemeContent();

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label={label}
      onClick={handleToggle as any}
      className="fly-theme-toggle-btn justify-self-end outline-none focus:outline-none min-w-9 w-9 h-9 p-0 rounded-full"
    >
      <div className="fly-theme-toggle-icon" key={currentTheme}>
        {icon}
      </div>
    </Button>
  );
}

