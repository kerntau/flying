"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Moment } from "@/lib/types";

interface MomentsClientProps {
  moments: Moment[];
}

export function MomentsClient({ moments }: MomentsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>("全部");

  const allTags = ["全部", ...Array.from(new Set(moments.flatMap((m) => m.tags)))];

  const filteredMoments = selectedTag === "全部"
    ? moments
    : moments.filter((m) => m.tags.includes(selectedTag));

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* 标签筛选 */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              selectedTag === tag
                ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                : "bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* 动态卡片时间轴 */}
      <div className="space-y-6">
        {filteredMoments.map((moment) => (
          <article
            key={moment.slug}
            className="p-6 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] space-y-4 shadow-sm hover:shadow-md transition-all"
          >
            <p className="text-sm sm:text-base text-[var(--text)] whitespace-pre-wrap leading-relaxed">
              {moment.content}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-[var(--mute)]">
              <time dateTime={moment.date}>
                {format(new Date(moment.date), "yyyy年MM月dd日 HH:mm", { locale: zhCN })}
              </time>

              {moment.tags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {moment.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[var(--page)] text-[var(--muted)]">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
