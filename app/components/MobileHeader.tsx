"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navigation, socialLinks } from "@/data/site";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { useUI } from "./UIContext";
import { Sheet, SheetClose, SheetContent } from "./ui/sheet";

export function MobileHeader() {
  const pathname = usePathname();
  const { setSearchOpen, mobileMenuOpen, setMobileMenuOpen, toggleSidebar, sidebarCollapsed } = useUI();

  // 路由变化时自动收起移动端侧栏
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

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
        <SheetContent side="left" className="fixed inset-y-0 left-0 z-[110] w-72 bg-[var(--page)] p-4 sm:p-5 shadow-2xl flex flex-col justify-between border-r border-[var(--line)]/50 select-none overflow-y-auto">
          <div className="flex flex-col gap-4">
            {/* 1. Header 品牌与关闭按钮 (100% 水平物理居中) */}
            <div className="flex items-center justify-between border-b border-[var(--line)]/50 pb-3 h-9">
              <Link
                className="text-lg font-black tracking-tight text-[var(--text)] fly-brand-text flex items-center"
                href="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                {site.title}
              </Link>
              <SheetClose asChild>
                <button
                  type="button"
                  className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-[var(--page-alt)]/80 hover:bg-[var(--line)]/30 text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                  aria-label="关闭菜单"
                >
                  <Icon name="x" size={16} />
                </button>
              </SheetClose>
            </div>

            {/* 2. 移动端主导航项（带当前路由高亮 Pill） */}
            <nav className="flex flex-col gap-1 pt-1" aria-label="移动端导航">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--accent)]/10 text-[var(--accent)] shadow-2xs font-extrabold"
                        : "text-[var(--muted)] hover:bg-[var(--page-alt)] hover:text-[var(--text)]"
                    }`}
                  >
                    <Icon name={item.icon} size={18} className={isActive ? "text-[var(--accent)]" : "opacity-80"} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* 3. 作者简报个人卡片 (蓝 V 居中内联 + 软晶磨砂背景) */}
            <div className="p-3.5 rounded-2xl bg-[var(--page-alt)]/50 border border-[var(--line)]/40 flex items-center gap-3 mt-1 shadow-2xs">
              <img
                src={site.logo}
                alt={site.author}
                className="w-10 h-10 rounded-xl object-cover border border-[var(--line)]/40 shrink-0 shadow-2xs"
              />
              <div className="flex flex-col min-w-0 justify-center gap-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-extrabold text-xs text-[var(--text)] truncate">{site.author}</span>
                  <span
                    title="官方蓝 V 认证"
                    className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#1D9BF0] text-white shrink-0 shadow-2xs"
                  >
                    <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </span>
                </div>
                <span className="text-[11px] text-[var(--muted)] truncate font-medium">{site.description}</span>
              </div>
            </div>
          </div>

          {/* 4. 移动端抽屉底部：社交媒体链接 + 版权 */}
          <div className="flex flex-col gap-2.5 border-t border-[var(--line)]/50 pt-3 mt-4">
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-2" aria-label="社交媒体链接">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--line)]/30 border border-[var(--line)]/40 shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Icon name={link.icon} size={15} />
                  </a>
                ))}
              </div>
            )}

            <div className="text-[11px] font-mono text-[var(--muted)] opacity-75">
              © {new Date().getFullYear()} {site.title}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
