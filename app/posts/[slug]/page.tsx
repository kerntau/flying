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

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await renderMarkdown(post.content);
  const tocItems = extractToc(post.content);

  // 相关文章推荐（同分类优先，截取前 3 篇）
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const formattedDate = post.pubDate
    ? format(new Date(post.pubDate), "yyyy年MM月dd日", { locale: zhCN })
    : "";

  return (
    <article className="fly-post-detail max-w-5xl mx-auto space-y-10">
      {/* Header Info */}
      <header className="fly-post-header space-y-4 border-b border-[var(--line)] pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-2"
        >
          <Icon name="arrow-left" size={16} />
          <span>返回首页</span>
        </Link>

        {post.category && (
          <Link
            href={`/categories/${encodeURIComponent(post.category)}/`}
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[var(--page-alt)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] transition-colors"
          >
            {post.category}
          </Link>
        )}

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)] pt-2">
          <AuthorPopover name={post.author} />
          <span>•</span>
          <time dateTime={post.pubDate}>{formattedDate}</time>
          <ShareMenu title={post.title} />
        </div>
      </header>

      {/* Cover Image */}
      {post.cover && (
        <div className="fly-post-cover aspect-[21/9] rounded-3xl overflow-hidden bg-[var(--page-alt)] border border-[var(--line)]">
          <ImagePreviewButton imageUrl={post.cover} title={post.title} className="block h-full w-full cursor-zoom-in" />
        </div>
      )}

      {/* Main Body + TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 min-w-0">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--mute)]">标签:</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}/`}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* TOC Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <Toc items={tocItems} />
        </aside>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-[var(--line)] space-y-6">
          <h2 className="text-xl font-bold text-[var(--text)]">相关文章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
