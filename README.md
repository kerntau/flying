<div align="center">

# 🪶 Theme Flying · 序栈

<p align="center">
  <b>极简·现代·沉浸式纯静态 Markdown 博客主题</b>
</p>

<p align="center">
  <i>"在有序的世界里，寻一处生活的归栈"</i>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 简介

**Flying** 是一款专注于**极简设计、无痕交互与极致阅读体验**的现代化静态博客主题。基于 **Next.js 15 App Router**、**React 19** 与 **Tailwind CSS v4** 构建。

项目完全摒弃了复杂的后端 API、数据库或第三方账号依赖。文章、动态、照片与站点配置均全量在本地 Git 仓库中维护，支持一键静态导出（`output: "export"`），可无缝部署至 Cloudflare Pages、Vercel、GitHub Pages 或 CDN 边缘存储。

---

## ✨ 核心特性

- ⚡ **纯粹静态化（Pure Static Export）**：构建时全量预渲染 75+ 静态 HTML 页面，配合零 API 依赖，实现毫秒级页面加载。
- 🎨 **无痕视觉美学（Borderless & Modern UI）**：全站按钮与交互元素采用无痕设计，无物理框线与高亮粗线，搭配极其柔和的微悬停视觉效果。
- ✒️ **独家品牌字体整合**：品牌标题单独集成 **霞鹜文楷 屏幕阅读版（LXGW WenKai Screen）**，兼具书法笔触韵味与现代科技质感。
- 🌓 **丝滑暗色模式（Seamless Theme Transition）**：内置 `next-themes` 与 View Transitions 原生圆弧全屏擦除动画，暗/亮色切换无缝平滑。
- 🖼️ **全自动本地静态封面生成**：内置自动化 SVG 矢量封面生成脚本（`scripts/update-covers.mjs`），一键为所有 Markdown 文章输出现代渐变封面图，彻底摆脱外部网络图片引用。
- 🔍 **静态搜索与 RSS 全自动索引**：构建期自动校验文章 YAML Frontmatter 格式、图片完整性与内部链接，全自动生成 `search-index.json` 与 `rss.xml`。
- 📱 **全设备响应式设计（Responsive Adaption）**：全面适配 Desktop、Tablet 及 Mobile 端，包含移动端抽屉导航（Sheet Drawer）、全屏渐隐交互搜索框（CmdK）与全悬浮目录（Floating TOC）。

---

## 🛠️ 技术栈

| 模块 | 选用技术 / 依赖包 |
| :--- | :--- |
| **Core Framework** | [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling Systems** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design Tokens |
| **UI Components** | [Radix UI Tooltip / Dialog / Popover](https://www.radix-ui.com/) + [cmdk](https://cmdk.pacer.io/) |
| **Animation & Motion** | [Framer Motion](https://www.framer.com/motion/) + View Transitions API |
| **Markdown Engine** | [Unified](https://github.com/unifiedjs/unified) + [Remark](https://github.com/remarkjs/remark) + [Rehype](https://github.com/rehypejs/rehype) + [Gray-Matter](https://github.com/jonschlinkert/gray-matter) |
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
│   ├── components/       # 核心 UI 与 Client Component 组件
│   │   ├── ui/           # Radix UI 基础无痕原子组件 (Tooltip, Sheet...)
│   │   ├── AppShell.tsx  # 页面全局外壳组件
│   │   ├── Sidebar.tsx   # 响应式侧边栏导航
│   │   └── ...
│   ├── content/          # 本地纯静态内容源数据
│   │   ├── posts/        # Markdown 格式文章 (.md)
│   │   ├── photos/       # 图库 JSON 数据 (.json)
│   │   └── moments/      # 瞬间与动态 JSON 数据 (.json)
│   ├── data/             # 站点基础元数据、导航与友链 (site.ts)
│   ├── lib/              # Markdown 解析器、内容读取服务与 SEO
│   ├── moments/          # 瞬间动态页面
│   ├── photos/           # 静态图库页面
│   ├── posts/            # 文章详情路由 (/posts/[slug])
│   ├── tags/             # 标签归档页面
│   ├── globals.css       # Tailwind CSS v4 样式与主题变量
│   └── layout.tsx        # 根布局与 TooltipProvider 配置
├── public/
│   ├── assets/
│   │   └── images/
│   │       └── covers/   # 15 篇文章全量本地静态 SVG 封面
│   ├── favicon.ico       # 站点 Favicon 图标集
│   ├── og-image.jpg      # Open Graph 高清社交分享卡片图
│   └── site.webmanifest  # PWA Manifest 文件
├── scripts/
│   ├── prepare-static-content.mjs # 静态内容校验、RSS 与搜索索引生成脚本
│   └── update-covers.mjs          # 自动渲染输出 SVG 矢量封面图脚本
├── next.config.mjs       # Next.js 静态 Export 配置 (`output: "export"`)
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

### 3. TypeScript 类型检查
```bash
pnpm typecheck
```

### 4. 校验静态内容与关联资源
```bash
pnpm validate:content
```

### 5. 生成生产环境全量静态构建
```bash
pnpm build
```
> `pnpm build` 会依次自动触发：`validate:content` 校验 Markdown frontmatter/图片完整性 ➔ 自动生成 `public/search-index.json` 与 `public/rss.xml` ➔ 导出 75+ 全量 HTML 静态网页至 `out/` 目录。

---

## ✍️ 本地内容维护

### 文章 (Posts)
在 `app/content/posts/` 目录下直接新建 Markdown 文件（如 `my-first-post.md`），头部填入 Frontmatter 元数据：

```markdown
---
title: "我的第一篇博客文章"
description: "这里是文章的简短摘要描述"
pubDate: "2026-07-28"
category: "技术分享"
tags:
  - "Next.js"
  - "前端工程"
author: "Kerntau"
cover: "/assets/images/covers/my-first-post.svg"
---

这里开始编写 Markdown 正文...
```

### 自动化生成/更新封面图
运行内置的封面渲染脚本：
```bash
node scripts/update-covers.mjs
```
该脚本会自动读取 `app/content/posts/*.md` 中的标题，全自动为每篇文章输出科技感 SVG 封面图至 `public/assets/images/covers/[slug].svg` 并自动更新 Markdown 中的 Frontmatter `cover` 路径。

### 站点基础元数据
编辑 `app/data/site.ts` 修改站点标题、副标题、作者信息、ICP 备案号、公安网安备案号、导航菜单与友情链接等。

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源许可发布。
