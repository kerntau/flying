import React from "react";
import { getAllPosts } from "@/lib/content";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { PostCard } from "@/components/PostCard";
import { site } from "@/data/site";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(0, 12);

  return (
    <div className="fly-home-page max-w-6xl mx-auto space-y-10">
      {/* Banner & Hero Header */}
      <section className="fly-hero-banner py-6 flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
          {site.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted)]">{site.subtitle}</p>
      </section>

      {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}

      {/* Recent Posts Grid */}
      <section className="fly-recent-posts space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">最新发布</h2>
          <span className="text-xs text-[var(--mute)]">共 {posts.length} 篇文章</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
