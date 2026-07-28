'use client';

import { useEffect, useRef } from 'react';
import { getCodeBlockLanguageLabel } from '@/lib/code-block-language';
import { normalizeRenderedCodeBlock } from '@/lib/normalize-rendered-code-block';
import { toast } from '@/lib/toast';

function createDots() {
  const dots = document.createElement('div');
  dots.className = 'code-window-dots';
  dots.setAttribute('aria-hidden', 'true');

  ['red', 'amber', 'emerald'].forEach((color) => {
    const dot = document.createElement('span');
    dot.className = `code-window-dot code-window-dot-${color}`;
    dots.appendChild(dot);
  });

  return dots;
}

function findAttachedTitle(wrapper: HTMLElement) {
  const previous = wrapper.previousElementSibling;
  if (
    previous instanceof HTMLElement &&
    previous.matches('.code-block-title, .remark-code-title, [data-rehype-pretty-code-title]')
  ) {
    previous.dataset.codeTitleAttached = 'true';
    previous.setAttribute('aria-hidden', 'true');
    return previous.textContent?.trim() || null;
  }

  return null;
}

function ensureWrapper(pre: HTMLPreElement) {
  const existingWrapper = pre.parentElement;
  if (existingWrapper?.classList.contains('code-block-wrapper')) {
    return existingWrapper;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'code-block-wrapper';
  pre.parentNode?.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);
  return wrapper;
}

function ensureHeader(wrapper: HTMLElement, languageLabel: string) {
  let header = wrapper.querySelector<HTMLElement>(':scope > .code-block-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'code-block-header';
    wrapper.insertBefore(header, wrapper.firstChild);
  }

  let meta = header.querySelector<HTMLElement>(':scope > .code-block-header-meta');
  if (!meta) {
    meta = document.createElement('div');
    meta.className = 'code-block-header-meta';
    header.prepend(meta);
  }

  const displayLabel = findAttachedTitle(wrapper) || languageLabel;
  const label = document.createElement('span');
  label.className = 'code-block-language';
  label.textContent = displayLabel;
  meta.replaceChildren(createDots(), label);

  return header;
}

function extractYouTubeId(input: string): string {
  let videoId = input;
  try {
    if (videoId.includes('youtube.com/watch')) {
      const url = new URL(videoId);
      videoId = url.searchParams.get('v') || '';
    } else if (videoId.includes('youtu.be/')) {
      videoId = videoId.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (videoId.includes('youtube.com/embed/')) {
      videoId = videoId.split('youtube.com/embed/')[1]?.split('?')[0] || '';
    }
  } catch {
    return input;
  }
  return videoId;
}

function createYouTubeEmbed(videoId: string) {
  const container = document.createElement('div');
  container.className = 'youtube-embed-container my-6 relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--line)] shadow-lg';

  const iframe = document.createElement('iframe');
  iframe.className = 'absolute inset-0 h-full w-full';
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.title = 'YouTube video player';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  container.appendChild(iframe);
  return container;
}

export function HtmlMarkdownContent({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = containerRef.current;
    if (!article) return;

    const cleanups: Array<() => void> = [];

    // 1. 表格 → 横滚容器
    const tables = Array.from(article.querySelectorAll<HTMLTableElement>('table'));
    for (const table of tables) {
      if (table.parentElement?.classList.contains('table-scroll-wrapper')) continue;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll-wrapper';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }

    // 2. 图片懒加载
    const images = Array.from(article.querySelectorAll<HTMLImageElement>('img'));
    for (const img of images) {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    }

    // 3. 标题 # 锚点链接生成
    const headings = Array.from(article.querySelectorAll<HTMLElement>('h2, h3, h4, h5, h6'));
    for (const heading of headings) {
      if (heading.querySelector('.heading-link')) continue;

      heading.classList.add('group');
      const link = document.createElement('a');
      link.className =
        'heading-link ml-2 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity text-[var(--accent)] font-normal no-underline';
      link.href = `#${heading.id}`;

      const span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.textContent = '#';
      link.appendChild(span);
      heading.appendChild(link);
    }

    // 4. YouTube 短代码 {% youtube %} 处理
    const paragraphs = article.querySelectorAll<HTMLParagraphElement>('p');
    paragraphs.forEach((paragraph) => {
      const text = (paragraph.textContent || '').trim();
      const videoMatch = text.match(/\{% youtube (https:\/\/[^\s]+|[a-zA-Z0-9_-]+) %\}/);
      if (!videoMatch?.[1]) return;

      const videoId = extractYouTubeId(videoMatch[1]);
      if (!videoId || !/^[a-zA-Z0-9_-]{1,11}$/.test(videoId)) return;
      paragraph.replaceWith(createYouTubeEmbed(videoId));
    });

    // 5. 代码块转换 Header、macOS dots、语言标签、复制按钮与清洗
    const blocks = article.querySelectorAll('pre');

    blocks.forEach((pre) => {
      if (pre.dataset.coetCopyBound === '1') return;
      pre.dataset.coetCopyBound = '1';

      const wrapper = ensureWrapper(pre);
      const codeElement = wrapper.querySelector('code');
      const languageLabel = getCodeBlockLanguageLabel(
        codeElement instanceof HTMLElement
          ? codeElement.getAttribute('data-language') || codeElement.className
          : pre.getAttribute('data-language') || undefined
      );
      const header = ensureHeader(wrapper, languageLabel);
      normalizeRenderedCodeBlock(wrapper);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code-btn';
      button.setAttribute('aria-label', '复制代码');
      button.textContent = '复制';

      let timer: ReturnType<typeof setTimeout> | undefined;

      const onClick = async () => {
        const currentCode = wrapper.querySelector('code');
        const textToCopy = (currentCode?.textContent || pre.textContent || '').replace(/\n$/, '');

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'absolute';
            textArea.style.left = '-9999px';
            textArea.style.top = '0';
            textArea.setAttribute('readonly', '');
            document.body.appendChild(textArea);
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (!successful) throw new Error('copy failed');
          }

          button.classList.add('copied');
          button.textContent = '已复制';
          toast.success('已复制到剪贴板');

          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = '复制';
          }, 1600);
        } catch {
          button.classList.remove('copied');
          button.textContent = '错误';
          toast.error('复制失败');

          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            button.textContent = '复制';
          }, 1600);
        }
      };

      button.addEventListener('click', onClick);
      header.appendChild(button);

      cleanups.push(() => {
        if (timer) clearTimeout(timer);
        button.removeEventListener('click', onClick);
        button.remove();
        delete pre.dataset.coetCopyBound;
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      id="article"
      className={className || "html-markdown-content article-detail prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6 overflow-hidden break-words [word-break:break-word]"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
