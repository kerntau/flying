import React from "react";
import type { Metadata } from "next";
import "@/globals.css";
import { site } from "@/data/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UIProvider } from "@/components/UIContext";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s - ${site.title}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.title, title: site.title, description: site.description, url: "/", images: [site.logo] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [site.logo] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <UIProvider>
            <AppShell>{children}</AppShell>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
