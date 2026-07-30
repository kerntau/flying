import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Tag } from "lucide-react";

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  const paramsSet = new Set<string>();

  tags.forEach((tag) => {
    paramsSet.add(tag.slug);
    paramsSet.add(encodeURIComponent(tag.slug));
  });

  return Array.from(paramsSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  return pageMetadata({
    title: `标签: ${tag}`,
    description: `精准探索标签 ${tag} 下的所有主题文章。`,
    path: `/tags/${slug}/`,
  });
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
    <div className="fly-tag-detail-page w-full space-y-6 sm:space-y-8 transition-all duration-350 select-none">
      {/* 极简通透 Header（完全去除多余 # 符号） */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--line)]/20 pb-3 gap-3">
        {/* 左侧：返回按钮 + 标签大标题 */}
        <div className="flex items-center gap-3">
          <Link
            href="/tags/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1 rounded-lg bg-[var(--page-alt)]/60 hover:bg-[var(--page-alt)] border-0 shrink-0"
          >
            <Icon name="arrow-left" size={13} />
            <span>标签</span>
          </Link>
          <span className="text-[var(--line)] opacity-30 text-xs">/</span>
          <div className="flex items-center gap-2">
            <Tag className="w-4.5 h-4.5 opacity-70 text-[var(--accent)]" />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text)]">
              {decodedSlug}
            </h1>
          </div>
        </div>

        {/* 右侧：标签关联文章篇数统计 */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-70 animate-pulse" />
          <span>共找到 {posts.length} 篇关联文章</span>
        </div>
      </header>

      {/* 5 列卡片网格 */}
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
