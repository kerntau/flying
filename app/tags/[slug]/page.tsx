import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  return pageMetadata({ title: `标签: #${tag}`, description: `浏览标签 ${tag} 下的文章。`, path: `/tags/${slug}/` });
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = getAllPosts().filter((p) =>
    p.tags.some((t) => t === slug || t === decodedSlug)
  );

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="fly-tag-detail-page max-w-6xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6 space-y-2">
        <Link
          href="/tags/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-2"
        >
          <Icon name="arrow-left" size={16} />
          <span>返回标签列表</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-[var(--text)]">标签: #{decodedSlug}</h1>
        <p className="text-sm text-[var(--muted)]">共有 {posts.length} 篇相关文章</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
