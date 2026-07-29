import React from "react";
import { getAllPosts, getAllCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ArchiveClient } from "./ArchiveClient";

export const metadata = pageMetadata({
  title: "文章归档",
  description: "按时间轴与维度深度浏览所有历史文章、年度字数统计与创作历程。",
  path: "/archives/",
});

export default function ArchivesPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return <ArchiveClient initialPosts={posts} categories={categories} />;
}
