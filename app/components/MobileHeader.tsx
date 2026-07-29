"use client";

import React from "react";
import Link from "next/link";
import { site, navigation, socialLinks } from "@/data/site";
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
          {sidebarCollapsed ? (
            <Icon name="panel-left-open" size={19} />
          ) : (
            <Icon name="panel-left-close" size={19} />
          )}
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
        <SheetContent className="fixed inset-y-0 left-0 z-[110] w-72 bg-[var(--page)] p-5 shadow-2xl flex flex-col justify-between border-r border-[var(--line)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {/* 1. Header 品牌区域 */}
            <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-3">
              <Link className="text-xl font-bold tracking-tight text-[var(--text)] fly-brand-text" href="/" onClick={() => setMobileMenuOpen(false)}>
                {site.title}
              </Link>
              <SheetClose asChild>
                <button className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-[var(--page-alt)] text-[var(--text)] cursor-pointer" aria-label="关闭菜单">
                  <Icon name="x" size={18} />
                </button>
              </SheetClose>
            </div>

            {/* 2. 移动端主导航项 */}
            <nav className="flex flex-col gap-1" aria-label="移动端导航">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm text-[var(--muted)] hover:bg-[var(--page-alt)] hover:text-[var(--text)] transition-colors"
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* 3. 作者简报个人卡片 (充实中段内容，彻底消除空洞留白) */}
            <div className="p-3.5 rounded-xl bg-[var(--page-alt)]/60 border border-[var(--line)]/50 flex items-center gap-3 mt-1">
              <div className="relative shrink-0">
                <img
                  src={site.logo}
                  alt={site.author}
                  className="w-9.5 h-9.5 rounded-full object-cover border border-[var(--line)] shadow-2xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1D9BF0] text-white ring-1.5 ring-[var(--page)]">
                  <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col text-xs min-w-0">
                <span className="font-bold text-[var(--text)] truncate">{site.author}</span>
                <span className="text-[11px] text-[var(--muted)] truncate mt-0.5">{site.description}</span>
              </div>
            </div>
          </div>

          {/* 4. 移动端抽屉底部：社交媒体链接 + 版权 */}
          <div className="flex flex-col gap-3 border-t border-[var(--line)]/60 pt-3.5 mt-4">
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap" aria-label="社交媒体链接">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--hover-bg-color)] border border-[var(--line)]/60 shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Icon name={link.icon} size={15} />
                  </a>
                ))}
              </div>
            )}

            <div className="text-[11px] text-[var(--muted)]">
              © {new Date().getFullYear()} {site.title}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
