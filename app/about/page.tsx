import React from "react";
import { site } from "@/data/site";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "关于", description: "关于 Kerntau 与序栈。", path: "/about/", image: site.logo });

export default function AboutPage() {
  return (
    <div className="fly-about-page max-w-3xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6 space-y-4">
        <div className="flex items-center gap-4">
          <img src={site.logo} alt={site.title} className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]" />
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--text)]">{site.title}</h1>
            <p className="text-sm text-[var(--muted)]">{site.subtitle}</p>
          </div>
        </div>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-sm sm:text-base leading-relaxed">
        <p>{site.description}</p>
        <h2 className="text-xl font-bold text-[var(--text)] pt-4">关于本站</h2>
        <p>
          Flying 是一款追求极致优雅与沉浸阅读体验的极简现代化博客主题。基于 Next.js App Router、TypeScript 与 Tailwind CSS 构建，致力于提供零负担的纯粹写作与浏览体验。
        </p>

        <h2 className="text-xl font-bold text-[var(--text)] pt-4">联系方式与关注</h2>
        <ul className="space-y-2 list-none pl-0">
          <li className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Icon name="mail" size={16} />
            <span>邮箱: coet.ink@qq.com</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Icon name="link" size={16} />
            <a href="https://github.com/kerntau" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub: github.com/kerntau
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
