"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useUI } from "./UIContext";
import { Icon } from "./Icon";
import Link from "next/link";

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  description?: string;
}

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allPosts, setAllPosts] = useState<SearchResult[]>([]);

  useEffect(() => {
    // 异步加载/解析轻量搜索数据（客户端获取文章元数据）
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => setAllPosts(data))
      .catch(() => {
        // Fallback: 如果没有 search-index.json，可保持空列表
      });
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allPosts.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query, allPosts]);

  return (
    <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-[15%] left-[50%] z-50 w-[90vw] max-w-2xl translate-x-[-50%] rounded-2xl bg-[var(--page)] p-6 shadow-2xl border border-[var(--line)] animate-in zoom-in-95 duration-200 focus:outline-none">
          <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
            <Icon name="search" size={20} className="text-[var(--muted)]" />
            <input
              type="text"
              className="w-full bg-transparent text-lg text-[var(--text)] placeholder-[var(--mute)] focus:outline-none"
              placeholder="输入关键词搜索文章..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Dialog.Close asChild>
              <button className="fly-icon-button p-1" aria-label="关闭搜索框">
                <Icon name="x" size={20} />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-4 max-h-[60vh] overflow-y-auto flex flex-col gap-2">
            {query.trim() === "" ? (
              <p className="text-center py-8 text-sm text-[var(--mute)]">请输入关键词搜索全站文章与动态...</p>
            ) : results.length === 0 ? (
              <p className="text-center py-8 text-sm text-[var(--mute)]">未找到相关结果</p>
            ) : (
              results.map((item) => (
                <Link
                  key={item.slug}
                  href={`/posts/${item.slug}/`}
                  onClick={() => setSearchOpen(false)}
                  className="flex flex-col gap-1 p-3 rounded-xl hover:bg-[var(--page-alt)] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--page-alt)] text-[var(--muted)]">
                      {item.category}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-[var(--muted)] line-clamp-2">{item.description}</p>
                  )}
                </Link>
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
