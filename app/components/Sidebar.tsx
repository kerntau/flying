"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navigation, socialLinks } from "@/data/site";
import { Icon } from "./Icon";
import { useUI } from "./UIContext";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed } = useUI();

  // 动态 Tip 视口定位状态
  const [tipState, setTipState] = useState<{
    text: string;
    visible: boolean;
    top: number;
    left: number;
  }>({ text: "", visible: false, top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, text: string) => {
    if (!sidebarCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const left = rect.right + 10;
    const top = rect.top + rect.height / 2;
    setTipState({ text, visible: true, top, left });
  };

  const handleMouseLeave = () => {
    setTipState((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    setTipState((prev) => ({ ...prev, visible: false }));
  }, [sidebarCollapsed]);

  return (
    <>
      <aside
        id="fly-site-sidebar"
        className={`fly-site-sidebar ${
          sidebarCollapsed ? "fly-site-sidebar--collapsed" : "fly-site-sidebar--static"
        } fixed left-0 top-[var(--navbar-height)] bottom-0 z-30 flex flex-col justify-between border-r border-[var(--line)] bg-[var(--page)] hidden md:flex py-4`}
        style={{
          width: sidebarCollapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
        }}
        aria-label="站点导航"
      >
        <div className="fly-sidebar-inner flex flex-col gap-4">
          <nav className="fly-sidebar-nav flex flex-col gap-1" aria-label="主导航">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  className={`group relative flex items-center gap-3 transition-all duration-200 ease-out rounded-xl ${
                    sidebarCollapsed ? "justify-center !px-0 !w-[38px] h-9" : "px-3 py-2 h-9.5"
                  } ${
                    isActive
                      ? "bg-black/[0.04] dark:bg-white/[0.06] text-[var(--text)] font-semibold"
                      : "text-[var(--muted)] hover:bg-black/[0.025] dark:hover:bg-white/[0.04] hover:text-[var(--text)] font-medium"
                  }`}
                  href={item.href}
                  aria-label={item.label}
                  onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={18} />
                  </div>
                  <div
                    className={`fly-sidebar-fade-text origin-bottom-left ${
                      sidebarCollapsed
                        ? "max-w-0 opacity-0 -translate-x-2 translate-y-1 scale-95 pointer-events-none"
                        : "max-w-[150px] opacity-100 translate-x-0 translate-y-0 scale-100"
                    }`}
                  >
                    <span className="fly-nav-label text-sm whitespace-nowrap">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <footer className="fly-sidebar-socials flex flex-col gap-4 overflow-hidden origin-bottom-left transition-all duration-300">
          <div className={`fly-social-icons flex items-center ${sidebarCollapsed ? "flex-col gap-1 justify-center" : "gap-0.5"}`}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="fly-social-icon group relative flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-all duration-200 hover:scale-105"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener" : undefined}
                aria-label={link.label}
                onMouseEnter={(e) => handleMouseEnter(e, link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon name={link.icon} size={18} />
              </a>
            ))}
          </div>
          <div
            className={`fly-sidebar-fade-text origin-bottom-left ${
              sidebarCollapsed ? "max-w-0 opacity-0 -translate-x-2 translate-y-1 scale-95 pointer-events-none" : "max-w-[200px] opacity-100 translate-x-0 translate-y-0 scale-100"
            }`}
          >
            <p className="fly-footer-copyright text-xs text-[var(--mute)] whitespace-nowrap">
              © {new Date().getFullYear()} {site.title}
            </p>
          </div>
        </footer>
      </aside>

      {/* 动态定位 Tooltip 浮层 */}
      {sidebarCollapsed && (
        <div
          className={`fly-sidebar-tip fixed z-50 pointer-events-none whitespace-nowrap bg-[var(--text)] text-[var(--page)] text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-lg transition-all duration-200 ${
            tipState.visible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-1 scale-95"
          }`}
          style={{
            top: `${tipState.top}px`,
            left: `${tipState.left}px`,
            transform: "translateY(-50%)",
          }}
          role="tooltip"
          aria-hidden={!tipState.visible}
        >
          {tipState.text}
        </div>
      )}
    </>
  );
}
