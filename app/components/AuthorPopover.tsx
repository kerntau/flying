"use client";

import React from "react";
import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";
import { site, authors } from "@/data/site";
import { Icon } from "./Icon";

interface AuthorPopoverProps {
  name: string;
}

export function AuthorPopover({ name }: AuthorPopoverProps) {
  const targetName = name || site.author;
  const author = authors.find(
    (a) => a.name.toLowerCase() === targetName.toLowerCase() || a.slug.toLowerCase() === targetName.toLowerCase()
  ) || {
    name: targetName,
    slug: targetName.toLowerCase(),
    bio: site.description,
    avatar: site.logo,
    website: site.url,
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="fly-author-link inline-flex items-center justify-center gap-2 text-xs font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors focus:outline-none shrink-0 h-10 sm:h-11 leading-none"
        >
          <img
            src={author.avatar || site.logo}
            alt={author.name}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[var(--page)] shadow-xs shrink-0 block"
          />
          <span className="hidden sm:inline font-bold leading-none">{author.name}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 w-64 rounded-2xl bg-[var(--page)] p-4 shadow-xl border border-[var(--line)] animate-in fade-in zoom-in-95 duration-150 focus:outline-none"
          sideOffset={5}
        >
          <div className="flex items-center gap-3">
            <img
              src={author.avatar || site.logo}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover border border-[var(--line)]"
            />
            <div className="flex flex-col min-w-0">
              <Link
                href={`/authors/${author.slug}/`}
                className="font-bold text-sm text-[var(--text)] hover:underline truncate"
              >
                {author.name}
              </Link>
              <span className="text-xs text-[var(--mute)]">@{author.slug}</span>
            </div>
          </div>

          {author.bio && <p className="mt-3 text-xs text-[var(--muted)] line-clamp-3">{author.bio}</p>}

          <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between">
            <Link
              href={`/authors/${author.slug}/`}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              查看主页
            </Link>
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--muted)] hover:text-[var(--text)] flex items-center gap-1"
              >
                <Icon name="globe" size={12} />
                <span>网站</span>
              </a>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
