import React from "react";
import type { Metadata } from "next";
import "@/globals.css";
import { site } from "@/data/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UIProvider } from "@/components/UIContext";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { SearchDialog } from "@/components/SearchDialog";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s - ${site.title}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <UIProvider>
            <div className="fly-app-shell min-h-screen flex flex-col bg-[var(--page)] text-[var(--text)]">
              <MobileHeader />
              <div className="fly-main-wrapper flex flex-1 w-full">
                <Sidebar />
                <main className="fly-content-area flex-1 min-w-0 transition-all duration-300 md:ml-[var(--sidebar-width)] p-4 sm:p-6 lg:p-8">
                  {children}
                </main>
              </div>
              <Footer />
              <SearchDialog />
            </div>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
