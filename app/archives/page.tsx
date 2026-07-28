import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "文章归档", description: "按时间浏览所有文章。", path: "/archives/" });

export default function ArchivesPage() {
  const posts = getAllPosts();

  // 按年份分组
  const groups = posts.reduce((acc, post) => {
    const year = post.pubDate ? new Date(post.pubDate).getFullYear().toString() : "未知年份";
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const years = Object.keys(groups).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div className="fly-archives-page w-full max-w-5xl space-y-10 transition-all duration-350">
      <header className="border-b border-[var(--line)] pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">文章归档</h1>
        <p className="text-sm text-[var(--muted)] mt-1">共计 {posts.length} 篇文章</p>
      </header>

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--accent)] sticky top-16 bg-[var(--page)]/90 backdrop-blur-sm py-2">
              {year} 年
            </h2>
            <div className="space-y-3 pl-4 border-l-2 border-[var(--line)]">
              {groups[year].map((post) => (
                <div
                  key={post.slug}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-xl hover:bg-[var(--page-alt)] transition-colors group"
                >
                  <Link
                    href={`/posts/${post.slug}/`}
                    className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors text-sm sm:text-base"
                  >
                    {post.title}
                  </Link>
                  <time className="text-xs text-[var(--mute)] shrink-0">
                    {format(new Date(post.pubDate), "MM月dd日", { locale: zhCN })}
                  </time>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
