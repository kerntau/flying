import React from "react";
import { site, socialLinks } from "@/data/site";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "关于序栈", description: "关于 Kerntau 与序栈（Flying Theme）的设计理念、技术探索与联络方式。", path: "/about/", image: site.logo });

export default function AboutPage() {
  const techStack = [
    { name: "Next.js / App Router", type: "Fullstack Framework", color: "from-blue-500/20 to-cyan-500/5 border-blue-500/30 text-blue-600 dark:text-blue-400" },
    { name: "TypeScript & React", type: "Language & UI", color: "from-purple-500/20 to-fuchsia-500/5 border-purple-500/30 text-purple-600 dark:text-purple-400" },
    { name: "Cybersecurity & AD", type: "Security Research", color: "from-emerald-500/20 to-green-500/5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" },
    { name: "Tailwind & Pure CSS", type: "Design System", color: "from-amber-500/20 to-orange-500/5 border-amber-500/30 text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="fly-about-page w-full space-y-12 transition-all duration-350 pb-16">
      {/* 顶部超大排版 Hero 区 */}
      <header className="relative flex flex-col items-center justify-center py-24 overflow-hidden rounded-3xl bg-[var(--page-alt)] border border-[var(--line)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-4">
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 bg-[var(--accent)] rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
            <img
              src={site.logo}
              alt={site.title}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-[var(--page)] shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-[var(--page)] flex items-center justify-center text-white shadow-lg animate-bounce" title="Online">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>

          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-[var(--page)] text-[var(--text)] border border-[var(--line)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Creator & Researcher
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-[var(--text)]">
              {site.author}
            </h1>
            <p className="text-base sm:text-lg font-medium text-[var(--muted)] leading-relaxed">
              {site.subtitle}。<br/>
              {site.description}
            </p>
          </div>

          {/* 社交媒体连接 Icon Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[var(--page)] border border-[var(--line)] text-sm font-bold text-[var(--text)] hover:text-white hover:bg-[var(--accent)] hover:border-transparent shadow-sm hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </a>
            ))}
            <a
              href="mailto:coet.ink@qq.com"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[var(--page)] border border-[var(--line)] text-sm font-bold text-[var(--text)] hover:text-white hover:bg-[var(--accent)] hover:border-transparent shadow-sm hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon name="mail" size={16} />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
        
        {/* 背景大字 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-black tracking-tighter text-[var(--line)] opacity-20 pointer-events-none select-none mix-blend-overlay">
          ABOUT
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-0 space-y-12">
        {/* 技能与领域网格 */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black tracking-tight text-[var(--text)]">技术栈与关注领域</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--line)] to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {techStack.map((item) => (
              <div
                key={item.name}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden ${item.color}`}
              >
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-500 origin-bottom-right">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div className="relative z-10 space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 text-xs font-black tracking-wider uppercase border border-white/20">
                    {item.type}
                  </span>
                  <h3 className="font-black text-2xl tracking-tight">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 关于本站 */}
        <section className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-[var(--page)] border border-[var(--line)] shadow-sm group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10 space-y-6 max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-[var(--text)] flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </span>
              关于 Flying 主题
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[var(--muted)] font-medium leading-relaxed">
              <p>
                <strong className="text-[var(--text)]">Flying</strong> 是一套追求极致优雅、无缝微动效与沉浸阅读体验的现代响应式博客主题。
              </p>
              <p>
                架构核心强调 <code className="px-2 py-1 rounded-md bg-[var(--page-alt)] text-[var(--text)] border border-[var(--line)] font-bold">Clean Code</code> 与 <code className="px-2 py-1 rounded-md bg-[var(--page-alt)] text-[var(--text)] border border-[var(--line)] font-bold">KISS 原则</code>，告别传统主题的冗余依赖与花哨堆砌，以高识别度的浅色系质感封面、流利自如的 Markdown 渲染及全端完美的 100% 响应式布局为核心。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
