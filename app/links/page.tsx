import React from "react";
import { getLinks } from "@/lib/content";
import { LinksClient } from "./LinksClient";

export default function LinksPage() {
  const links = getLinks();

  return (
    <div className="fly-links-page max-w-5xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">友情链接</h1>
        <p className="text-sm text-[var(--muted)]">志同道合的朋友们，互换链接与灵感火花</p>
      </header>

      <LinksClient links={links} />
    </div>
  );
}
