"use client";

import React from "react";
import Link from "next/link";
import { site, navigation } from "@/data/site";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { useUI } from "./UIContext";
import { Sheet, SheetClose, SheetContent } from "./ui/sheet";

export function MobileHeader() {
  const { setSearchOpen, mobileMenuOpen, setMobileMenuOpen, toggleSidebar, sidebarCollapsed } = useUI();

  return (
    <header className="fly-mobile-header">
      {/* 左侧：品牌区域 */}
      <div className="fly-navbar-brand">
        {/* 桌面端 ≥1200px：侧栏折叠/展开按钮 */}
        <button
          className="fly-icon-button fly-sidebar-collapse-button"
          type="button"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "展开侧栏" : "收缩侧栏"}
          aria-expanded={!sidebarCollapsed}
          aria-controls="fly-site-sidebar"
        >
          <Icon name="menu" size={20} />
        </button>

        {/* 移动端 <1200px：菜单打开按钮 */}
        <button
          className="fly-icon-button fly-menu-button"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="打开菜单"
          aria-expanded={mobileMenuOpen}
          aria-controls="fly-navigation-popup"
        >
          <Icon name="menu" size={20} />
        </button>

        <Link className="fly-brand fly-brand--mobile fly-brand-text" href="/">
          {site.title}
        </Link>
      </div>

      {/* 中间：搜索栏 */}
      <button
        className="fly-navbar-search"
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label="搜索文章"
      >
        <Icon name="search" className="fly-search-icon" size={16} />
        <span className="fly-search-placeholder">搜索文章</span>
        <kbd aria-hidden="true">/</kbd>
      </button>

      {/* 右侧：主题切换 */}
      <div className="flex items-center justify-end justify-self-end">
        <ThemeToggle />
      </div>

      {/* 移动端菜单抽屉 Panel */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent className="fixed inset-y-0 left-0 z-[110] w-72 bg-[var(--page)] p-6 shadow-2xl flex flex-col justify-between border-r border-[var(--line)]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <Link className="text-xl font-bold tracking-tight text-[var(--text)] fly-brand-text" href="/" onClick={() => setMobileMenuOpen(false)}>
                {site.title}
              </Link>
              <SheetClose asChild>
                <button className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-[var(--page-alt)] text-[var(--text)]" aria-label="关闭菜单">
                  <Icon name="x" size={18} />
                </button>
              </SheetClose>
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="移动端导航">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-[var(--muted)] hover:bg-[var(--page-alt)] hover:text-[var(--text)] transition-colors"
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-xs text-[var(--mute)] border-t border-[var(--line)] pt-4">
            © {new Date().getFullYear()} {site.title}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
