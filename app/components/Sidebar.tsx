"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, navigation, socialLinks } from "@/data/site";
import { Icon } from "./Icon";
import { useUI } from "./UIContext";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed } = useUI();

  return (
    <aside
      id="fly-site-sidebar"
      className={`fly-site-sidebar ${sidebarCollapsed ? "fly-site-sidebar--collapsed" : "fly-site-sidebar--static"} fixed left-0 top-0 bottom-0 z-30 flex flex-col justify-between p-6 border-r border-[var(--line)] bg-[var(--page)] transition-all duration-300 hidden md:flex`}
      style={{
        width: sidebarCollapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
      }}
      aria-label="站点导航"
    >
      <div className="fly-sidebar-inner flex flex-col gap-8">
        <Link className="fly-brand text-xl font-bold tracking-tight text-[var(--text)]" href="/">
          {site.title}
        </Link>
        <nav className="fly-sidebar-nav flex flex-col gap-2" aria-label="主导航">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                className={`fly-sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                    : "text-[var(--muted)] hover:bg-[var(--page-alt)] hover:text-[var(--text)]"
                }`}
                href={item.href}
                aria-label={item.label}
              >
                <Icon name={item.icon} size={18} />
                {!sidebarCollapsed && <span className="fly-nav-label text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <footer className="fly-sidebar-socials flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
        <div className="fly-social-icons flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              className="fly-social-icon flex items-center justify-center p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors"
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener" : undefined}
              aria-label={link.label}
            >
              <Icon name={link.icon} size={18} />
            </a>
          ))}
        </div>
        {!sidebarCollapsed && (
          <p className="fly-footer-copyright text-xs text-[var(--mute)]">
            © {new Date().getFullYear()} {site.title}
          </p>
        )}
      </footer>
    </aside>
  );
}
