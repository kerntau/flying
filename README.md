<div align="center">

# THEME FLYING // 序栈

**Next.js 驱动的极简现代水墨博客主题**<br>
*An immersive, local-first blog theme for thoughtful publishing.*

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111111)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
![License](https://img.shields.io/badge/License-MIT-555555?style=for-the-badge)

</div>

---

## 01. THE PURPOSE // 项目本源

Flying 是一个把 Markdown 内容、搜索索引、RSS 和阅读交互组合在一起的本地优先博客主题。项目支持静态导出，也可用 Node.js 运行。

[Repository](https://github.com/kerntau/flying)

## 02. CORE ARCHITECTURE // 核心架构

~~~mermaid
graph LR
  MD[Markdown content] --> V[Content validation]
  V --> IDX[RSS and search index]
  IDX --> N[Next.js App Router]
  N --> HTML[Static export or Node server]
  N --> UX[Search, zoom, theme, transitions]
~~~

scripts/prepare-static-content.mjs 在构建前校验 frontmatter 和资源，再生成索引与 RSS；Next.js 负责路由、页面和静态产物。

## 03. TECHNICAL MATRIX // 技术矩阵

| 领域 | 选型 | 作用 |
| --- | --- | --- |
| 框架 | Next.js 16、React 19 | 页面路由与渲染 |
| 样式 | Tailwind CSS v4、Design Tokens | 水墨主题与响应式 |
| 内容 | Gray Matter、Unified、Shiki | Markdown 解析和高亮 |
| 交互 | cmdk、medium-zoom、Framer Motion、GSAP | 搜索、图片和动画 |
| 输出 | RSS、Service Worker、静态导出 | 订阅、缓存与部署 |

## 04. REPOSITORY TOPOLOGY // 源码拓扑

~~~text
app/content/                 # Markdown 文章
app/data/site.ts             # 站点与友链数据
app/components/              # Shell、Sidebar、Search、Article Enhancer
app/posts、app/archives/     # 文章与归档路由
public/assets/               # 图片、字体和静态资源
scripts/prepare-static-content.mjs
next.config.mjs              # 静态输出配置
~~~

## 05. CLONE & QUICK START // 极速开始

需要 Node.js 22.12+ 与 pnpm。

~~~bash
git clone https://github.com/kerntau/flying.git
cd flying
pnpm install
pnpm dev
~~~

## 06. DEPLOYMENT & VERIFICATION // 部署与验证

~~~bash
pnpm validate:content
pnpm typecheck
pnpm build
pnpm verify:static
~~~

next.config.mjs 已配置静态输出和未优化图片；next.config.mjs 使用静态输出，部署时托管生成的静态目录；如改为服务器模式，再启用 pnpm start。发布前验证文章、搜索、RSS、主题切换、图片放大和移动端导航。

## 07. LICENSE // 许可证

package.json 声明代码使用 MIT；仓库当前未附 LICENSE 文件。
