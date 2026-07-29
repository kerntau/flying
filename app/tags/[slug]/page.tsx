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
  return pageMetadata({ title: `标签: #${tag}`, description: `精准探索标签 #${tag} 下的所有主题文章。`, path: `/tags/${slug}/` });
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
    <div className="fly-tag-detail-page w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 transition-all duration-350">
      {/* 顶部标签 Banner */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--page-alt)] via-[var(--page)] to-[var(--page-alt)] p-6 sm:p-8 border border-[var(--line)] shadow-xs space-y-4">
        <Link
          href="/tags/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--page)] border border-[var(--line)]"
        >
          <Icon name="arrow-left" size={14} />
          <span>返回全部标签</span>
        </Link>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] tracking-wider uppercase">
            <span>TAGGED ARTICLES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--text)]">
            #{decodedSlug}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            找到 {posts.length} 篇相关文章
          </p>
        </div>
      </header>

      {/* 5 列卡片网格 (与首页保持 100% 视觉与移动端适配一致) */}
      <section className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4.5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
