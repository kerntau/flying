// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

export default defineConfig({
  srcDir: "./app",
  build: {
    assets: "assets",
  },
  integrations: [vue()],
});
