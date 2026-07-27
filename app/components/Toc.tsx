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
    <nav className="fly-toc p-4 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] space-y-2 sticky top-20">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--mute)]">目录导航</h3>
      <ul className="space-y-1 text-xs">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`block py-1 hover:text-[var(--accent)] transition-colors truncate ${
                activeId === item.id
                  ? "font-bold text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
