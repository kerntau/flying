"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navigation, socialLinks } from "@/data/site";
import { Icon } from "./Icon";
import { useUI } from "./UIContext";


import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed } = useUI();

  // 判断是否处于折叠/窄侧栏模式（≥768px 且 <1200px 始终折叠，≥1200px 由 sidebarCollapsed 控制）
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 1200) {
        setCollapsed(true);
      } else {
        setCollapsed(sidebarCollapsed);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [sidebarCollapsed]);

  return (
    <aside
      id="fly-site-sidebar"
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
            const navLink = (
              <Link
                key={item.href}
                className={`fly-sidebar-link${isActive ? " fly-is-active" : ""}`}
                href={item.href}
                aria-label={item.label}
              >
                <span className="fly-menu-icon">
                  <Icon name={item.icon} size={20} />
                </span>
                <span className="fly-nav-label">{item.label}</span>
              </Link>
            );

            // 侧栏收缩形态下，主导航项增加右侧 Tooltip
            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={12}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return navLink;
          })}
        </nav>
      </div>

      <footer className="fly-sidebar-socials" aria-label="站点链接">
        <div className="fly-social-icons">
          {socialLinks.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger asChild>
                <a
                  className="fly-social-icon outline-none"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                  aria-label={link.label}
                >
                  <Icon name={link.icon} size={16} />
                </a>
              </TooltipTrigger>
              <TooltipContent side={collapsed ? "right" : "top"} sideOffset={8}>
                {link.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </footer>
    </aside>
  );
}
