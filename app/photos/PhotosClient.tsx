"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Photo } from "@/lib/types";
import { LightboxModal } from "@/components/LightboxModal";

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
    <div className="space-y-8">
      {/* 组别筛选 Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-4">
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              selectedGroup === group
                ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                : "bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* 照片 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.slug}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--page-alt)] border border-[var(--line)] cursor-pointer"
            onClick={() => setActivePhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-300">
                {photo.group}
              </span>
              <h3 className="font-bold text-sm truncate">{photo.title}</h3>
              {photo.description && <p className="text-xs text-gray-200 line-clamp-1">{photo.description}</p>}
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
