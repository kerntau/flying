import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { renderMarkdown, extractToc } from "@/lib/markdown";
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

  // 估算阅读时长（按中文 400字/分钟）
  const readTimeMin = Math.max(1, Math.ceil((post.content || "").length / 400));

  return (
    <TocProvider>
      {/* 顶部极细阅读进度指示条 */}
      <ReadingProgressBar />

      <PostLayoutContent
        header={
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 左侧信息大区 */}
            <div className={`space-y-4 ${post.cover ? "lg:col-span-8" : "lg:col-span-12"}`}>
              {/* 分类 Pill 标签 */}
              {post.category && (
                <div>
                  <Link
                    href={`/categories/${encodeURIComponent(post.category)}/`}
                    className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold rounded-md bg-[var(--page-alt)] text-[var(--text)] border border-[var(--line)] hover:border-[var(--muted)] transition-colors shadow-xs"
                  >
                    {post.category}
                  </Link>
                </div>
              )}

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

              {/* 文章标签（与首页文章列表 100% 一致的优雅 Pill 格式） */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag.toLowerCase())}/`}
                      className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] transition-colors font-medium text-[11px]"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* 丰富作者元数据栏 */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)]/60">
                <div className="flex items-center gap-3 flex-wrap">
                  <AuthorPopover name={post.author} />
                  <span className="opacity-40">•</span>
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
                <div className="aspect-[16/9] w-full max-w-[340px] max-h-[190px] rounded-2xl overflow-hidden bg-[var(--page-alt)] border border-[var(--line)] shadow-sm">
                  <ImagePreviewButton imageUrl={post.cover} title={post.title} className="block h-full w-full cursor-zoom-in" />
                </div>
              </div>
            )}
          </div>
        }
        toc={<FloatingToc toc={tocItems} />}
      >
        <div className="fly-post-detail w-full space-y-10">

        {/* 文章正文与结尾块 */}
        <div className="w-full min-w-0 space-y-10">
          <HtmlMarkdownContent html={htmlContent} />

          {/* 复刻 Blog 源站的精美版权与元数据卡片 */}
          <PostCopyrightCard
            title={post.title}
            author={post.author}
            pubDate={formattedDate}
            slug={post.slug}
          />



          {/* 上一篇 / 下一篇跳转 (精美 Direction Badge 与虚线 Empty State 卡片) */}
          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 pt-4">
            {prevPost ? (
              <div className="flex flex-col space-y-2.5 w-full max-w-[260px] group">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] group-hover:text-blue-500 transition-colors">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--page-alt)] border border-[var(--line)] group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-colors">
                    <Icon name="arrow-left" size={11} />
                  </span>
                  <span>上一篇</span>
                </div>
                <PostCard post={prevPost} />
              </div>
            ) : (
              <div className="flex flex-col space-y-2.5 w-full max-w-[260px]">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--mute)]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--page-alt)]/60 border border-[var(--line)]/60">
                    <Icon name="arrow-left" size={11} />
                  </span>
                  <span>上一篇</span>
                </div>
                <div className="w-full h-[220px] rounded-2xl border border-dashed border-[var(--line)] bg-[var(--page-alt)]/20 p-5 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--page-alt)] border border-[var(--line)] flex items-center justify-center text-[var(--mute)]">
                    <Icon name="check" size={13} />
                  </div>
                  <span className="text-xs font-medium text-[var(--muted)]">已是最新一篇文章</span>
                </div>
              </div>
            )}

            {nextPost ? (
              <div className="flex flex-col space-y-2.5 w-full max-w-[260px] items-end group">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] group-hover:text-blue-500 transition-colors">
                  <span>下一篇</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--page-alt)] border border-[var(--line)] group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-colors">
                    <Icon name="arrow-right" size={11} />
                  </span>
                </div>
                <div className="w-full">
                  <PostCard post={nextPost} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2.5 w-full max-w-[260px] items-end">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--mute)]">
                  <span>下一篇</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--page-alt)]/60 border border-[var(--line)]/60">
                    <Icon name="arrow-right" size={11} />
                  </span>
                </div>
                <div className="w-full h-[220px] rounded-2xl border border-dashed border-[var(--line)] bg-[var(--page-alt)]/20 p-5 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--page-alt)] border border-[var(--line)] flex items-center justify-center text-[var(--mute)]">
                    <Icon name="check" size={13} />
                  </div>
                  <span className="text-xs font-medium text-[var(--muted)]">已是最后一篇文章</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 相关文章推荐 */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[var(--line)] space-y-6">
            <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <Icon name="list" size={20} />
              <span>推荐阅读</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
