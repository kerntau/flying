import React from "react";
import type { Metadata } from "next";
import "@/globals.css";
import { site } from "@/data/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UIProvider } from "@/components/UIContext";
import { AppShell } from "@/components/AppShell";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s - ${site.title}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: site.title,
    title: site.title,
    description: site.description,
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <UIProvider>
            <TooltipProvider delayDuration={80} skipDelayDuration={300}>
              <AppShell>{children}</AppShell>
            </TooltipProvider>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
