'use client';

import React, { useEffect, useState } from "react";
import { site } from "@/data/site";
import { MessageSquare, AlertCircle } from "lucide-react";
import { Icon } from "./Icon";

declare global {
  interface Window {
    Gitalk?: any;
  }
}

export function GitalkComments() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gitalkConfig = site.gitalk || {
    clientID: "",
    clientSecret: "",
    repo: "theme-flying",
    owner: "kerntau",
    admin: ["kerntau"],
  };

  const isConfigured = Boolean(gitalkConfig.clientID && gitalkConfig.clientSecret);

  useEffect(() => {
    if (!isConfigured || typeof window === "undefined") return;

    // 1. 注入 Gitalk CSS 样式
    const cssId = "gitalk-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css";
      document.head.appendChild(link);
    }

    // 2. 动态注入并初始化 Gitalk JS SDK
    const loadGitalkScript = () => {
      if (window.Gitalk) {
        initGitalk();
        return;
      }

      const scriptId = "gitalk-js";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js";
        script.onload = () => {
          initGitalk();
        };
        script.onerror = () => {
          setError("Gitalk 脚本资源加载失败，请检查网络联通性。");
        };
        document.body.appendChild(script);
      } else {
        const script = document.getElementById(scriptId) as HTMLScriptElement;
        script.addEventListener("load", initGitalk);
      }
    };

    const initGitalk = () => {
      try {
        if (!window.Gitalk) return;
        const container = document.getElementById("gitalk-container");
        if (container) container.innerHTML = "";

        const gitalk = new window.Gitalk({
          clientID: gitalkConfig.clientID,
          clientSecret: gitalkConfig.clientSecret,
          repo: gitalkConfig.repo || "theme-flying",
          owner: gitalkConfig.owner || "kerntau",
          admin: gitalkConfig.admin || ["kerntau"],
          id: window.location.pathname.replace(/\/$/, "") || "links",
          distractionFreeMode: false,
        });

        gitalk.render("gitalk-container");
        setLoaded(true);
      } catch (e: any) {
        setError(e?.message || "Gitalk 初始化失败");
      }
    };

    loadGitalkScript();
  }, [isConfigured, gitalkConfig]);

  return (
    <section className="gitalk-section w-full mt-10 space-y-4 pt-6 border-t border-[var(--line)]/30">
      {/* 头部指示栏 */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]/20">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[var(--accent)]" />
          <h3 className="font-extrabold text-base text-[var(--text)]">
            留言申请 / Gitalk 讨论区
          </h3>
        </div>
        <a
          href="https://github.com/gitalk/gitalk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        >
          <Icon name="github" size={13} />
          <span>Powered by Gitalk</span>
        </a>
      </div>

      {/* 挂载容器与初始化逻辑 */}
      {isConfigured ? (
        <div className="relative min-h-[160px]">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
          {!loaded && !error && (
            <div className="py-12 flex flex-col items-center justify-center space-y-2 text-xs text-[var(--muted)] animate-pulse">
              <Icon name="github" size={24} className="animate-spin text-[var(--accent)] opacity-70" />
              <span>正在初始化 Gitalk 评论区...</span>
            </div>
          )}
          <div id="gitalk-container" className="fly-gitalk-wrapper w-full" />
        </div>
      ) : (
        /* 未填写配置时的优雅指引 */
        <div className="p-5 rounded-2xl bg-[var(--page-alt)]/40 border border-[var(--line)]/20 text-xs text-[var(--muted)] space-y-3">
          <div className="flex items-center gap-2 text-[var(--text)] font-bold">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Gitalk 评论系统接入提示</span>
          </div>
          <p className="leading-relaxed">
            Gitalk 评论区基于 GitHub Issues 提供留言鉴权功能。要在本博客正常启用 Gitalk，请在{" "}
            <code className="px-1.5 py-0.5 rounded bg-[var(--page)] text-[var(--text)] font-mono">
              app/data/site.ts
            </code>{" "}
            中配置 GitHub Application 的 <code className="text-[var(--accent)] font-mono">clientID</code> 与{" "}
            <code className="text-[var(--accent)] font-mono">clientSecret</code> 凭证。
          </p>
          <div className="pt-2 flex items-center gap-3 border-t border-[var(--line)]/20 text-[11px] font-mono">
            <span className="text-[var(--text)] font-semibold">当前仓库:</span>
            <span>{gitalkConfig.owner || "kerntau"} / {gitalkConfig.repo || "theme-flying"}</span>
          </div>
        </div>
      )}
    </section>
  );
}
