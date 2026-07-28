import React from "react";
import { getAllPosts } from "@/lib/content";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(0, 15);

  return (
    <div className="fly-home-page w-full space-y-8 transition-all duration-350">
      {/* 顶部 Hero 精选推荐 Banner 卡片 */}
      {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}

      {/* 最新文章 (5列卡片网格) */}
      <section className="fly-latest-section space-y-4">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xl font-extrabold tracking-tight text-[var(--text)]">最新文章</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4.5">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
