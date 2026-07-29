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
    <div className="fly-archives-page w-full space-y-12 transition-all duration-350 pb-16">
      {/* 顶部超大排版 Hero 区 */}
      <header className="relative flex flex-col items-center justify-center py-20 overflow-hidden rounded-3xl bg-[var(--page-alt)] border border-[var(--line)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-[var(--page)] text-[var(--text)] border border-[var(--line)] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Timeline Archives
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-[var(--text)]">
            归档与沉淀
          </h1>
          <p className="text-sm sm:text-base font-medium text-[var(--muted)] max-w-xl">
            在这里，时间被量化为 {posts.length} 篇文字与 {categories.length} 个技术切面。<br/>
            记录每一次思考的深度与广度。
          </p>
        </div>
        
        {/* 背景大字 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black tracking-tighter text-[var(--line)] opacity-20 pointer-events-none select-none mix-blend-overlay">
          ARCHIVES
        </div>
      </header>

      {/* 动态时间轴流 */}
      <div className="space-y-20 max-w-4xl mx-auto px-4 sm:px-0">
        {years.map((year) => (
          <section key={year} className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
            {/* 年份标记 (Sticky) */}
            <div className="md:w-32 shrink-0 md:sticky top-28 z-10">
              <div className="flex flex-col">
                <span className="text-5xl md:text-6xl font-black tracking-tighter text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-500">
                  {year}
                </span>
                <span className="text-sm font-bold text-[var(--muted)] mt-1 uppercase tracking-wider">
                  {groups[year].length} Posts
                </span>
              </div>
              <div className="hidden md:block w-full h-[1px] bg-[var(--line)] mt-6"></div>
            </div>

            {/* 文章列表 */}
            <div className="flex-1 w-full space-y-4">
              {groups[year].map((post) => (
                <article
                  key={post.slug}
                  className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[var(--page)] border border-[var(--line)] hover:border-[var(--accent)]/50 shadow-sm hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden group/card"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] scale-y-0 group-hover/card:scale-y-100 transition-transform duration-500 origin-top"></div>
                  
                  <div className="flex items-center gap-5 min-w-0 flex-1">
                    {/* 微缩封面 */}
                    {post.cover && (
                      <Link href={`/posts/${post.slug}/`} className="hidden sm:block w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-[var(--page-alt)] border border-[var(--line)] z-10">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      </Link>
                    )}

                    <div className="min-w-0 space-y-1.5 flex-1 z-10">
                      <Link
                        href={`/posts/${post.slug}/`}
                        className="block font-bold text-base sm:text-lg text-[var(--text)] group-hover/card:text-[var(--accent)] transition-colors line-clamp-1 truncate"
                      >
                        {post.title}
                      </Link>

                      <div className="flex items-center gap-3 text-xs font-semibold text-[var(--mute)]">
                        {post.category && (
                          <span className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                            {post.category}
                          </span>
                        )}
                        {post.category && post.tags && post.tags.length > 0 && (
                          <span className="w-1 h-1 rounded-full bg-[var(--line)]"></span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <span className="flex gap-1.5">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag}>#{tag}</span>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 发布日期 */}
                  <div className="shrink-0 flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 z-10">
                    <time className="text-sm font-mono font-bold text-[var(--muted)] bg-[var(--page-alt)] px-3 py-1.5 rounded-lg border border-[var(--line)]">
                      {format(new Date(post.pubDate), "MM-dd")}
                    </time>
                    {/* Mobile Only View Button */}
                    <Link href={`/posts/${post.slug}/`} className="sm:hidden text-xs font-bold text-[var(--accent)]">
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

