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
    <header className="fly-mobile-header sticky top-0 z-40 flex h-[var(--navbar-height)] items-center justify-between px-4 sm:px-6 bg-[var(--page)]/80 backdrop-blur-md border-b border-[var(--line)] w-full">
      {/* 左侧：精确渲染单图标按钮 (桌面端为侧栏开关，移动端为菜单开关) + 品牌标题 */}
      <div className="flex items-center gap-2 min-w-0">
        {/* 桌面端：只渲染 1 个侧栏收缩/展开图标 */}
        <button
          className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--page-alt)] text-[var(--text)] active:scale-95 transition-all duration-200"
          type="button"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "展开侧栏" : "收缩侧栏"}
          title={sidebarCollapsed ? "展开侧栏" : "收缩侧栏"}
        >
          <Icon name={sidebarCollapsed ? "panel-left-open" : "panel-left-close"} size={18} />
        </button>

        {/* 移动端：只渲染 1 个三条杠菜单图标 */}
        <button
          className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--page-alt)] text-[var(--text)] active:scale-95 transition-colors"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="打开导航菜单"
        >
          <Icon name="menu" size={20} />
        </button>

        <Link className="text-base sm:text-lg font-bold tracking-tight text-[var(--text)] truncate" href="/">
          {site.title}
        </Link>
      </div>

      {/* 中间：全局搜索框 */}
      <div className="flex-1 max-w-[424px] mx-4 hidden md:block">
        <button
          className="relative flex w-full h-10 items-center justify-between px-4 rounded-xl bg-[var(--page-alt)] text-sm font-medium text-[var(--faint)] hover:bg-[var(--hover-bg-color)] hover:text-[var(--text)] transition-all duration-200 cursor-pointer border border-transparent focus-visible:border-[var(--accent)]"
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="搜索文章"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Icon name="search" size={16} className="text-[var(--faint)] shrink-0" />
            <span className="truncate text-xs sm:text-sm">搜索文章...</span>
          </div>
          <kbd className="inline-flex h-5 items-center rounded border border-[var(--line)] bg-[var(--page)] px-1.5 font-mono text-[11px] font-semibold text-[var(--muted)] shadow-xs">
            /
          </kbd>
        </button>
      </div>

      {/* 右侧：移动端搜索图标按钮 + 主题切换器 */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="搜索文章"
        >
          <Icon name="search" size={16} />
        </button>

        <ThemeToggle />
      </div>

      {/* 移动端菜单抽屉 Panel */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent className="fixed inset-y-0 left-0 z-50 w-72 bg-[var(--page)] p-6 shadow-2xl flex flex-col justify-between border-r border-[var(--line)]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <Link className="text-xl font-bold tracking-tight text-[var(--text)]" href="/" onClick={() => setMobileMenuOpen(false)}>
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
