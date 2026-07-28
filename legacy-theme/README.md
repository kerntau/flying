# Legacy Theme Archival & Mapping Index

本目录用于归档留存未迁移的原始 Astro / Vue / UnoCSS 主题代码与配置，方便开发时对比与复刻。

---

## 📁 目录结构与映射对照表

### 1. 页面 (Pages) `legacy-theme/pages/`
| 原始 Astro 页面文件 | Next.js 重构/对应位置 | 状态说明 |
| :--- | :--- | :--- |
| `index.astro` | [app/page.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/page.tsx) | 首页 |
| `about.astro` | [app/about/page.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/about/page.tsx) | 关于页 |
| `archives.astro` | [app/archives/page.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/archives/page.tsx) | 归档页 |
| `links.astro` | [app/links/page.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/links/page.tsx) | 友链页 |
| `posts/[slug].astro` | [app/posts/[slug]/page.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/posts/[slug]/page.tsx) | 文章详情页 |
| `photos/index.astro` / `[slug].astro` | [app/photos/](file:///c:/Users/Kerntau/Desktop/theme-flying/app/photos/) | 图库列表及详情 |
| `moments/index.astro` / `[slug].astro` | [app/moments/](file:///c:/Users/Kerntau/Desktop/theme-flying/app/moments/) | 动态/微语列表及详情 |
| `tags/index.astro` / `[slug].astro` | [app/tags/](file:///c:/Users/Kerntau/Desktop/theme-flying/app/tags/) | 标签列表及筛选页 |
| `categories/index.astro` / `[slug].astro` | [app/categories/](file:///c:/Users/Kerntau/Desktop/theme-flying/app/categories/) | 分类列表及筛选页 |
| `authors/index.astro` / `[slug].astro` | [app/authors/](file:///c:/Users/Kerntau/Desktop/theme-flying/app/authors/) | 作者列表及筛选页 |

---

### 2. 布局 (Layouts) `legacy-theme/layouts/`
- `SiteLayout.astro`: 通用站点布局，对应 Next.js 中的 [app/layout.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/layout.tsx) 及 [app/components/AppShell.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/components/AppShell.tsx)。

---

### 3. 组件 (Components) `legacy-theme/components/`
包含所有原始 `.astro` 和 `.vue` 组件：
- `Sidebar.astro`: 原始侧边栏，对应 React 版 [Sidebar.tsx](file:///c:/Users/Kerntau/Desktop/theme-flying/app/components/Sidebar.tsx)
- `PostCard.astro`: 文章卡片组件
- `Hero.astro`: 首页 Banner Hero 区域
- `Icon.astro`: 图标封装组件
- `ThemeSwitcher.vue`: 原 Vue 版深浅色切换器
- `AuthorPopover.astro` / `AuthorPopoverPanel.astro`: 作者卡片弹窗
- `NavigationPopup.astro`: 导航弹出菜单
- `SearchDialog.astro`: 搜索框弹窗
- `TaxonomyNav.astro` / `TaxonomySections.astro`: 分类标签导航组件

---

### 4. 配置文件 (Config) `legacy-theme/config/`
- `astro.config.mjs`: Astro 配置文件
- `uno.config.ts`: UnoCSS 配置文件
- `unocss/`: UnoCSS 主题预设及样式配置
