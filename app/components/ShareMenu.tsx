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
      className="inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer shrink-0 bg-transparent border-0 p-0"
      aria-label="复制文章链接"
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-500" />
          <span className="text-emerald-500">已复制</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>复制链接</span>
        </>
      )}
    </button>
  );
}
