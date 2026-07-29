import React from "react";
import { getAllPhotos } from "@/lib/content";
import { PhotosClient } from "./PhotosClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "光影画廊", description: "记录生活中的掠影与微小浪漫，用镜头捕捉瞬间的温度。", path: "/photos/" });

export default function PhotosPage() {
  const photos = getAllPhotos();
  const groups = Array.from(new Set(photos.map((p) => p.group)));

  return (
    <div className="fly-photos-page w-full space-y-12 transition-all duration-350 pb-16">
      {/* 顶部超大排版 Hero 区 */}
      <header className="relative flex flex-col items-center justify-center py-24 overflow-hidden rounded-3xl bg-[var(--page-alt)] border border-[var(--line)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-[var(--page)] text-[var(--text)] border border-[var(--line)] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Gallery & Moments
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-[var(--text)]">
            光影画廊
          </h1>
          <p className="text-sm sm:text-base font-medium text-[var(--muted)] max-w-xl">
            记录生活中的掠影与微小浪漫，用镜头捕捉光线流动与瞬间的艺术温度。<br/>
            当前收录 {photos.length} 张相片，分为 {groups.length} 个独立影集。
          </p>
        </div>
        
        {/* 背景大字 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-black tracking-tighter text-[var(--line)] opacity-20 pointer-events-none select-none mix-blend-overlay">
          GALLERY
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <PhotosClient photos={photos} />
      </div>
    </div>
  );
}
