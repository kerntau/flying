import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMetadata({ title, description = site.description, path, image = site.logo, type = "website" }: { title: string; description?: string; path: string; image?: string; type?: "website" | "article" }): Metadata {
  const canonical = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type, siteName: site.title, title: `${title} - ${site.title}`, description, url: canonical, images: [image] },
    twitter: { card: "summary_large_image", title: `${title} - ${site.title}`, description, images: [image] },
  };
}
