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

export function AppShell({ children }: { children: React.ReactNode }) {
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
      </div>
    </ViewTransitionsProvider>
  );
}
