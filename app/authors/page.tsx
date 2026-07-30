import React from "react";
import Link from "next/link";
import { getAuthors } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "专栏作者", description: "认识序栈的创作者。", path: "/authors/" });

export default function AuthorsPage() {
  const authors = getAuthors();

  return (
    <div className="fly-authors-page w-full space-y-8">
      <header className="border-b border-[var(--line)] pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">专栏作者</h1>
        <p className="text-sm text-[var(--muted)] mt-1">记录与创作的灵魂，共计 {authors.length} 位作者</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {authors.map((author) => (
          <div
            key={author.slug}
            className="p-6 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] space-y-4 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover border border-[var(--line)]"
              />
              <div>
                <h2 className="text-lg font-bold text-[var(--text)]">{author.name}</h2>
                <span className="text-xs text-[var(--mute)]">@{author.slug}</span>
              </div>
            </div>

            <p className="text-xs text-[var(--muted)] line-clamp-3 leading-relaxed">{author.bio}</p>

            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
              <Link
                href={`/authors/${author.slug}/`}
                className="text-xs font-semibold text-[var(--accent)] hover:underline"
              >
                查看作者文章 →
              </Link>
              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--muted)] hover:text-[var(--text)] flex items-center gap-1"
                >
                  <Icon name="globe" size={14} />
                  <span>个人主页</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
