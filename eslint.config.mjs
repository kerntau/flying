import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals.js";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default defineConfig([
  ...compat.config(nextVitals),
  globalIgnores([
    ".next/**",
    ".astro/**",
    "out/**",
    "node_modules/**",
    "app/**/*.astro",
    "app/content.config.ts",
    "astro.config.mjs",
    "uno.config.ts",
    "unocss/**",
  ]),
  {
    files: ["app/**/*.ts", "app/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);
