"use client";

import React, { useState } from "react";
import type { Link as LinkItem } from "@/lib/types";

interface LinksClientProps {
  links: LinkItem[];
}

export function LinksClient({ links }: LinksClientProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("全部");

  const groups = ["全部", ...Array.from(new Set(links.map((l) => l.group)))];

  const filteredLinks = selectedGroup === "全部"
    ? links
    : links.filter((l) => l.group === selectedGroup);

  return (
    <div className="space-y-8">
      {/* 分组 Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-4">
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              selectedGroup === group
                ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                : "bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* 链接卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] hover:border-[var(--accent)] hover:shadow-md transition-all group"
          >
            <img
              src={link.avatar}
              alt={link.title}
              className="w-12 h-12 rounded-full object-cover border border-[var(--line)] group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                {link.title}
              </span>
              <p className="text-xs text-[var(--muted)] line-clamp-1 mt-0.5">{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
