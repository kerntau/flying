import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-6xl font-black text-[var(--accent)]">404</h1>
      <h2 className="text-xl font-bold text-[var(--text)]">页面未能找到</h2>
      <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md">
        您访问的页面可能已经被移走、重命名，或者暂时不可用。
      </p>
      <Link
        href="/"
        className="fly-button fly-button--primary mt-4"
      >
        返回首页
      </Link>
    </div>
  );
}
