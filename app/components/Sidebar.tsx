"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navigation, socialLinks } from "@/data/site";
import { Icon } from "./Icon";
import { useUI } from "./UIContext";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed } = useUI();
  const sidebarRef = useRef<HTMLElement>(null);

  // Tooltip 状态（原版 fly-sidebar-tip：fixed 定位 + data-fly-visible）
  const [tipState, setTipState] = useState<{
    text: string;
    visible: boolean;
    top: number;
    left: number;
  }>({ text: "", visible: false, top: 0, left: 0 });

  // 判断是否处于折叠模式（≥768px 且 <1200px 始终折叠，≥1200px 由 sidebarCollapsed 控制）
  const isCollapsedMode = useCallback(() => {
    if (typeof window === "undefined") return false;
    if (window.innerWidth < 1200) return true;
    return sidebarCollapsed;
  }, [sidebarCollapsed]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>, text: string) => {
      if (!isCollapsedMode()) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setTipState({
        text,
        visible: true,
        top: rect.top + rect.height / 2,
        left: rect.right + 10,
      });
    },
    [isCollapsedMode]
  );

  const handleMouseLeave = useCallback(() => {
    setTipState((prev) => ({ ...prev, visible: false }));
  }, []);

  // 折叠状态切换时清除 tooltip
  useEffect(() => {
    setTipState((prev) => ({ ...prev, visible: false }));
  }, [sidebarCollapsed]);

  return (
    <>
      <aside
        id="fly-site-sidebar"
        ref={sidebarRef}
        className="fly-site-sidebar fly-site-sidebar--static fixed left-0 top-[var(--navbar-height)] bottom-0 z-30 flex-col justify-between hidden md:flex"
        style={{
          width: sidebarCollapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
        }}
        aria-label="站点导航"
      >
        <div className="fly-sidebar-inner">
          <nav className="fly-sidebar-nav" aria-label="主导航">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  className={`fly-sidebar-link${isActive ? " fly-is-active" : ""}`}
                  href={item.href}
                  aria-label={item.label}
                  data-fly-tip={item.label}
                  onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="fly-menu-icon">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className="fly-nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <footer className="fly-sidebar-socials" aria-label="站点链接">
          <div className="fly-social-icons">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="fly-social-icon"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener" : undefined}
                aria-label={link.label}
                data-fly-tip={link.label}
                onMouseEnter={(e) => handleMouseEnter(e, link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon name={link.icon} size={16} />
              </a>
            ))}
          </div>
          <p className="fly-footer-copyright">
            © {new Date().getFullYear()} {site.title}
          </p>
        </footer>
      </aside>

      {/* 原版 fly-sidebar-tip：fixed 浮层 + 三角箭头 */}
      <div
        className="fly-sidebar-tip"
        data-fly-visible={tipState.visible ? "true" : "false"}
        style={{
          top: `${tipState.top}px`,
          left: `${tipState.left}px`,
        }}
        role="tooltip"
        aria-hidden={!tipState.visible}
      >
        {tipState.text}
      </div>
    </>
  );
}
