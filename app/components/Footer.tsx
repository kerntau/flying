"use client";

import React from "react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="fly-site-footer w-full py-8 mt-16 border-t border-[var(--line)] text-center text-xs text-[var(--mute)]">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} {site.title}. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          <span>Powered by</span>
          <span className="font-semibold text-[var(--text)]">Next.js & Flying</span>
        </p>
      </div>
    </footer>
  );
}
