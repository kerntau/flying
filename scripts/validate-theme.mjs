import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const requiredFiles = [
  "app/content.config.ts",
  "app/data/site.ts",
  "app/layouts/SiteLayout.astro",
  "app/pages/index.astro",
  "app/pages/archives.astro",
  "app/pages/categories/index.astro",
  "app/pages/tags/index.astro",
  "app/pages/photos/index.astro",
  "app/pages/links.astro",
  "app/pages/authors/index.astro",
  "app/components/PostCard.astro",
  "app/components/Sidebar.astro",
  "app/components/theme/ThemeSwitcher.vue",
  "astro.config.mjs",
  "uno.config.ts",
  "public/assets/css/style.css",
  "public/assets/css/uno.css",
  "public/assets/fonts/Geist-Variable.woff2",
  "public/assets/images/avatar.svg",
  "public/assets/images/fallback-cover.svg",
  "unocss/theme.ts",
  "unocss/shortcuts/index.ts",
  "unocss/preflights/index.ts",
  "public/assets/js/script.js",
];

const missing = [];
const invalid = [];

for (const file of requiredFiles) {
  try {
    await access(join(process.cwd(), file));
  } catch {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error("Missing required theme files:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

const standaloneFiles = requiredFiles.filter(
  (file) =>
    file.startsWith("app/") ||
    file === "astro.config.mjs" ||
    file === "uno.config.ts",
);
const forbiddenPatterns = [
  { label: "Thymeleaf attribute", pattern: /\bth:/ },
  {
    label: "Halo runtime reference",
    pattern: /\bhalo\b|theme\.config|Finder|finder/u,
  },
];

for (const file of standaloneFiles) {
  const source = await readFile(join(process.cwd(), file), "utf8");
  for (const check of forbiddenPatterns) {
    if (check.pattern.test(source)) {
      invalid.push(`${file}: ${check.label}`);
    }
  }
}

if (invalid.length > 0) {
  console.error("Invalid standalone site content:");
  for (const item of invalid) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Standalone site structure OK.");
