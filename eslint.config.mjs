import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
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
      // Existing client widgets intentionally synchronize browser state in effects.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
    },
  },
]);
