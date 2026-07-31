"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}


export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [hasNativeViewTransition, setHasNativeViewTransition] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      setHasNativeViewTransition(true);
    }
  }, []);

  // 当浏览器支持原生 View Transitions API 时，由 globals.css ::view-transition-new/old 驱动精准的高分辨率 GPU 快照动画
  if (hasNativeViewTransition) {
    return (
      <div key={pathname} className="w-full flex-1 flex flex-col min-w-0">
        {children}
      </div>
    );
  }

  // 降级方案：为不支持原生 View Transitions 的环境提供极速流畅动画
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-1 flex flex-col min-w-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
