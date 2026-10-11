import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params = categories.map((category) => ({ slug: category.slug }));
  return process.env.NODE_ENV === "development"
    ? [...params, ...categories.map((category) => ({ slug: encodeURIComponent(category.slug) }))]
    : params;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return pageMetadata({
    title: `分类: ${category}`,
    description: `浏览 ${category} 分类下的技术文章。`,
    path: `/categories/${slug}/`,
  });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = getAllPosts().filter((post) => post.category === slug || post.category === decodedSlug);

  if (posts.length === 0) notFound();

  return (
    <div className="fly-category-detail-page w-full space-y-6 pb-8 sm:space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="min-w-0">
          <Link href="/categories/" className="mb-3 inline-flex items-center gap-1 text-xs text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
            返回分类
          </Link>
          <h1 className="truncate text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">{decodedSlug}</h1>
        </div>
        <span className="shrink-0 text-xs font-mono text-[var(--muted)]">{posts.length} 篇文章</span>
      </header>

      <section aria-labelledby="category-posts-title">
        <h2 id="category-posts-title" className="sr-only">{decodedSlug} 的文章</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>
    </div>
  );
}
