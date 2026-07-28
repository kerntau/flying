import React from "react";
import { getAllMoments } from "@/lib/content";
import { MomentsClient } from "./MomentsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "闪念与动态", description: "记录想法、灵感与生活微光。", path: "/moments/" });

export default function MomentsPage() {
  const moments = getAllMoments();

  return (
    <div className="fly-moments-page max-w-4xl mx-auto space-y-8">
      <header className="border-b border-[var(--line)] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">闪念与动态</h1>
        <p className="text-sm text-[var(--muted)]">随时随地记录想法、灵感与生活微光，共有 {moments.length} 条瞬间</p>
      </header>

      <MomentsClient moments={moments} />
    </div>
  );
}
