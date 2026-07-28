"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Copy, Share2 } from "lucide-react";

export function ShareMenu({ title }: { title: string }) {
  async function copyLink() {
    await navigator.clipboard?.writeText(window.location.href);
  }

  return <DropdownMenu.Root><DropdownMenu.Trigger asChild><button type="button" className="fly-icon-button inline-flex items-center gap-2" aria-label="分享文章"><Share2 size={17} /><span className="text-xs">分享</span></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="z-50 min-w-36 rounded-xl border border-[var(--line)] bg-[var(--page)] p-1 shadow-xl" sideOffset={8}><DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text)] outline-none hover:bg-[var(--page-alt)]" onSelect={copyLink}><Copy size={15} />复制链接</DropdownMenu.Item><DropdownMenu.Item asChild><a className="flex items-center rounded-lg px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--page-alt)]" href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(typeof window === "undefined" ? "" : window.location.href)}`}>邮件分享</a></DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>;
}
