'use client';

import { useEffect } from 'react';

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

const YOUTUBE_SHORTCODE_PATTERN = /\{% youtube (https:\/\/[^\s]+|[a-zA-Z0-9_-]+) %\}/g;

function createYouTubeEmbed(videoId: string) {
  const container = document.createElement('div');
  container.className = 'youtube-embed-container my-6 aspect-video w-full overflow-hidden rounded-xl shadow-md';

  const iframe = document.createElement('iframe');
  iframe.className = 'w-full h-full border-0';
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.title = 'YouTube video player';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  container.appendChild(iframe);
  return container;
}

/**
 * 客户端 DOM 增强组件：对文章正文进行动态增强
 * - 表格包裹为水平横向滚动容器
 * - 防盗链图片懒加载
 * - 标题 HTML 挂载悬停锚点链接 (#)
 * - YouTube 嵌入短代码 {% youtube ... %} 自动转换
 */
export function ArticleEnhancer() {
  useEffect(() => {
    const article = document.getElementById('article') || document.querySelector('.article-detail');
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

    // 3. 标题锚点链接
    const headings = Array.from(article.querySelectorAll<HTMLElement>('h2, h3, h4, h5, h6'));
    for (const heading of headings) {
      if (!heading.id || heading.querySelector('.heading-link')) continue;

      heading.classList.add('group');
      const link = document.createElement('a');
      link.className =
        'heading-link ml-2 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity no-underline text-primary/70 hover:text-primary';
      link.href = `#${heading.id}`;

      const span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.textContent = '#';
      link.appendChild(span);
      heading.appendChild(link);
    }

    // 4. YouTube 嵌入短代码处理
    const paragraphs = article.querySelectorAll<HTMLParagraphElement>('p');
    paragraphs.forEach((paragraph) => {
      const text = (paragraph.textContent || '').trim();
      const videoMatch = text.match(/\{% youtube (https:\/\/[^\s]+|[a-zA-Z0-9_-]+) %\}/);
      if (!videoMatch?.[1]) return;

      const videoId = extractYouTubeId(videoMatch[1]);
      if (!videoId || !/^[a-zA-Z0-9_-]{1,11}$/.test(videoId)) return;
      paragraph.replaceWith(createYouTubeEmbed(videoId));
    });

    // 检查通用文本节点中的 {% youtube %} 短代码
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const textNodes: Node[] = [];
    let node = walker.nextNode();
    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }

    textNodes.forEach((textNode) => {
      const textContent = textNode.textContent;
      if (!textContent?.includes('{% youtube ')) return;

      const parent = textNode.parentNode;
      if (!parent) return;

      YOUTUBE_SHORTCODE_PATTERN.lastIndex = 0;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = YOUTUBE_SHORTCODE_PATTERN.exec(textContent)) !== null) {
        const [shortcode, rawVideoId] = match;
        const before = textContent.slice(lastIndex, match.index);
        if (before) {
          fragment.appendChild(document.createTextNode(before));
        }

        const videoId = extractYouTubeId(rawVideoId);
        if (videoId && /^[a-zA-Z0-9_-]{1,11}$/.test(videoId)) {
          fragment.appendChild(createYouTubeEmbed(videoId));
        }
        lastIndex = match.index + shortcode.length;
      }

      if (lastIndex === 0) return;
      const after = textContent.slice(lastIndex);
      if (after) {
        fragment.appendChild(document.createTextNode(after));
      }

      parent.insertBefore(fragment, textNode);
      parent.removeChild(textNode);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
