import React from "react";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import {
  User,
  Heart,
  Globe,
  Github,
  Mail,
  Sparkles,
  Terminal,
  Clock,
  Layers,
  Code2,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "关于序栈",
  description: "关于 Kerntau 与序栈（Flying Theme）的设计理念、技术探索、鸣谢与联络方式。",
  path: "/about/",
  image: site.logo,
});

export default function AboutPage() {

  const recentTimeline = [
    { time: "2026 年 4 月 - 至今", text: "在完成一件事。" },
    { time: "2026 年 3 月", text: "使用 Nuxt 4 重构个人主站。" },
    { time: "2026 年 2 月", text: "使用 React 重构个人博客。" },
  ];

  // 严格无遗漏的鸣谢列表
  const thanksList = [
    {
      name: "Handsome (acanyo)",
      title: "theme-flying / 个人博客",
      url: "https://www.xhhao.com/",
      repoUrl: "https://github.com/acanyo/theme-flying",
      siteLabel: "www.xhhao.com · github.com/acanyo/theme-flying",
      iconUrl: "https://github.com/acanyo.png",
      note: "Handsome 的独立博客与 theme-flying 主题启发",
    },
    {
      name: "Zhilu",
      title: "blog-v3",
      url: "https://github.com/L33Z22L11/blog-v3",
      repoUrl: "https://github.com/L33Z22L11/blog-v3",
      siteLabel: "blog.zhilu.site · github.com/L33Z22L11/blog-v3",
      iconUrl: "https://github.com/L33Z22L11.png",
      note: "blog.zhilu.site 归档与微交互灵感",
    },
    {
      name: "lxchapu",
      title: "astro-gyoza",
      url: "https://github.com/lxchapu/astro-gyoza",
      repoUrl: "https://github.com/lxchapu/astro-gyoza",
      siteLabel: "gyoza.lxchapu.com · github.com/lxchapu/astro-gyoza",
      iconUrl: "https://github.com/lxchapu.png",
      note: "gyoza.lxchapu.com 排版与技术规范参照",
    },
    {
      name: "innei",
      title: "Shiro",
      url: "https://github.com/innei/Shiro",
      repoUrl: "https://github.com/innei/Shiro",
      siteLabel: "innei.in · github.com/innei/Shiro",
      iconUrl: "https://github.com/innei.png",
      note: "innei.in / Shiro 画廊感与美感启发",
    },
  ];

  return (
    <div className="fly-about-page w-full max-w-5xl mx-auto space-y-10 sm:space-y-12 py-4 pb-16 transition-all duration-350 select-none">
      {/* 高感水墨清爽 Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--line)]/20 pb-6 gap-4">
        {/* 左侧：头像 + 名字 + 动态标签 */}
        <div className="flex items-center gap-4">
          <div className="relative group shrink-0 w-16 h-16 sm:w-20 sm:h-20">
            <img
              src={site.logo}
              alt={site.author}
              className="w-full h-full rounded-full object-cover shadow-sm border border-[var(--line)]/20 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--page)] shadow-xs" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">
                {site.author}
              </h1>
              <span className="px-2 py-0.5 rounded-md text-[0.7rem] font-mono font-bold bg-[var(--accent)]/10 text-[var(--accent)]">
                Pro
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[var(--muted)]">
              信息安全专业 · 全栈/安全探索者 · 知行合一，缄默前行
            </p>
          </div>
        </div>

        {/* 右侧：社交快捷按钮组 */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/kerntau"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--page-alt)]/70 hover:bg-[var(--page-alt)] text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] transition-all shadow-2xs"
          >
            <Github className="w-4 h-4 opacity-80" />
            <span>GitHub</span>
          </a>
          <a
            href="mailto:coet.ink@qq.com"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--page-alt)]/70 hover:bg-[var(--page-alt)] text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] transition-all shadow-2xs"
          >
            <Mail className="w-4 h-4 opacity-80" />
            <span>Email</span>
          </a>
        </div>
      </header>

      {/* 核心板块 */}
      <div className="space-y-10 sm:space-y-12">
        {/* 1. 关于我 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
            <User className="w-4 h-4 text-[var(--accent)]" />
            <span>关于我 / ABOUT ME</span>
          </div>

          <div className="bg-[var(--page-alt)]/40 hover:bg-[var(--page-alt)]/60 transition-colors rounded-2xl p-6 sm:p-7 space-y-3 border-0 shadow-2xs text-sm sm:text-base text-[var(--muted)] leading-relaxed font-medium">
            <p>
              你好，我是 <strong className="text-[var(--text)] font-bold">Kerntau</strong>，一名即将毕业的信息安全专业学生。这里主要记录我的网络安全学习心得、开发实践经历与技术笔记。
            </p>
            <p>
              除了信息安全领域的渗透测试与网络基础，我也热衷于 Web 开发，熟悉 C 与 Python，常在 Linux / Windows 环境下折腾，目前主要使用 React 和 Next.js / Nuxt 等框架构建现代化的 Web 应用。
            </p>
          </div>
        </section>

        {/* 2. GitHub 贡献图贪食蛇 (GitHub Contribution Snake Grid) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>GITHUB 贡献图贪食蛇 / CONTRIBUTIONS</span>
            </div>
            <a
              href="https://github.com/kerntau"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              @kerntau
            </a>
          </div>

          <div className="bg-[var(--page-alt)]/40 rounded-2xl p-4 sm:p-6 overflow-hidden border-0 shadow-2xs flex flex-col items-center justify-center space-y-3">
            <img
              src="https://ghchart.rshah.org/409ea7/kerntau"
              alt="Kerntau's GitHub Contributions"
              className="w-full max-w-full h-auto min-h-[110px] object-contain rounded-xl"
            />
          </div>
        </section>


        {/* 4. 近期活动 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>近期活动 / TIMELINE</span>
          </div>

          <div className="bg-[var(--page-alt)]/40 rounded-2xl p-5 sm:p-6 space-y-3">
            {recentTimeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                <span className="shrink-0 font-mono font-bold text-[var(--text)] bg-[var(--page)] px-2.5 py-1 rounded-md shadow-2xs">
                  {item.time}
                </span>
                <span className="text-[var(--muted)] font-medium pt-1">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 鸣谢与开源致谢 (Acknowledgements) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>鸣谢与开源致谢 / ACKNOWLEDGEMENTS</span>
          </div>

          <p className="text-xs text-[var(--muted)] font-medium">
            本站的开发离不开开源社区的启发，特别感谢以下大佬的开源项目与创意设计：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {thanksList.map((item) => (
              <div
                key={item.name}
                className="group p-5 rounded-2xl bg-[var(--page-alt)]/50 hover:bg-[var(--page-alt)] transition-all duration-300 hover:-translate-y-0.5 shadow-2xs hover:shadow-md border-0 flex items-start gap-3.5"
              >
                <img
                  src={item.iconUrl}
                  alt={item.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0 bg-[var(--page)] shadow-2xs border border-[var(--line)]/20"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-extrabold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-0.5"
                          title="访问博客"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {item.repoUrl && (
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-0.5"
                          title="访问 GitHub 仓库"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--muted)] line-clamp-1 font-medium">
                    {item.note}
                  </p>
                  <div className="text-[0.7rem] font-mono text-[var(--mute)] truncate pt-0.5">
                    {item.siteLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 关于 Flying 主题 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
            <Layers className="w-4 h-4 text-purple-500" />
            <span>关于 FLYING 主题 / THEME</span>
          </div>

          <div className="bg-[var(--page-alt)]/40 rounded-2xl p-6 sm:p-7 space-y-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-medium">
            <p>
              <strong className="text-[var(--text)] font-bold">Flying</strong> 是一套追求极致优雅、无缝微动效与沉浸阅读体验的现代响应式博客主题。
            </p>
            <p>
              架构核心强调 <code className="px-2 py-0.5 rounded bg-[var(--page)] text-[var(--text)] font-bold">Clean Code</code> 与 <code className="px-2 py-0.5 rounded bg-[var(--page)] text-[var(--text)] font-bold">KISS 原则</code>，告别传统主题的冗余依赖与花哨堆砌，以高识别度的水墨质感封面、流利自如的 Markdown 渲染及全端完美的 100% 响应式布局为核心。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
