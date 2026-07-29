"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "@/lib/toast";

export function ShareMenu({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("链接已复制到剪贴板");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.error("复制链接失败");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--page-alt)] border border-[var(--line)]/60 text-xs font-bold text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
      aria-label="复制文章链接"
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-500" />
          <span className="text-emerald-500">已复制</span>
        </>
      ) : (
        <>
          <Copy size={14} className="text-[var(--accent)]" />
          <span>复制链接</span>
        </>
      )}
    </button>
  );
}
