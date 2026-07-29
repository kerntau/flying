import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPhotos, getPhotoBySlug } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { ImagePreviewButton } from "@/components/LightboxModal";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

interface PhotoDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const photos = getAllPhotos();
  return photos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PhotoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);
  return photo ? pageMetadata({ title: photo.title, description: photo.description, path: `/photos/${photo.slug}/`, image: photo.url }) : {};
}

export default async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);

  if (!photo) {
    notFound();
  }

  return (
    <div className="fly-photo-detail w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 transition-all duration-350">
      <Link
        href="/photos/"
        className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--page-alt)] border border-[var(--line)]"
      >
        <Icon name="arrow-left" size={14} />
        <span>返回图库画廊</span>
      </Link>

      <div className="rounded-3xl overflow-hidden bg-[var(--page)] border border-[var(--line)] shadow-lg transition-all">
        <div className="relative w-full bg-black/40 overflow-hidden group">
          <ImagePreviewButton imageUrl={photo.url} title={photo.title} description={photo.description} className="block w-full cursor-zoom-in" />
        </div>
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 text-xs font-extrabold rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
              {photo.group}
            </span>
            <time className="text-xs font-mono text-[var(--mute)]">
              记录日期: {new Date(photo.date).toLocaleDateString("zh-CN")}
            </time>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)]">{photo.title}</h1>
            {photo.description && <p className="text-sm text-[var(--muted)] leading-relaxed">{photo.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
