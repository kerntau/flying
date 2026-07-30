import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthors, getAuthorBySlug, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { Icon } from "@/components/Icon";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

interface AuthorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const authors = getAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: AuthorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  return author ? pageMetadata({ title: author.name, description: author.bio, path: `/authors/${author.slug}/`, image: author.avatar }) : {};
}

export default async function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = getAllPosts().filter((p) => p.author.toLowerCase() === author.name.toLowerCase() || p.author.toLowerCase() === author.slug.toLowerCase());

  return (
    <div className="fly-author-detail-page w-full space-y-10">
      <header className="p-8 rounded-3xl bg-[var(--page-alt)] border border-[var(--line)] space-y-4">
        <Link
          href="/authors/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-2"
        >
          <Icon name="arrow-left" size={16} />
          <span>返回作者列表</span>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[var(--accent)]"
          />
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">{author.name}</h1>
            <p className="text-xs text-[var(--mute)]">@{author.slug}</p>
            <p className="text-sm text-[var(--muted)] max-w-2xl pt-1">{author.bio}</p>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[var(--text)]">发表的文章 ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="text-sm text-[var(--mute)]">该作者暂未发表文章。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
