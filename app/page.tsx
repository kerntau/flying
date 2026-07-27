import React from "react";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "@/lib/content";
import { generateRssFeed } from "@/lib/rss";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { PostCard } from "@/components/PostCard";
import { site } from "@/data/site";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(0, 12);

  // 在构建生成首页时同步生成离线 search-index.json 和 rss.xml
  try {
    generateRssFeed();

    const searchData = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.description,
    }));
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(path.join(publicDir, "search-index.json"), JSON.stringify(searchData), "utf8");
  } catch (err) {
    console.error("静态索引生成失败", err);
  }

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
