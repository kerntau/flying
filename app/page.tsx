import React from "react";
import { getAllPosts } from "@/lib/content";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(0, 12);

  return (
    <div className="fly-home-page w-full max-w-7xl space-y-10 transition-all duration-350">
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
