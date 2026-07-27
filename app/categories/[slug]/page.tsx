import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";

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
    <div className="fly-category-detail-page max-w-6xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6 space-y-2">
        <Link
          href="/categories/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-2"
        >
          <Icon name="arrow-left" size={16} />
          <span>返回分类列表</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-[var(--text)]">分类: {decodedSlug}</h1>
        <p className="text-sm text-[var(--muted)]">该分类下共有 {posts.length} 篇文章</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
