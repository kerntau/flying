"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useUI } from "./UIContext";
import { Icon } from "./Icon";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    // 异步加载/解析轻量搜索数据（客户端获取文章元数据）
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => setAllPosts(data))
      .catch(() => {
        // Fallback: 如果没有 search-index.json，可保持空列表
      });
  }, []);

  useEffect(() => setResults(allPosts), [allPosts]);

  return (
    <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-[15%] left-[50%] z-50 w-[90vw] max-w-2xl translate-x-[-50%] rounded-2xl glass-panel p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none">
          <Command shouldFilter label="搜索文章">
            <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
              <Icon name="search" size={20} className="text-[var(--muted)]" />
              <Command.Input
                className="w-full bg-transparent text-lg text-[var(--text)] placeholder-[var(--mute)] focus:outline-none"
                placeholder="输入关键词搜索文章..."
                value={query}
                onValueChange={setQuery}
                autoFocus
              />
              <Dialog.Close asChild>
                <button className="fly-icon-button p-1" aria-label="关闭搜索框">
                  <Icon name="x" size={20} />
                </button>
              </Dialog.Close>
            </div>
            <Command.List className="mt-4 max-h-[60vh] overflow-y-auto flex flex-col gap-2">
              <Command.Empty className="text-center py-8 text-sm text-[var(--mute)]">未找到相关结果</Command.Empty>
              {results.map((item) => (
                <Command.Item
                  key={item.slug}
                  value={`${item.title} ${item.category} ${item.description || ""}`}
                  onSelect={() => {
                    setSearchOpen(false);
                    router.push(`/posts/${item.slug}/`);
                  }}
                  className="flex flex-col gap-1 p-3 rounded-xl data-[selected=true]:bg-[var(--page-alt)] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{item.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--page-alt)] text-[var(--muted)]">{item.category}</span>
                  </div>
                  {item.description && <p className="text-xs text-[var(--muted)] line-clamp-2">{item.description}</p>}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
