import React from "react";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import {
  User,
  Heart,
  Globe,
  Github,
  Sparkles,
  Layers,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "关于序栈",
  description: "关于 Kerntau 与序栈（Flying Theme）的设计理念、技术探索、鸣谢与联络方式。",
  path: "/about/",
  image: site.logo,
});

export default function AboutPage() {
  const techBadges = [
    {
      name: "NEXT.JS 15",
      badgeUrl: "https://img.shields.io/badge/NEXT.JS-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
    },
    {
      name: "REACT 19",
      badgeUrl: "https://img.shields.io/badge/REACT-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
    },
    {
      name: "TYPESCRIPT 5.X",
      badgeUrl: "https://img.shields.io/badge/TYPESCRIPT-5.X-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
    },
    {
      name: "TAILWIND 4",
      badgeUrl: "https://img.shields.io/badge/TAILWIND-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white",
    },
    {
      name: "PYTHON 3.12",
      badgeUrl: "https://img.shields.io/badge/PYTHON-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white",
    },
    {
      name: "WEB SECURITY",
      badgeUrl: "https://img.shields.io/badge/WEB%20SECURITY-EXPLORE-E4405F?style=for-the-badge&logo=kalilinux&logoColor=white",
    },
  ];

  const recentGoals = [
    { tag: "目标 01", text: "持续精细化打磨博客主题细节与全端交互体验。" },
    { tag: "目标 02", text: "沉淀网络安全与 Web 开发经验，持续产出高质量深度文章与学习笔记。" },
    { tag: "目标 03", text: "保持代码洁癖，坚持 KISS 原则与极简主义设计。" },
  ];

  const thanksList = [
    {
      name: "Handsome (acanyo)",
      url: "https://www.xhhao.com/",
      repoUrl: "https://github.com/acanyo/theme-flying",
      siteLabel: "www.xhhao.com",
      iconUrl: "https://github.com/acanyo.png",
      note: "theme-flying 主题与独立博客启发",
    },
    {
      name: "Zhilu",
      url: "https://github.com/L33Z22L11/blog-v3",
      repoUrl: "https://github.com/L33Z22L11/blog-v3",
      siteLabel: "blog.zhilu.site",
      iconUrl: "https://github.com/L33Z22L11.png",
      note: "blog.zhilu.site 归档与微交互灵感",
    },
    {
      name: "lxchapu",
      url: "https://github.com/lxchapu/astro-gyoza",
      repoUrl: "https://github.com/lxchapu/astro-gyoza",
      siteLabel: "gyoza.lxchapu.com",
      iconUrl: "https://github.com/lxchapu.png",
      note: "gyoza.lxchapu.com 排版与技术规范参照",
    },
    {
      name: "innei",
      url: "https://github.com/innei/Shiro",
      repoUrl: "https://github.com/innei/Shiro",
      siteLabel: "innei.in",
      iconUrl: "https://github.com/innei.png",
      note: "innei.in / Shiro 画廊感与美感启发",
    },
  ];

  return (
    <div className="fly-about-page w-full max-w-6xl lg:max-w-[1240px] mx-auto space-y-6 sm:space-y-7 py-2 pb-2 sm:pb-4 transition-all duration-350 select-none">
      {/* 1. 英雄名片卡片 (Hero Profile Card) */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--page-alt)]/40 p-5 sm:p-6 border-0 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* 左侧：头像 + 名字 + 动态标签 */}
          <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
            <div className="relative group shrink-0 w-14 h-14 sm:w-16 sm:h-16">
              <img
                src={site.logo}
                alt={site.author}
                className="w-full h-full rounded-2xl object-cover shadow-2xs bg-[var(--page)] border border-[var(--line)]/15 group-hover:scale-103 transition-transform duration-300"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--page)] shadow-xs" />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text)]">
                  {site.author}
                </h1>
                <span className="px-2 py-0.5 rounded-md text-[0.68rem] font-mono font-bold bg-[var(--accent)]/10 text-[var(--accent)]">
                  Pro
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[var(--muted)]">
                信息安全专业 · 全栈 / 安全探索者 · 知行合一，缄默前行
              </p>
            </div>
          </div>

          {/* 右侧：社交快捷按钮组 */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://github.com/kerntau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--page)] hover:bg-[var(--page-alt)] text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] transition-all shadow-2xs cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 opacity-80" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* 技术栈 GitHub Shields 官方同款徽章矩阵 */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--line)]/15">
          {techBadges.map((badge) => (
            <img
              key={badge.name}
              src={badge.badgeUrl}
              alt={badge.name}
              className="h-6.5 sm:h-7 rounded object-contain shadow-2xs hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      </section>

      {/* 2. 双栏并行核心流 (关于我 + 近期目标) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* 关于我 */}
        <section className="space-y-2 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--muted)] uppercase tracking-wider h-6">
            <User className="w-4 h-4 text-[var(--accent)]" />
            <span>关于我</span>
          </div>

          <div className="flex-1 bg-[var(--page-alt)]/40 rounded-2xl p-4.5 sm:p-5 space-y-2 border-0 shadow-2xs text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-medium">
            <p>
              你好，我是 <strong className="text-[var(--text)] font-bold">Kerntau</strong>，一名即将毕业的信息安全专业学生。这里主要记录我的网络安全学习心得、开发实践经历与技术笔记。
            </p>
            <p>
              除了信息安全领域的渗透测试与网络基础，我也热衷于 Web 开发，熟悉 C 与 Python，常在 Linux / Windows 环境下折腾，目前主要使用 React 和 Next.js / Nuxt 等框架构建现代化的 Web 应用。
            </p>
          </div>
        </section>

        {/* 近期目标 */}
        <section className="space-y-2 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--muted)] uppercase tracking-wider h-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>近期目标</span>
          </div>

          <div className="flex-1 bg-[var(--page-alt)]/40 rounded-2xl p-4.5 sm:p-5 space-y-3 border-0 shadow-2xs flex flex-col justify-center">
            {recentGoals.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
                <span className="shrink-0 font-mono font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded text-[11px] shadow-2xs">
                  {item.tag}
                </span>
                <span className="text-[var(--muted)] font-medium leading-normal truncate">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 3. 鸣谢与开源致谢 (Acknowledgements) */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--muted)] uppercase tracking-wider h-6">
          <Heart className="w-4 h-4 text-rose-500" />
          <span>鸣谢与开源致谢</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {thanksList.map((item) => (
            <div
              key={item.name}
              className="group p-4 rounded-2xl bg-[var(--page-alt)]/40 hover:bg-[var(--page-alt)]/80 transition-colors duration-200 border-0 flex flex-col justify-between h-[135px]"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={item.iconUrl}
                  alt={item.name}
                  className="w-9 h-9 rounded-xl object-cover shrink-0 bg-[var(--page)] shadow-2xs border border-[var(--line)]/15"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                    {item.name}
                  </h4>
                  <div className="text-[0.68rem] font-mono text-[var(--muted)]/60 truncate">
                    {item.siteLabel}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[var(--muted)] truncate font-medium">
                {item.note}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]/15 text-[11px] text-[var(--muted)] shrink-0">
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 opacity-70" />
                    <span>博客</span>
                  </a>
                )}
                {item.repoUrl && (
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[var(--accent)] transition-colors ml-auto"
                  >
                    <Github className="w-3.5 h-3.5 opacity-70" />
                    <span>Repo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 关于 FLYING 主题理念 */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--muted)] uppercase tracking-wider h-6">
          <Layers className="w-4 h-4 text-purple-500" />
          <span>关于 Flying 主题</span>
        </div>

        <div className="bg-[var(--page-alt)]/40 rounded-2xl p-4.5 sm:p-5 space-y-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-medium">
          <p>
            <strong className="text-[var(--text)] font-bold">Flying</strong> 是一套追求极致优雅、无缝微动效与沉浸阅读体验的现代响应式博客主题。
          </p>
          <p>
            架构核心强调 <code className="px-2 py-0.5 rounded bg-[var(--page)] text-[var(--text)] font-bold">Clean Code</code> 与 <code className="px-2 py-0.5 rounded bg-[var(--page)] text-[var(--text)] font-bold">KISS 原则</code>，告别传统主题的冗余依赖与花哨堆砌，以高识别度的水墨质感封面、流利自如的 Markdown 渲染及全端完美的 100% 响应式布局为核心。
          </p>
        </div>
      </section>
    </div>
  );
}
