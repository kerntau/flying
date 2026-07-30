import React from "react";
import { getAllPhotos } from "@/lib/content";
import { PhotosClient } from "./PhotosClient";
import { pageMetadata } from "@/lib/seo";
import { Camera, Lock, Sparkles } from "lucide-react";

export const metadata = pageMetadata({
  title: "光影画廊",
  description: "记录生活中的掠影与微小浪漫，用镜头捕捉瞬间的温度。",
  path: "/photos/",
});

export default function PhotosPage() {
  const photos = getAllPhotos();
  const groups = Array.from(new Set(photos.map((p) => p.group)));

  return (
    <div className="fly-photos-page w-full space-y-6 sm:space-y-8 py-4 pb-16 transition-all duration-350 select-none">
      {/* 极简清爽 Header */}
      <header className="flex items-center justify-between border-b border-[var(--line)]/20 pb-4">
        {/* 左侧：标准清爽中文大标题 */}
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-[var(--accent)] opacity-80" />
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">
            光影画廊
          </h1>
        </div>

        {/* 右侧：统计概览轻标 */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--muted)] font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>功能研发中</span>
        </div>
      </header>

      {/* 照片画廊容器（带有高斯模糊“暂未开放 正在研发中”悬浮遮罩） */}
      <div className="relative min-h-[420px] rounded-3xl overflow-hidden">
        {/* 底层高斯模糊主体内容 */}
        <div className="blur-md opacity-35 pointer-events-none select-none filter">
          <PhotosClient photos={photos} />
        </div>

        {/* 上层高级水墨“暂未开放 正在研发中”悬浮遮罩 */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-[var(--page)]/60 backdrop-blur-md rounded-3xl">
          <div className="space-y-4 max-w-md flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            {/* 图标徽章 */}
            <div className="w-14 h-14 rounded-2xl bg-[var(--page-alt)] border border-[var(--line)]/40 flex items-center justify-center text-[var(--accent)] shadow-md">
              <Lock className="w-6 h-6 opacity-85" />
            </div>

            {/* 标题 */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[var(--accent)]/10 text-[var(--accent)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>UNDER DEVELOPMENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)] pt-1">
                暂未开放 · 正在研发中
              </h2>
            </div>

            {/* 描述 */}
            <p className="text-xs sm:text-sm font-medium text-[var(--muted)] leading-relaxed">
              光影画廊与高级照片缩放功能正在倾力研发与细节调优中，敬请期待后续上线。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
