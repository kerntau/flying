"use client";

import React from "react";
import { Footer } from "./Footer";
import { MobileHeader } from "./MobileHeader";
import { SearchDialog } from "./SearchDialog";
import { Sidebar } from "./Sidebar";
import { ExternalLinkModal } from "./ExternalLinkModal";
import { PetCompanionHost } from "./pets/PetCompanionHost";
import { PageTransition } from "./PageTransition";
import { ViewTransitionsProvider } from "./ViewTransitionsProvider";

import { WebVitals } from "@/components/WebVitals";

export function AppShell({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // 在 F12 控制台输出极简精致的版权与品牌彩蛋
      console.log(
        "%c ✦ Theme Flying · 序栈 %c https://curn.me \n%c 在有序的世界里，寻一处生活的归栈。\n%c Powered by Next.js 16 & React 19 | Designed with ❤️ by Kerntau",
        "color: #ffffff; background: #0284c7; padding: 4px 10px; border-radius: 6px 0 0 6px; font-weight: bold; font-family: sans-serif; font-size: 12px;",
        "color: #0284c7; background: rgba(2, 132, 199, 0.12); padding: 4px 10px; border-radius: 0 6px 6px 0; font-weight: bold; font-family: monospace; font-size: 12px;",
        "color: #525866; font-size: 12px; line-height: 2; font-family: 'LXGW WenKai Screen', serif; font-style: italic;",
        "color: #a0a7b8; font-size: 11px; line-height: 1.5; font-family: monospace;"
      );

      if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js").catch(() => {});
        });
      }
    }
  }, []);

  return (
    <ViewTransitionsProvider>
      <div className="fly-app-shell min-h-screen flex flex-col bg-[var(--page)] text-[var(--text)]">
        <MobileHeader />
        <div className="fly-main-wrapper flex flex-1 w-full">
          <Sidebar />
          <div className="fly-site-main flex-1 min-w-0 flex flex-col">
            <main className="fly-content-area flex-1 p-3.5 sm:p-5 lg:p-6 flex flex-col min-w-0">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </div>
        <SearchDialog />
        <ExternalLinkModal />
        <PetCompanionHost />
        <WebVitals />
      </div>
    </ViewTransitionsProvider>
  );
}
