import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Folder } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const paramsSet = new Set<string>();

  categories.forEach((cat) => {
    paramsSet.add(cat.slug);
    paramsSet.add(encodeURIComponent(cat.slug));
  });

  return Array.from(paramsSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return pageMetadata({
    title: `分类: ${category}`,
    description: `深度阅读分类 ${category} 下的专业文章。`,
    path: `/categories/${slug}/`,
  });
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
    <div className="fly-category-detail-page w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 transition-all duration-350 select-none">
      {/* 极简通透 Header（彻底取消突兀边框大盒子） */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--line)]/20 pb-3 gap-3">
        {/* 左侧：返回按钮 + 分类大标题 */}
        <div className="flex items-center gap-3">
          <Link
            href="/categories/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1 rounded-lg bg-[var(--page-alt)]/60 hover:bg-[var(--page-alt)] border-0 shrink-0"
          >
            <Icon name="arrow-left" size={13} />
            <span>分类</span>
          </Link>
          <span className="text-[var(--line)] opacity-30 text-xs">/</span>
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-blue-500 opacity-80" />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text)]">
              {decodedSlug}
            </h1>
          </div>
        </div>

        {/* 右侧：精选文章篇数统计 */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-70 animate-pulse" />
          <span>共收录 {posts.length} 篇主题文章</span>
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
