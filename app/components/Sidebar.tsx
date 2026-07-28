"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navigation, socialLinks } from "@/data/site";
import { Icon } from "./Icon";
import { useUI } from "./UIContext";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUI();

  // 动态 Tip 视口定位状态 (完全复刻 Legacy sidebar-tip.js 算法)
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
    setTipState({
      text,
      visible: true,
      top,
      left,
    });
  };

  const handleMouseLeave = () => {
    setTipState((prev) => ({ ...prev, visible: false }));
  };

  // 在折叠状态改变时自动关闭 Tooltip
  useEffect(() => {
    setTipState((prev) => ({ ...prev, visible: false }));
  }, [sidebarCollapsed]);

  return (
    <>
      <aside
        id="fly-site-sidebar"
        className={`fly-site-sidebar ${
          sidebarCollapsed ? "fly-site-sidebar--collapsed" : "fly-site-sidebar--static"
        } fixed left-0 top-0 bottom-0 z-30 flex flex-col justify-between border-r border-[var(--line)] bg-[var(--page)] hidden md:flex`}
        style={{
          width: sidebarCollapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
        }}
        aria-label="站点导航"
      >
        <div className="fly-sidebar-inner flex flex-col gap-8">
          <div className={`fly-sidebar-brand flex h-10 items-center ${sidebarCollapsed ? "justify-center" : "gap-3"}`}>
            <button
              className="fly-sidebar-toggle fly-icon-button h-9 w-9 shrink-0 rounded-lg hover:bg-[var(--page-alt)] active:scale-95 transition-all duration-200"
              type="button"
              onClick={toggleSidebar}
              onMouseEnter={(e) => handleMouseEnter(e, sidebarCollapsed ? "展开侧栏" : "收缩侧栏")}
              onMouseLeave={handleMouseLeave}
              aria-label={sidebarCollapsed ? "展开侧栏" : "收缩侧栏"}
              aria-expanded={!sidebarCollapsed}
              aria-controls="fly-site-sidebar"
              data-fly-tip={sidebarCollapsed ? "展开侧栏" : "收缩侧栏"}
            >
              <div className="transition-transform duration-300 hover:rotate-12">
                <Icon name={sidebarCollapsed ? "panel-left-open" : "panel-left-close"} size={19} />
              </div>
            </button>
            <div
              className={`fly-sidebar-fade-text flex items-center origin-bottom-left ${
                sidebarCollapsed ? "max-w-0 opacity-0 -translate-x-2 translate-y-1 scale-95 pointer-events-none" : "max-w-[200px] opacity-100 translate-x-0 translate-y-0 scale-100"
              }`}
            >
              <Link className="fly-brand text-xl font-bold tracking-tight text-[var(--text)] whitespace-nowrap" href="/">
                {site.title}
              </Link>
            </div>
          </div>

          <nav className="fly-sidebar-nav flex flex-col gap-2" aria-label="主导航">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  className={`fly-sidebar-link group relative flex items-center transition-colors ${
                    sidebarCollapsed ? "justify-center !px-0 !w-[38px]" : ""
                  } ${
                    isActive
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                      : "text-[var(--muted)] hover:bg-[var(--page-alt)] hover:text-[var(--text)]"
                  }`}
                  href={item.href}
                  aria-label={item.label}
                  data-fly-tip={item.label}
                  onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <Icon name={item.icon} size={18} className="fly-menu-icon" />
                  </div>
                  <div
                    className={`fly-sidebar-fade-text origin-bottom-left ${
                      sidebarCollapsed ? "max-w-0 opacity-0 -translate-x-2 translate-y-1 scale-95 pointer-events-none" : "max-w-[150px] opacity-100 translate-x-0 translate-y-0 scale-100"
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
                data-fly-tip={link.label}
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

      {/* 原生 Legacy 动态定位 Tooltip 浮层 */}
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
