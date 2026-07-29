"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Copy, Share2, Mail } from "lucide-react";

export function ShareMenu({ title }: { title: string }) {
  async function copyLink() {
    await navigator.clipboard?.writeText(window.location.href);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--page-alt)] border border-[var(--line)]/60 text-xs font-bold text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
          aria-label="分享文章"
        >
          <Share2 size={14} className="text-[var(--accent)]" />
          <span>分享</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[140px] rounded-xl border border-[var(--line)] bg-[var(--page)] p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150"
          sideOffset={8}
        >
          <DropdownMenu.Item
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] outline-none hover:bg-[var(--page-alt)] transition-colors"
            onSelect={copyLink}
          >
            <Copy size={14} className="text-[var(--muted)]" />
            <span>复制链接</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[var(--text)] outline-none hover:bg-[var(--page-alt)] transition-colors"
              href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
                typeof window === "undefined" ? "" : window.location.href
              )}`}
            >
              <Mail size={14} className="text-[var(--muted)]" />
              <span>邮件分享</span>
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
