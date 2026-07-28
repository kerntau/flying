"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UIContextType {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

const COLLAPSED_STORAGE_KEY = "flying-sidebar-collapsed";

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 初始化读取 localStorage 并同步给 document.body
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLLAPSED_STORAGE_KEY);
      if (stored === "true") {
        setSidebarCollapsed(true);
        document.body.dataset.flySidebarCollapsed = "true";
      } else {
        document.body.dataset.flySidebarCollapsed = "false";
      }
    } catch (_e) {
      document.body.dataset.flySidebarCollapsed = "false";
    }
  }, []);

  // 状态变更时实时同步给 localStorage 和 document.body
  const handleSetSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    try {
      localStorage.setItem(COLLAPSED_STORAGE_KEY, collapsed ? "true" : "false");
    } catch (_e) {}
    document.body.dataset.flySidebarCollapsed = collapsed ? "true" : "false";
  };

  const toggleSidebar = () => {
    handleSetSidebarCollapsed(!sidebarCollapsed);
  };

  // 监听全局 / 键快捷唤醒搜索
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <UIContext.Provider
      value={{
        searchOpen,
        setSearchOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        sidebarCollapsed,
        setSidebarCollapsed: handleSetSidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
}
