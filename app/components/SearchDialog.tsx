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
  tags?: string[];
}

function HighlightText({ text, query }: { text?: string; query: string }) {
  if (!text) return null;
  const rawTerms = query
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (rawTerms.length === 0) return <>{text}</>;

  // 构造可拆分的正则组合
  const regexPattern = new RegExp(
    `(${rawTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );

  const parts = text.split(regexPattern);

  return (
    <>
      {parts.map((part, i) => {
        const isMatched = rawTerms.some(
          (t) => t.toLowerCase() === part.toLowerCase()
        );
        return isMatched ? (
          <mark
            key={i}
            className="bg-[var(--accent)]/20 text-[var(--accent)] font-extrabold px-0.5 rounded-[2px]"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        );
      })}
    </>
  );
}

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allPosts, setAllPosts] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => setAllPosts(data))
      .catch(() => {});
  }, []);

  useEffect(() => setResults(allPosts), [allPosts]);

  // 热门建议搜索词
  const hotTags = ["Windows", "渗透测试", "提权", "Recon", "Next.js"];

  return (
    <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-[12%] left-[50%] z-50 w-[92vw] max-w-xl translate-x-[-50%] rounded-2xl bg-[var(--page)]/95 backdrop-blur-2xl p-3.5 sm:p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none border border-[var(--line)]/60">
          <Command shouldFilter label="搜索文章">
            <div className="flex items-center gap-2.5 border-b border-[var(--line)]/40 pb-2.5 px-1 pt-0.5">
              <Icon name="search" size={17} className="text-[var(--muted)] opacity-70 shrink-0" />
              <Command.Input
                className="w-full bg-transparent text-sm sm:text-base text-[var(--text)] placeholder-[var(--muted)]/50 focus:outline-none font-medium"
                placeholder="输入关键词搜索标题、摘要或标签..."
                value={query}
                onValueChange={setQuery}
                autoFocus
              />
              <Dialog.Close asChild>
                <button
                  className="flex items-center justify-center h-7 w-7 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--page-alt)] transition-colors cursor-pointer"
                  aria-label="关闭搜索框"
                >
                  <Icon name="x" size={16} />
                </button>
              </Dialog.Close>
            </div>

            {/* 热门建议词条 (搜索框为空时呈现) */}
            {!query.trim() && (
              <div className="flex items-center gap-1.5 pt-2 pb-1 px-1 overflow-x-auto no-scrollbar text-xs">
                <span className="text-[11px] font-bold text-[var(--muted)] shrink-0">热门搜索：</span>
                {hotTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-2 py-0.5 rounded-md bg-[var(--page-alt)]/80 hover:bg-[var(--page-alt)] text-[var(--muted)] hover:text-[var(--accent)] text-[11px] font-mono transition-colors cursor-pointer shrink-0"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            <Command.List className="mt-2 max-h-[55vh] overflow-y-auto space-y-1 no-scrollbar pr-0.5">
              <Command.Empty className="text-center py-8 text-xs text-[var(--muted)]">
                未找到匹配的文章或标签
              </Command.Empty>

              {results.map((item) => {
                const searchString = `${item.title} ${item.category} ${item.description || ""} ${(item.tags || []).join(" ")}`;
                return (
                  <Command.Item
                    key={item.slug}
                    value={searchString}
                    onSelect={() => {
                      setSearchOpen(false);
                      router.push(`/posts/${item.slug}/`);
                    }}
                    className="flex flex-col gap-1 px-3 py-2 rounded-xl data-[selected=true]:bg-[var(--accent)]/10 cursor-pointer transition-colors group select-none"
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span className="text-xs sm:text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] group-data-[selected=true]:text-[var(--accent)] transition-colors truncate">
                        <HighlightText text={item.title} query={query} />
                      </span>
                      {item.category && (
                        <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--page-alt)] text-[var(--muted)] group-data-[selected=true]:bg-[var(--accent)]/15 group-data-[selected=true]:text-[var(--accent)] transition-colors">
                          <HighlightText text={item.category} query={query} />
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs sm:text-[13px] text-[var(--muted)] line-clamp-1 leading-normal font-normal">
                        <HighlightText text={item.description} query={query} />
                      </p>
                    )}

                    {/* 命中的标签列表 */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-2 pt-0.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono text-[var(--muted)]/80"
                          >
                            #<HighlightText text={tag} query={query} />
                          </span>
                        ))}
                      </div>
                    )}
                  </Command.Item>
                );
              })}
            </Command.List>

            {/* 底部极简快捷键提示 */}
            <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]/70 pt-2.5 mt-2 border-t border-[var(--line)]/30 px-1">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--page-alt)] text-xs font-mono text-[var(--muted)]">↑↓</kbd> 导航
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--page-alt)] text-xs font-mono text-[var(--muted)]">↵</kbd> 打开
                </span>
              </div>
              <span className="inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--page-alt)] text-xs font-mono text-[var(--muted)]">ESC</kbd> 关闭
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
