"use client";

import React from "react";
import { Footer } from "./Footer";
import { MobileHeader } from "./MobileHeader";
import { SearchDialog } from "./SearchDialog";
import { Sidebar } from "./Sidebar";
import { useUI } from "./UIContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useUI();

  return (
    <div
      className={`fly-app-shell min-h-screen flex flex-col bg-[var(--page)] text-[var(--text)] ${
        sidebarCollapsed ? "fly-app-shell--sidebar-collapsed" : ""
      }`}
    >
      <MobileHeader />
      <div className="fly-main-wrapper flex flex-1 w-full">
        <Sidebar />
        <main className="fly-content-area flex-1 min-w-0 transition-[margin] duration-300 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <Footer />
      <SearchDialog />
    </div>
  );
}
