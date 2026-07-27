# Flying 独立站点

`Flying` 现在是一个独立 Astro 博客项目。它保留原主题的左侧导航、内容卡片、图库、作者页、暗色模式和页面动效，但运行时不再依赖外部主题系统、Finder API、后台主题配置或 Thymeleaf 模板。

## 目录结构

```text
app/
  components/        # 独立站点组件
  content/           # 本地文章、图库和瞬间内容
  data/              # 站点信息、导航、作者、友链
  layouts/           # 页面布局
  pages/             # Astro 路由
public/
  assets/
    css/
    js/
    images/
    icons/
unocss/
  preflights/
  shortcuts/
scripts/
  build-theme.mjs    # 生成图标、UnoCSS，并执行 Astro build
  validate-theme.mjs # 独立站点结构校验
```

## 开发

```bash
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm lint
pnpm typecheck
pnpm build
node scripts/validate-theme.mjs
```

## 内容

- 文章放在 `app/content/posts/*.md`
- 图片条目放在 `app/content/photos/*.json`
- 瞬间条目放在 `app/content/moments/*.json`
- 导航、友链、作者和站点基础信息在 `app/data/site.ts`

构建输出在 `dist/`。项目不包含任何 Halo 模板、主题 YAML 或后台设置文件。
