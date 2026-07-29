"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}
// iOS / Spring Physics 物理弹簧配置
const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.75,
} as const;


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

  // 降级方案：为不支持原生 View Transitions 的环境提供 Framer Motion iOS 弹簧动画
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.985, y: 6, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.985, y: -4, filter: "blur(4px)" }}
        transition={springTransition}
        className="w-full flex-1 flex flex-col min-w-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
