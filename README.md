<div align="center">

# ✦ Theme Flying · 序栈

<p align="center">
  <b>基于 Next.js 16 (App Router) + React 19 的极简现代水墨沉浸式博客主题</b>
</p>

<p align="center">
  <i>"在有序的世界里，寻一处生活的归栈"</i>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-green?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## 📖 简介

**Flying (序栈)** 是一款追求**极简水墨美学、零无用框线、无缝 SPA 切页与极致沉浸阅读体验**的现代化静态博客与 Showcase 主题。

基于 **Next.js 16 (App Router)**、**React 19** 与 **Tailwind CSS v4** 架构构建。项目全量在本地 Git 仓库中维护（Zero API / Zero DB 依赖），配合自动化内容解析校验管道，一键生成包含 95+ 静态网页的无缝 Web 应用。

---

## ✨ 核心特性

- ⚡ **Next.js 16 & React 19 强劲驱动**：利用最新的 React 19 客户端水合与 Next.js 16 App Router SSG 静态预渲染，极致秒开。
- 🎨 **极简现代水墨 Design Tokens**：通透胶囊材质，彻底删除厚重底色与黑粗边框。支持浅色模式 (Light) 与深色模式 (Dark) 的柔和无缝切换。
- 🌀 **原生 View Transitions API 零感切页**：自动接管全站同源跳转，搭配 60fps 平滑淡入淡出，消除 GPU 闪烁，侧边栏保持 100% 绝对稳定。
- 🔍 **`cmdk` 全字段动态高亮搜索**：支持标题、分类、描述摘要及 `#标签` 多词模糊高亮匹配（`HighlightText`），包含热门搜词建议与匹配数量统计。
- 🖼️ **`medium-zoom` 沉浸式图片放大**：Markdown 正文图片无缝全屏平滑放大，背景自适应主题色，再次点击或滚动平滑归位。
- 🎉 **`canvas-confetti` 交互彩蛋粒子**：在复制文章代码或友链信息成功时，异步触发轻量五彩彩蛋粒子极简反馈。
- 🚀 **Service Worker WebFont 离线加速**：内置 Cache-First 策略 Service Worker，霞鹜文楷、炫动楷书等 WebFont 字体二次访问实现 0ms 瞬间渲染。
- 📊 **原生 Web Vitals 性能监控**：开发环境自动追踪 Core Web Vitals (LCP, CLS, INP, TTFB) 性能指标。
- ✒️ **Markdown & GFM 深度定制**：集成 Shiki 4.3 语法高亮、自动 TOC 提取、Callouts 提示框以及水墨滚动表格封装。
- 🐾 **Pet Companion 桌面伴侣**：首页与全站交互灵动伴侣，在文章详情页自动感知并卸载隐退，提供纯粹阅读环境。

---

## 🛠️ 技术栈

| 模块 | 选用技术 / 依赖包 |
| :--- | :--- |
| **Core Framework** | [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| **Language** | [TypeScript 6.0](https://www.typescriptlang.org/) |
| **Styling Systems** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design Tokens |
| **UI Components** | [Radix UI Tooltip / Dialog / Popover](https://www.radix-ui.com/) + [cmdk](https://cmdk.pacer.io/) |
| **Animation & Motion** | [GSAP 3.15](https://greensock.com/gsap/) + [Framer Motion 12.4](https://www.framer.com/motion/) + View Transitions API |
| **Image & Micro-interaction** | [medium-zoom](https://github.com/francoischalifour/medium-zoom) + [canvas-confetti](https://github.com/catdad/canvas-confetti) |
| **Markdown Engine** | [Unified](https://github.com/unifiedjs/unified) + [Shiki 4.3](https://shiki.matsu.io/) + [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/) + [Gray-Matter](https://github.com/jonschlinkert/gray-matter) |
| **Carousel & Viewing** | [Embla Carousel](https://www.embla-carousel.com/) + [react-zoom-pan-pinch](https://github.com/prcweb/react-zoom-pan-pinch) |

---

## 📁 目录结构

```text
theme-flying/
├── app/
│   ├── about/            # 关于页面 (/about)
│   ├── archives/         # 归档总览 (/archives)
│   ├── authors/          # 作者归档 (/authors)
│   ├── categories/       # 分类目录 (/categories)
│   ├── components/       # 核心 UI 组件
│   │   ├── ui/           # Radix UI 基础无痕原子组件 (Tooltip, Popover...)
│   │   ├── AppShell.tsx  # 页面全局外壳与 Service Worker 注册
│   │   ├── ArticleEnhancer.tsx # 正文表格、代码复制及 medium-zoom 增强
│   │   ├── SearchDialog.tsx   # CMDK 动态高亮搜索弹窗
│   │   ├── WebVitals.tsx      # 原生 Web Vitals 监控 Hook
│   │   └── Sidebar.tsx        # 响应式侧边栏导航
│   ├── content/          # 本地纯静态 Markdown / JSON 源数据
│   ├── data/             # 站点基础元数据、导航与友链 (site.ts)
│   ├── lib/              # Markdown 解析器、单词估算与 confetti 粒子工具
│   ├── moments/          # 动态日志页面
│   ├── photos/           # 静态图库页面
│   ├── posts/            # 文章详情路由 (/posts/[slug])
│   ├── tags/             # 标签归档页面
│   ├── globals.css       # Tailwind CSS v4 样式与水墨 Design Tokens
│   └── layout.tsx        # 根布局
├── public/
│   ├── assets/           # 本地静态图片与 SVG 封面图库
│   ├── sw.js             # 字体与 CDN 资源 Cache-First 离线 Service Worker
│   ├── search-index.json # 构建生成的文章搜索索引数据
│   └── rss.xml           # 自动构建生成的 RSS 2.0 订阅文件
├── scripts/
│   └── prepare-static-content.mjs # 内容格式校验、RSS 与搜索索引全自动生成脚本
├── package.json
└── tsconfig.json
```

---

## ⚡ 开发与构建指令

### 1. 安装依赖
```bash
pnpm install
```

### 2. 启动本地开发服务器
```bash
pnpm dev
```

### 3. TypeScript 静态类型检查
```bash
pnpm typecheck
```

### 4. 校验静态内容与关联资源
```bash
pnpm validate:content
```

### 5. 生产打包与构建
```bash
pnpm build
```
> `pnpm build` 会依次自动触发：`validate:content` 校验 Markdown frontmatter 与图片完整性 ➔ 自动导出 `public/search-index.json` 与 `public/rss.xml` ➔ 完成 95+ 页面 SSG 全量静态编译。

---

## ✍️ 本地内容维护

### 文章 (Posts)
在 `app/content/posts/` 目录下创建 Markdown 文件（如 `my-first-post.md`），头部指定 Frontmatter 元数据：

```markdown
---
title: "我的第一篇博客文章"
description: "这里是文章的简短摘要描述"
pubDate: "2026-07-30"
category: "技术分享"
tags:
  - "Next.js"
  - "前端工程"
author: "Kerntau"
cover: "/assets/images/covers/my-first-post.svg"
---

这里开始编写 Markdown 正文...
```

### 站点基础配置
编辑 `app/data/site.ts` 即可修改站点标题、副标题、作者信息、防缓存 QQ 头像路径（`&t=...`）、ICP 备案号、公安备案号、导航菜单与友情链接等。

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源许可发布。
