import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { renderMarkdown, extractToc } from "@/lib/markdown";
import { countWords, estimateReadTime, formatWordCount } from "@/lib/word-count";
import { AuthorPopover } from "@/components/AuthorPopover";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";
import { ImagePreviewButton } from "@/components/LightboxModal";
import { ShareMenu } from "@/components/ShareMenu";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { TocProvider } from "@/components/TocContext";
import { FloatingToc } from "@/components/FloatingToc";
import { PostLayoutContent } from "@/components/PostLayoutContent";
import { HtmlMarkdownContent } from "@/components/HtmlMarkdownContent";
import { ArticleEnhancer } from "@/components/ArticleEnhancer";
import { PostCopyrightCard } from "@/components/PostCopyrightCard";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return post ? pageMetadata({ title: post.title, description: post.description, path: `/posts/${post.slug}/`, image: post.cover, type: "article" }) : {};
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await renderMarkdown(post.content);
  const tocItems = extractToc(post.content);

  // 获取所有文章，计算关联推荐、上一篇与下一篇
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const formattedDate = post.pubDate
    ? format(new Date(post.pubDate), "yyyy年MM月dd日", { locale: zhCN })
    : "";

  const wordCount = countWords(post.content);
  const readTimeMin = estimateReadTime(post.content);

  return (
    <TocProvider>
      {/* 顶部极细阅读进度指示条 */}
      <ReadingProgressBar />

      <PostLayoutContent
        header={
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 左侧信息大区 */}
            <div className={`space-y-4 ${post.cover ? "lg:col-span-8" : "lg:col-span-12"}`}>
              {/* 顶栏一体化精美元数据（作者头像 + 分类高亮 Pill + 标签 Pill 物理中轴线 100% 对齐） */}
              <div className="flex flex-wrap items-center gap-2 select-none">
                <AuthorPopover name={post.author} />

                {/* 分类 Badge */}
                {post.category && (
                  <Link
                    href={`/categories/${encodeURIComponent(post.category)}/`}
                    className="inline-flex items-center justify-center h-6 sm:h-6.5 px-2 text-xs font-bold rounded-md bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors shrink-0 leading-none"
                  >
                    <span>{post.category}</span>
                  </Link>
                )}

                {/* 文章标签列表 */}
                {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase())}/`}
                    className="inline-flex items-center justify-center h-6 sm:h-6.5 px-2 rounded-md bg-[var(--page-alt)]/80 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors font-medium text-xs border-0 shrink-0 leading-none"
                  >
                    <span>#{tag}</span>
                  </Link>
                ))}
              </div>

              {/* 文章大标题 (微调字号行高) */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--text)] leading-[1.3]">
                {post.title}
              </h1>

              {/* 文章摘要 */}
              {post.description && (
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-normal">
                  {post.description}
                </p>
              )}

              {/* 丰富作者元数据栏 */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)]/60">
                <div className="flex items-center gap-3 flex-wrap">
                  <time dateTime={post.pubDate} className="flex items-center gap-1">
                    <Icon name="calendar" size={14} />
                    <span>{formattedDate}</span>
                  </time>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-1">
                    <Icon name="clock" size={14} />
                    <span>约 {readTimeMin} 分钟阅读</span>
                  </span>
                </div>

                <ShareMenu title={post.title} />
              </div>
            </div>

            {/* 右侧封面大图 (精顺 16:9，适中尺寸) */}
            {post.cover && (
              <div className="lg:col-span-4 w-full flex justify-center lg:justify-end">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[var(--page-alt)] border border-[var(--line)] shadow-sm">
                  <ImagePreviewButton imageUrl={post.cover.includes("?") ? post.cover : `${post.cover}?v=4`} title={post.title} className="block h-full w-full cursor-zoom-in" />
                </div>
              </div>
            )}
          </div>
        }
        toc={<FloatingToc toc={tocItems} />}
      >
        <div className="fly-post-detail w-full space-y-4 sm:space-y-8">

        {/* 文章正文与结尾块 */}
        <div id="article" className="blog-root article-detail w-full min-w-0">
          <ArticleEnhancer />
          <HtmlMarkdownContent html={htmlContent} />

          {/* 复刻 Blog 源站的精美版权与元数据卡片 */}
          <PostCopyrightCard
            title={post.title}
            author={post.author}
            pubDate={formattedDate}
            slug={post.slug}
            wordCount={wordCount}
          />



          {/* 上一篇 / 下一篇跳转 (移动端紧凑 2 列 grid-cols-2 网格) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-6 w-full pt-4 sm:pt-6 mt-4 sm:mt-8 border-t border-[var(--line)]/60">
            {/* 上一篇 */}
            {prevPost ? (
              <div className="flex flex-col space-y-1.5 w-full group">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
                  <Icon name="arrow-left" size={12} className="text-[var(--accent)] group-hover:-translate-x-0.5 transition-transform" />
                  <span>上一篇</span>
                </div>
                <PostCard post={prevPost} />
              </div>
            ) : (
              <div className="flex flex-col space-y-1.5 w-full">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[var(--muted)]/40">
                  <Icon name="arrow-left" size={12} />
                  <span>上一篇</span>
                </div>
                <div className="w-full h-full min-h-[160px] rounded-2xl border border-[var(--line)]/60 bg-gradient-to-br from-[var(--page-alt)]/60 via-[var(--page)] to-[var(--page-alt)]/30 p-5 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] shadow-2xs">
                    <Icon name="archive" size={16} />
                  </div>
                  <span className="text-xs font-extrabold text-[var(--text)] tracking-tight">已至最早文章</span>
                  <span className="text-[10px] sm:text-[11px] text-[var(--muted)]">这里是探寻序栈的初始起点</span>
                </div>
              </div>
            )}

            {/* 下一篇 */}
            {nextPost ? (
              <div className="flex flex-col space-y-1.5 w-full items-end group">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[var(--muted)] group-hover:text-[var(--text)] transition-colors self-end">
                  <span>下一篇</span>
                  <Icon name="arrow-right" size={12} className="text-[var(--accent)] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="w-full">
                  <PostCard post={nextPost} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-1.5 w-full items-end">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[var(--muted)]/40 self-end">
                  <span>下一篇</span>
                  <Icon name="arrow-right" size={12} />
                </div>
                <div className="w-full h-full min-h-[160px] rounded-2xl border border-[var(--line)]/60 bg-gradient-to-br from-[var(--page-alt)]/60 via-[var(--page)] to-[var(--page-alt)]/30 p-5 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] shadow-2xs">
                    <Icon name="clock" size={16} />
                  </div>
                  <span className="text-xs font-extrabold text-[var(--text)] tracking-tight">已是最新发布</span>
                  <span className="text-[10px] sm:text-[11px] text-[var(--muted)]">持续创作中 · 敬请期待后续新篇</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 相关文章推荐 (移动端紧凑网格) */}
        {relatedPosts.length > 0 && (
          <section className="mt-5 sm:mt-10 pt-4 sm:pt-7 border-t border-[var(--line)]/60 space-y-3 sm:space-y-5">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <Icon name="list" size={18} />
              <span>推荐阅读</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-6">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
        </div>
      </PostLayoutContent>
    </TocProvider>
  );
}
