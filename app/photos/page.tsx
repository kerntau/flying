import React from "react";
import { getAllPhotos } from "@/lib/content";
import { PhotosClient } from "./PhotosClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "光影画廊", description: "记录生活中的掠影与微小浪漫，用镜头捕捉瞬间的温度。", path: "/photos/" });

export default function PhotosPage() {
  const photos = getAllPhotos();
  const groups = Array.from(new Set(photos.map((p) => p.group)));

  return (
    <div className="fly-photos-page w-full max-w-6xl mx-auto space-y-8 sm:space-y-10 transition-all duration-350">
      {/* 顶部 Hero Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--page-alt)] via-[var(--page)] to-[var(--page-alt)] p-6 sm:p-8 border border-[var(--line)] shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent)]/10 text-[var(--accent)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              GALLERY & MOMENTS
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[var(--text)]">
              光影画廊
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl">
              记录生活中的掠影与微小浪漫，用镜头捕捉光线流动与瞬间的艺术温度。
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-xl bg-[var(--page)]/80 backdrop-blur-md border border-[var(--line)] shadow-xs text-center">
              <span className="block text-xl font-black text-[var(--accent)]">{photos.length}</span>
              <span className="text-[10px] text-[var(--mute)] font-medium">精选摄影</span>
            </div>
            <div className="px-4 py-3 rounded-xl bg-[var(--page)]/80 backdrop-blur-md border border-[var(--line)] shadow-xs text-center">
              <span className="block text-xl font-black text-[var(--accent)]">{groups.length}</span>
              <span className="text-[10px] text-[var(--mute)] font-medium">主题影集</span>
            </div>
          </div>
        </div>
      </header>

      <PhotosClient photos={photos} />
    </div>
  );
}
