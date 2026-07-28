import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPhotos, getPhotoBySlug } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { ImagePreviewButton } from "@/components/LightboxModal";

interface PhotoDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const photos = getAllPhotos();
  return photos.map((p) => ({ slug: p.slug }));
}

export default async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);

  if (!photo) {
    notFound();
  }

  return (
    <div className="fly-photo-detail max-w-4xl mx-auto space-y-8">
      <Link
        href="/photos/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
      >
        <Icon name="arrow-left" size={16} />
        <span>返回图库</span>
      </Link>

      <div className="rounded-3xl overflow-hidden bg-[var(--page-alt)] border border-[var(--line)] shadow-xl">
        <ImagePreviewButton imageUrl={photo.url} title={photo.title} description={photo.description} className="block w-full cursor-zoom-in bg-black/40" />
        <div className="p-6 space-y-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[var(--page)] text-[var(--accent)]">
            {photo.group}
          </span>
          <h1 className="text-2xl font-bold text-[var(--text)]">{photo.title}</h1>
          {photo.description && <p className="text-sm text-[var(--muted)]">{photo.description}</p>}
          <p className="text-xs text-[var(--mute)] pt-2">拍摄/记录日期: {new Date(photo.date).toLocaleDateString("zh-CN")}</p>
        </div>
      </div>
    </div>
  );
}
