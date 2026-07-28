import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "app", "content", "posts");
const outputCoversDir = path.join(root, "public", "assets", "images", "covers");

await mkdir(outputCoversDir, { recursive: true });

// 精心设计的 gradients 配色方案集合
const COLOR_SCHEMES = [
  { bg1: "#0f172a", bg2: "#1e1b4b", accent1: "#6366f1", accent2: "#a855f7", text: "#f8fafc", tag: "AI & Intelligence" },
  { bg1: "#022c22", bg2: "#064e3b", accent1: "#10b981", accent2: "#06b6d4", text: "#f0fdf4", tag: "Architecture" },
  { bg1: "#1e1b4b", bg2: "#311042", accent1: "#ec4899", accent2: "#8b5cf6", text: "#fdf2f8", tag: "Cyber Security" },
  { bg1: "#172554", bg2: "#1e3a8a", accent1: "#3b82f6", accent2: "#06b6d4", text: "#eff6ff", tag: "Algorithms" },
  { bg1: "#312e81", bg2: "#4338ca", accent1: "#818cf8", accent2: "#c084fc", text: "#eef2ff", tag: "Graph Theory" },
  { bg1: "#111827", bg2: "#1f2937", accent1: "#f59e0b", accent2: "#ef4444", text: "#f9fafb", tag: "Linux Core" },
  { bg1: "#0c4a6e", bg2: "#075985", accent1: "#38bdf8", accent2: "#818cf8", text: "#f0f9ff", tag: "Privilege Esc" },
  { bg1: "#1c1917", bg2: "#292524", accent1: "#f97316", accent2: "#eab308", text: "#fafaf9", tag: "Services Security" },
  { bg1: "#2e1065", bg2: "#3b0764", accent1: "#d946ef", accent2: "#8b5cf6", text: "#faf5ff", tag: "Metasploit Deep" },
  { bg1: "#042f2e", bg2: "#134e4a", accent1: "#14b8a6", accent2: "#10b981", text: "#f0fdfa", tag: "Recon & Assets" },
  { bg1: "#172554", bg2: "#1e1b4b", accent1: "#60a5fa", accent2: "#c084fc", text: "#eff6ff", tag: "Sorting & DS" },
  { bg1: "#0f172a", bg2: "#334155", accent1: "#38bdf8", accent2: "#94a3b8", text: "#f8fafc", tag: "Windows Security" },
];

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSvgCover(title, category, index) {
  const scheme = COLOR_SCHEMES[index % COLOR_SCHEMES.length];
  const safeTitle = escapeXml(title);

  // 折行显示过长标题
  let line1 = safeTitle;
  let line2 = "";
  if (safeTitle.length > 18) {
    const spaceIdx = safeTitle.lastIndexOf(" ", 18);
    const splitAt = spaceIdx > 10 ? spaceIdx : 16;
    line1 = safeTitle.slice(0, splitAt);
    line2 = safeTitle.slice(splitAt).trim();
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${scheme.bg1}" />
      <stop offset="100%" stop-color="${scheme.bg2}" />
    </linearGradient>

    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${scheme.accent1}" />
      <stop offset="100%" stop-color="${scheme.accent2}" />
    </linearGradient>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
    </pattern>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur" />
    </filter>
  </defs>

  <!-- 背景底图与网格纹理 -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <rect width="100%" height="100%" fill="url(#grid)" />

  <!-- 科技半透明发光光束 -->
  <circle cx="950" cy="150" r="280" fill="${scheme.accent1}" opacity="0.28" filter="url(#glow)" />
  <circle cx="200" cy="550" r="220" fill="${scheme.accent2}" opacity="0.2" filter="url(#glow)" />

  <!-- 背景几何构图图形 -->
  <g opacity="0.12" transform="translate(680, 80)">
    <rect x="0" y="0" width="400" height="400" rx="32" fill="none" stroke="${scheme.accent1}" stroke-width="4" transform="rotate(15 200 200)"/>
    <circle cx="200" cy="200" r="140" fill="none" stroke="${scheme.accent2}" stroke-width="3" stroke-dasharray="12 12" />
    <circle cx="200" cy="200" r="80" fill="${scheme.accent1}" />
  </g>

  <!-- 中央主标题文字 -->
  <g transform="translate(90, 260)">
    <text font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="52" font-weight="800" fill="${scheme.text}" letter-spacing="-0.5">
      <tspan x="0" y="0">${line1}</tspan>
      ${line2 ? `<tspan x="0" y="70">${line2}</tspan>` : ""}
    </text>
  </g>

  <!-- 底部渐变分割线 -->
  <rect x="90" y="520" width="1020" height="2" fill="url(#accentGrad)" opacity="0.8" />

  <!-- 右下角落款 -->
  <g transform="translate(1110, 565)">
    <text text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="rgba(255, 255, 255, 0.6)" letter-spacing="2">
      FLYING THEME · 序栈
    </text>
  </g>
</svg>`;
}

const files = (await readdir(postsDir)).filter((f) => f.endsWith(".md"));
console.log(`Processing ${files.length} posts for static covers...`);

let count = 0;
for (const file of files) {
  const slug = file.slice(0, -3);
  const filePath = path.join(postsDir, file);
  const content = await readFile(filePath, "utf8");
  const parsed = matter(content);

  const coverFilename = `${slug}.svg`;
  const coverRelativePath = `/assets/images/covers/${coverFilename}`;
  const svgContent = generateSvgCover(parsed.data.title || slug, parsed.data.category, count);

  // 1. 保存静态 SVG 到 public/assets/images/covers/
  await writeFile(path.join(outputCoversDir, coverFilename), svgContent, "utf8");

  // 2. 更新 md 的 frontmatter 中的 cover
  parsed.data.cover = coverRelativePath;
  const updatedContent = matter.stringify(parsed.content, parsed.data);
  await writeFile(filePath, updatedContent, "utf8");

  console.log(`✓ Updated cover for: ${file} -> ${coverRelativePath}`);
  count++;
}

console.log(`All ${count} post static covers generated and updated successfully!`);
