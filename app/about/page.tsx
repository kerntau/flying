import React from "react";
import { site, socialLinks } from "@/data/site";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "关于序栈", description: "关于 Kerntau 与序栈（Flying Theme）的设计理念、技术探索与联络方式。", path: "/about/", image: site.logo });

export default function AboutPage() {
  const techStack = [
    { name: "Next.js / App Router", type: "Fullstack Framework", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { name: "TypeScript & React", type: "Language & UI", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    { name: "Cybersecurity & AD", type: "Security Research", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { name: "Tailwind & Pure CSS", type: "Design System", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="fly-about-page w-full max-w-4xl mx-auto space-y-8 sm:space-y-10 transition-all duration-350">
      {/* 个人名片 Hero Card */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--page-alt)] via-[var(--page)] to-[var(--page-alt)] p-6 sm:p-10 border border-[var(--line)] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={site.logo}
              alt={site.title}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[var(--accent)] shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[var(--page)] flex items-center justify-center text-white text-[10px] font-bold" title="Online">
              ✓
            </div>
          </div>

          <div className="space-y-2 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[var(--accent)]/10 text-[var(--accent)]">
              <span>CREATOR & SECURITY RESEARCHER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight">
              {site.author} <span className="text-xl text-[var(--muted)] font-normal">/ {site.title}</span>
            </h1>
            <p className="text-sm text-[var(--muted)] max-w-lg leading-relaxed">
              {site.subtitle}。{site.description}
            </p>
          </div>
        </div>

        {/* 社交媒体连接 Icon Buttons */}
        <div className="pt-4 border-t border-[var(--line)]/60 flex flex-wrap items-center gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--page)] border border-[var(--line)] text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 shadow-2xs transition-all"
            >
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
            </a>
          ))}
          <a
            href="mailto:coet.ink@qq.com"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--page)] border border-[var(--line)] text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 shadow-2xs transition-all"
          >
            <Icon name="mail" size={14} />
            <span>QQ 邮箱</span>
          </a>
        </div>
      </header>

      {/* 技能与领域网格 */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold tracking-tight text-[var(--text)]">技术栈与关注领域</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-2xl bg-[var(--page)] border border-[var(--line)] space-y-1 hover:border-[var(--accent)]/40 transition-colors shadow-2xs"
            >
              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${item.color}`}>
                {item.type}
              </span>
              <h3 className="font-extrabold text-base text-[var(--text)]">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 关于本站 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[var(--page)] border border-[var(--line)] space-y-4 shadow-2xs">
        <h2 className="text-xl font-extrabold tracking-tight text-[var(--text)]">关于 Flying 主题</h2>
        <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
          <p>
            <strong className="text-[var(--text)]">Flying</strong> 是一套追求极致优雅、无缝微动效与沉浸阅读体验的现代响应式博客主题。
          </p>
          <p>
            架构核心强调 <code className="px-1.5 py-0.5 rounded bg-[var(--page-alt)] text-[var(--text)]">Clean Code</code> 与 <code className="px-1.5 py-0.5 rounded bg-[var(--page-alt)] text-[var(--text)]">KISS 原则</code>，告别传统主题的冗余依赖与花哨推砌，以高识别度的浅色系质感封面、流利自如的 Markdown 渲染及全端完美的 100% 响应式布局为核心。
          </p>
        </div>
      </section>
    </div>
  );
}
