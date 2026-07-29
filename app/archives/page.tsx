import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getAllPosts, getAllCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "文章归档", description: "按时间轴深度浏览所有历史文章与创作历程。", path: "/archives/" });

export default function ArchivesPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  // 按年份分组
  const groups = posts.reduce((acc, post) => {
    const year = post.pubDate ? new Date(post.pubDate).getFullYear().toString() : "未知年份";
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const years = Object.keys(groups).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div className="fly-archives-page w-full max-w-5xl mx-auto space-y-8 sm:space-y-10 transition-all duration-350">
      {/* 顶部 Hero 统计 Banner */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--page-alt)] via-[var(--page)] to-[var(--page-alt)] p-6 sm:p-8 border border-[var(--line)] shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent)]/10 text-[var(--accent)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              TIMELINE ARCHIVES
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--text)]">
              文章归档
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl">
              记录思考的痕迹，按时间轴整理全站的技术探索、攻防研究与知识沉淀。
            </p>
          </div>

          {/* 三大关键统计 Card */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[var(--page)]/80 backdrop-blur-md border border-[var(--line)] shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-[var(--accent)]">{posts.length}</span>
              <span className="text-[10px] sm:text-xs text-[var(--mute)] font-medium">总文章数</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[var(--page)]/80 backdrop-blur-md border border-[var(--line)] shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-[var(--accent)]">{years.length}</span>
              <span className="text-[10px] sm:text-xs text-[var(--mute)] font-medium">涵盖年份</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[var(--page)]/80 backdrop-blur-md border border-[var(--line)] shadow-xs">
              <span className="text-xl sm:text-2xl font-black text-[var(--accent)]">{categories.length}</span>
              <span className="text-[10px] sm:text-xs text-[var(--mute)] font-medium">主题分类</span>
            </div>
          </div>
        </div>
      </header>

      {/* 时间轴主体 */}
      <div className="space-y-12 pl-2 sm:pl-4">
        {years.map((year) => (
          <section key={year} className="relative pl-6 sm:pl-8 border-l-2 border-[var(--line)]">
            {/* 年份 Node 标记 */}
            <div className="absolute -left-[17px] top-0 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[var(--accent)]/30 ring-4 ring-[var(--page)]">
                {year.slice(2)}
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text)]">
                {year} <span className="text-xs font-normal text-[var(--mute)]">({groups[year].length} 篇)</span>
              </span>
            </div>

            {/* 文章列表卡片 */}
            <div className="pt-10 space-y-3.5">
              {groups[year].map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-[var(--page)] border border-[var(--line)] hover:border-[var(--accent)]/40 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* 微缩封面 */}
                    {post.cover && (
                      <div className="hidden sm:block w-16 h-11 rounded-lg overflow-hidden shrink-0 bg-[var(--page-alt)] border border-[var(--line)]">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="min-w-0 space-y-1">
                      <Link
                        href={`/posts/${post.slug}/`}
                        className="font-bold text-sm sm:text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>

                      <div className="flex items-center gap-2 text-xs text-[var(--mute)]">
                        {post.category && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--page-alt)] text-[var(--muted)]">
                            {post.category}
                          </span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <span className="hidden md:inline text-[11px]">
                            #{post.tags[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 发布日期 */}
                  <time className="text-xs font-mono text-[var(--mute)] shrink-0 self-end sm:self-center">
                    {format(new Date(post.pubDate), "MM月dd日", { locale: zhCN })}
                  </time>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
