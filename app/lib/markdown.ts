/* eslint-disable @typescript-eslint/no-explicit-any */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { rehypeRemoveFirstH1 } from "./rehype-remove-first-h1";
import { rehypeOptimization } from "./rehype-optimization";
import rehypePrettyCode, {
  rehypePrettyCodeOptions,
  rehypeTrimPrettyCodeWhitespace,
} from "./rehype-pretty-code";
import { remarkCodeBlockTitle } from "./remark-code-titles";
import { remarkCustomDirectives } from "./remark-custom-directives";
import { remarkUnwrapBlockElements } from "./remark-unwrap-block-elements";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse as any)
    .use(remarkGfm as any)
    .use(remarkCodeBlockTitle as any)
    .use(remarkDirective as any)
    .use(remarkCustomDirectives as any)
    .use(remarkAlert as any)
    .use(remarkUnwrapBlockElements as any)
    .use(remarkRehype as any, { allowDangerousHtml: true })
    .use(rehypeRaw as any)
    .use(rehypeRemoveFirstH1 as any)
    .use(rehypeOptimization as any)
    .use(rehypeSlug as any)
    .use(rehypePrettyCode as any, rehypePrettyCodeOptions)
    .use(rehypeTrimPrettyCodeWhitespace as any)
    .use(rehypeStringify as any, { allowDangerousHtml: true })
    .process(content || "");

  return result.toString();
}

/**
 * 保持与 rehype-slug (github-slugger) 100% 一致的 Slug 生成逻辑，
 * 解决中文标点符号导致的 Heading ID 不匹配、TOC 高亮与跟随失效的问题。
 */
function slugify(text: string, occurrences: Record<string, number>): string {
  const rawSlug = text
    .toLowerCase()
    .trim()
    .replace(/[\s\-_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/^-+|-+$/g, '');

  const slug = rawSlug || 'heading';

  if (Object.prototype.hasOwnProperty.call(occurrences, slug)) {
    occurrences[slug]++;
    return `${slug}-${occurrences[slug]}`;
  }

  occurrences[slug] = 0;
  return slug;
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  const occurrences: Record<string, number> = {};
  let match;
  let isFirstH1 = true;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;

    // 如果 Markdown 正文中第一个标题是 # (h1)，其会被 rehypeRemoveFirstH1 插件移除，TOC 也同步过滤掉
    if (level === 1 && isFirstH1) {
      isFirstH1 = false;
      continue;
    }
    isFirstH1 = false;

    // 移除 markdown 链接、粗体等行内格式，提取纯文本
    const rawText = match[2].trim();
    const text = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_~`]/g, '');

    const id = slugify(text, occurrences);

    toc.push({ id, text, level });
  }

  return toc;
}
