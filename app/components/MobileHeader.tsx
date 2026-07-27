"use client";

import React from "react";
import Link from "next/link";
import { site, navigation } from "@/data/site";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { useUI } from "./UIContext";
import * as Dialog from "@radix-ui/react-dialog";

export function MobileHeader() {
  const { setSearchOpen, mobileMenuOpen, setMobileMenuOpen, toggleSidebar } = useUI();

  return (
    <header className="fly-mobile-header sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[var(--page)]/80 backdrop-blur-md border-b border-[var(--line)] md:hidden">
      <div className="fly-navbar-brand flex items-center gap-2">
        <button
          className="fly-icon-button p-2"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="切换菜单"
        >
          <Icon name="menu" size={20} />
        </button>
        <Link className="fly-brand text-lg font-bold text-[var(--text)]" href="/">
          {site.title}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="fly-navbar-search flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--page-alt)] text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="搜索文章"
        >
          <Icon name="search" size={14} />
          <span>搜索</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--page)] text-[10px] border border-[var(--line)]">/</kbd>
        </button>

        <ThemeToggle />
      </div>

      {/* 移动端菜单弹窗 - 使用 Radix Dialog 原语 */}
      <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-64 bg-[var(--page)] p-6 shadow-xl flex flex-col justify-between border-r border-[var(--line)]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <Link className="text-xl font-bold text-[var(--text)]" href="/" onClick={() => setMobileMenuOpen(false)}>
                  {site.title}
                </Link>
                <Dialog.Close asChild>
                  <button className="fly-icon-button p-1" aria-label="关闭菜单">
                    <Icon name="x" size={20} />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-[var(--muted)] hover:bg-[var(--page-alt)] hover:text-[var(--text)] transition-colors"
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="text-xs text-[var(--mute)]">
              © {new Date().getFullYear()} {site.title}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
