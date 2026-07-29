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
      <head>
        <link rel="dns-prefetch" href="https://cn-font.claude-code-best.win" />
        <link rel="preconnect" href="https://cn-font.claude-code-best.win" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cn-font.claude-code-best.win/packages/lywkpmydb/dist/LXGWWenKaiScreen/result.css"
        />
        <link
          rel="stylesheet"
          href="https://cn-font.claude-code-best.win/packages/xuandongkaishu/dist/XuandongKaishu/result.css"
        />
        <link
          rel="stylesheet"
          href="https://cn-font.claude-code-best.win/packages/hcqyt/dist/ChillRoundFBold/result.css"
        />
        {/* Umami Analytics 网站分析统计 */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="49070c80-b77d-4bab-a6c8-25585348aad1"
        />
        {/* Google Analytics (gtag.js) 统计分析 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q3E0H4KPD3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q3E0H4KPD3');
            `,
          }}
        />
        {/* Google Tag Manager (head) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5SBML8SP');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript body) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5SBML8SP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
