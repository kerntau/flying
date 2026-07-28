"use client";

import React, { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100)));
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[var(--text)] via-[var(--accent)] to-[var(--text)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
