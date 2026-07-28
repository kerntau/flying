# Flying 静态博客

Flying 是基于 Next.js App Router 的静态博客。内容、图片、瞬间和友链均在仓库本地维护，构建时生成可直接部署的静态站点；站点不依赖 Halo API、账户、评论或订阅服务。

## 技术栈

- Next.js App Router + TypeScript
- Tailwind CSS v4、Radix UI 与 cmdk
- next-themes、Embla Carousel、react-zoom-pan-pinch
- Markdown frontmatter 与本地 JSON 内容读取

`next.config.mjs` 使用 `output: "export"`、`trailingSlash: true` 与未优化图片，部署产物位于 `out/`。

## 目录

```text
app/
  components/        # 布局与 Client Component 交互
  content/           # Markdown 文章、图库与瞬间数据
  data/              # 站点信息、导航、作者和友链
  lib/               # 内容模型、读取层、RSS、SEO
  posts/             # App Router 页面路由
  photos/
  moments/
  categories/
  tags/
  authors/
scripts/
  prepare-static-content.mjs # 内容校验、RSS 与搜索索引生成
public/
  assets/            # 保持原有图片与图标地址
```

## 开发与构建

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm validate:content
pnpm build
```

`pnpm build` 会先校验 frontmatter、重复 slug、本地封面和正文图片、内部链接，再生成 `public/search-index.json`、`public/rss.xml` 和全部静态路由。

## 内容维护

- 文章：`app/content/posts/*.md`
- 图库：`app/content/photos/*.json`
- 瞬间：`app/content/moments/*.json`
- 作者、友链、导航和站点元信息：`app/data/site.ts`

所有本地图片继续通过 `/assets/...` 地址引用，保持文章封面、RSS、canonical、Open Graph 和中文 slug 的既有 URL。
