import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  const params = tags.map((tag) => ({ slug: tag.slug }));
  return process.env.NODE_ENV === "development"
    ? [...params, ...tags.map((tag) => ({ slug: encodeURIComponent(tag.slug) }))]
    : params;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  return pageMetadata({
    title: `标签: ${tag}`,
    description: `浏览 ${tag} 标签下的技术文章。`,
    path: `/tags/${slug}/`,
  });
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = getAllPosts().filter((post) => post.tags.some((tag) => tag === slug || tag === decodedSlug));

  if (posts.length === 0) notFound();

  return (
    <div className="fly-tag-detail-page w-full space-y-6 pb-8 sm:space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="min-w-0">
          <Link href="/tags/" className="mb-3 inline-flex items-center gap-1 text-xs text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
            返回标签
          </Link>
          <h1 className="truncate text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">#{decodedSlug}</h1>
        </div>
        <span className="shrink-0 text-xs font-mono text-[var(--muted)]">{posts.length} 篇文章</span>
      </header>

      <section aria-labelledby="tag-posts-title">
        <h2 id="tag-posts-title" className="sr-only">#{decodedSlug} 的文章</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>
    </div>
  );
}
