# Theme Flying · 序栈

基于 Next.js App Router、React 19 和 Tailwind CSS 的极简水墨博客主题。项目将 Markdown 内容、文章搜索、RSS 和静态资源全部保存在本地仓库，适合部署为静态或 Node.js 站点。

## 特性

- Next.js 16 App Router + React 19
- Light/Dark 主题与温润水墨设计 tokens
- View Transitions 页面切换
- cmdk 全文搜索、图片灯箱与代码复制
- Markdown/GFM、Shiki 高亮、Callouts、KaTeX
- RSS、搜索索引和 Service Worker
- 文章、归档、分类、标签、图库与 moments 页面
- 内容校验和静态产物验证脚本

## 技术栈

Next.js 16 · TypeScript 6 · Tailwind CSS v4 · Radix UI · HeroUI · Framer Motion · GSAP · Unified/Shiki。

## 开发

需要 Node.js 22.12+ 与 pnpm。

~~~bash
pnpm install
pnpm dev
~~~

常用检查和构建命令：

~~~bash
pnpm validate:content
pnpm typecheck
pnpm build
pnpm verify:static
pnpm start
~~~

pnpm build 会先校验 Markdown frontmatter 与图片，再生成 RSS/搜索索引并执行 Next.js 构建。

## 内容维护

- 文章：app/content/posts/ 下的 Markdown 文件
- 站点配置：app/data/site.ts
- 公共资源：public/assets/
- 内容处理：scripts/prepare-static-content.mjs

文章 frontmatter 示例：

~~~yaml
---
title: "我的第一篇文章"
description: "文章摘要"
pubDate: "2026-07-30"
category: "技术分享"
tags: ["Next.js", "前端工程"]
author: "Kerntau"
cover: "/assets/images/covers/example.svg"
---
~~~

## 许可证

代码以仓库中的 LICENSE 为准；文章和图片等内容请遵循各自的版权声明。
