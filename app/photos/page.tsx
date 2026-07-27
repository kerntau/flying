import React from "react";
import { getAllPhotos } from "@/lib/content";
import { PhotosClient } from "./PhotosClient";

export default function PhotosPage() {
  const photos = getAllPhotos();

  return (
    <div className="fly-photos-page max-w-6xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">光影画廊</h1>
        <p className="text-sm text-[var(--muted)]">记录生活中的掠影与微小浪漫，共计 {photos.length} 张照相</p>
      </header>

      <PhotosClient photos={photos} />
    </div>
  );
}
