import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { renderMarkdown, extractToc } from "@/lib/markdown";
import { AuthorPopover } from "@/components/AuthorPopover";
import { Toc } from "@/components/Toc";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";
import { ImagePreviewButton } from "@/components/LightboxModal";
import { ShareMenu } from "@/components/ShareMenu";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

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
    <>
      {/* 顶部极细阅读进度指示条 */}
      <ReadingProgressBar />

      <article className="fly-post-detail w-full space-y-10">
        {/* 顶部 Header：左侧标题简介标签元数据 + 右侧封面大图 */}
        <header className="fly-post-header border-b border-[var(--line)] pb-6 pt-1">
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

            {/* 右侧封面大图 (占比 4 栏，精美 16:9) */}
            {post.cover && (
              <div className="lg:col-span-4 w-full flex justify-end">
                <div className="aspect-[16/9] w-full max-h-[250px] rounded-2xl overflow-hidden bg-[var(--page-alt)] border border-[var(--line)] shadow-sm">
                  <ImagePreviewButton imageUrl={post.cover} title={post.title} className="block h-full w-full cursor-zoom-in" />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* 正文 + 吸顶 Sidebar 双栏 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* 左侧正文大区 */}
          <div className="lg:col-span-3 min-w-0 space-y-10">
            <div
              className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* 底部标签列表 */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-[var(--line)] flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[var(--mute)]">文章标签:</span>
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

            {/* 文章版权卡片 (Copyright Box) */}
            <div className="p-5 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] space-y-2 text-xs text-[var(--muted)] relative overflow-hidden">
              <div className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                <Icon name="lock" size={16} />
                <span>版权与授权声明</span>
              </div>
              <p className="leading-normal">
                本文由 <strong className="text-[var(--text)]">{post.author || "Kerntau"}</strong> 创作，采用{" "}
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                  rel="noopener"
                  className="underline hover:text-[var(--text)]"
                >
                  CC BY-NC-SA 4.0
                </a>{" "}
                许可协议。转载请保留署名并注明出处。
              </p>
            </div>

            {/* 上一篇 / 下一篇跳转 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {prevPost ? (
                <Link
                  href={`/posts/${prevPost.slug}/`}
                  className="group p-4 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] hover:border-[var(--muted)] transition-all flex flex-col justify-between gap-2"
                >
                  <span className="text-[11px] font-semibold text-[var(--mute)] flex items-center gap-1 group-hover:text-[var(--text)] transition-colors">
                    <Icon name="arrow-left" size={12} />
                    <span>上一篇</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text)] line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="p-4 rounded-2xl bg-[var(--page-alt)]/50 border border-[var(--line)]/50 text-[11px] text-[var(--mute)] flex items-center">
                  已是最新一篇文章
                </div>
              )}

              {nextPost ? (
                <Link
                  href={`/posts/${nextPost.slug}/`}
                  className="group p-4 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] hover:border-[var(--muted)] transition-all flex flex-col justify-between gap-2 text-right"
                >
                  <span className="text-[11px] font-semibold text-[var(--mute)] flex items-center gap-1 justify-end group-hover:text-[var(--text)] transition-colors">
                    <span>下一篇</span>
                    <Icon name="arrow-right" size={12} />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text)] line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div className="p-4 rounded-2xl bg-[var(--page-alt)]/50 border border-[var(--line)]/50 text-[11px] text-[var(--mute)] flex items-center justify-end">
                  已是最后一篇文章
                </div>
              )}
            </div>
          </div>

          {/* 右侧吸顶 Sticky 目录 */}
          <aside className="hidden lg:block lg:col-span-1 self-start">
            <Toc items={tocItems} />
          </aside>
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
      </article>
    </>
  );
}
