"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Photo } from "@/lib/types";
import { LightboxModal } from "@/components/LightboxModal";
import { Icon } from "@/components/Icon";

interface PhotosClientProps {
  photos: Photo[];
}

export function PhotosClient({ photos }: PhotosClientProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("全部");
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  const groups = ["全部", ...Array.from(new Set(photos.map((p) => p.group)))];

  const filteredPhotos = selectedGroup === "全部"
    ? photos
    : photos.filter((p) => p.group === selectedGroup);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 组别筛选 Tabs (无边框线极简胶囊) */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[var(--page-alt)]/60 border-0 max-w-max">
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all duration-300 ${
              selectedGroup === group
                ? "bg-[var(--text)] text-[var(--page)] shadow-xs"
                : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)]"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* 照片 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.slug}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--page-alt)] border-0 shadow-2xs hover:shadow-xl transition-all duration-500 cursor-pointer"
            onClick={() => setActivePhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />

            {/* 悬浮黑色渐变蒙层 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 text-white">
              <div className="flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Icon name="search" size={14} />
                </span>
              </div>

              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md text-gray-200">
                  {photo.group}
                </span>
                <h3 className="font-extrabold text-base truncate">{photo.title}</h3>
                {photo.description && <p className="text-xs text-gray-300 line-clamp-1 opacity-90">{photo.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox 弹窗 */}
      {activePhoto && (
        <LightboxModal
          open={!!activePhoto}
          onOpenChange={(open) => !open && setActivePhoto(null)}
          imageUrl={activePhoto.url}
          title={activePhoto.title}
          description={activePhoto.description}
        />
      )}
    </div>
  );
}

