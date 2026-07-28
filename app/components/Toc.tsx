"use client";

import React, { useState, useEffect } from "react";
import type { TocItem } from "@/lib/markdown";

interface TocProps {
  items: TocItem[];
}

export function Toc({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav className="fly-toc p-4 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] space-y-3 sticky top-[calc(var(--navbar-height)+24px)] max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--line)] pb-2">
        <span>目录导航</span>
      </div>
      <ul className="space-y-1 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 px-2 rounded-md transition-all truncate border-l-2 ${
                  isActive
                    ? "font-bold text-[var(--text)] border-[var(--accent)] bg-[var(--page)] shadow-xs"
                    : "text-[var(--faint)] border-transparent hover:text-[var(--text)] hover:bg-[var(--page)]"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
