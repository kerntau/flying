import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return pageMetadata({ title: `分类: ${category}`, description: `深度阅读分类 ${category} 下的专业文章。`, path: `/categories/${slug}/` });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = getAllPosts().filter(
    (p) => p.category === slug || p.category === decodedSlug
  );

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="fly-category-detail-page w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 transition-all duration-350">
      {/* 顶部分类 Banner */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--page-alt)] via-[var(--page)] to-[var(--page-alt)] p-6 sm:p-8 border border-[var(--line)] shadow-xs space-y-4">
        <Link
          href="/categories/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--page)] border border-[var(--line)]"
        >
          <Icon name="arrow-left" size={14} />
          <span>返回全部分类</span>
        </Link>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] tracking-wider uppercase">
            <span>CATEGORY ARCHIVE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--text)]">
            {decodedSlug}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            收录 {posts.length} 篇精选主题文章
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
