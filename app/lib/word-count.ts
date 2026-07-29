/**
 * Markdown 文章字数统计与阅读时间估算工具
 *
 * 统计策略：
 * 1. 移除 Front Matter
 * 2. 移除代码块（含围栏式和缩进式）
 * 3. 移除 HTML 标签
 * 4. 移除图片语法 ![alt](url)
 * 5. 提取链接文本，丢弃 URL：[text](url) → text
 * 6. 移除 Markdown 格式符号（#、*、>、~、`、|、-、= 等）
 * 7. 移除残余空白后统计剩余中文字符 + 英文单词数
 */

/**
 * 统计 Markdown 原始内容的正文字数
 * 中文按字符计、英文按单词计（与主流中文博客平台一致）
 */
export function countWords(markdown: string): number {
  if (!markdown) return 0;

  let text = markdown;

  // 1. 移除 YAML Front Matter
  text = text.replace(/^---[\s\S]*?---\s*/m, "");

  // 2. 移除围栏式代码块（```...``` 和 ~~~...~~~）
  text = text.replace(/(`{3,}|~{3,})[\s\S]*?\1/g, "");

  // 3. 移除行内代码
  text = text.replace(/`[^`\n]+`/g, "");

  // 4. 移除 HTML 标签
  text = text.replace(/<[^>]+>/g, "");

  // 5. 移除图片 ![alt](url) 和 ![alt][ref]
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  text = text.replace(/!\[[^\]]*\]\[[^\]]*\]/g, "");

  // 6. 提取链接文本 [text](url) → text
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  text = text.replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1");

  // 7. 移除 Markdown 标题标记、引用、水平线等块级符号
  text = text.replace(/^#{1,6}\s+/gm, "");
  text = text.replace(/^>\s*/gm, "");
  text = text.replace(/^[-*_]{3,}\s*$/gm, "");
  text = text.replace(/^\|.*\|$/gm, ""); // 表格行
  text = text.replace(/^[\s]*[-:]+[-|:\s]*$/gm, ""); // 表格分隔线

  // 8. 移除行内格式符号（加粗、斜体、删除线）
  text = text.replace(/[*_~]{1,3}/g, "");

  // 9. 移除脚注标记 [^n]
  text = text.replace(/\[\^[^\]]*\]/g, "");

  // 10. 统计
  // 中文字符数（包含中文标点不计入）
  const chineseChars = text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g);
  const chineseCount = chineseChars ? chineseChars.length : 0;

  // 英文单词数（连续字母/数字序列）
  const stripped = text.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, " ");
  const englishWords = stripped.match(/[a-zA-Z0-9]+(?:[-'][a-zA-Z0-9]+)*/g);
  const englishCount = englishWords ? englishWords.length : 0;

  return chineseCount + englishCount;
}

/**
 * 估算阅读时间（分钟）
 * 中文阅读速度 ~300 字/分钟（含英文混合场景取保守值）
 */
export function estimateReadTime(markdown: string): number {
  const words = countWords(markdown);
  return Math.max(1, Math.ceil(words / 300));
}

/**
 * 格式化字数显示
 */
export function formatWordCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)} 万字`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k 字`;
  }
  return `${count} 字`;
}
