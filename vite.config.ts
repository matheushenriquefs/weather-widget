/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 3333,
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "commitlint.config.js",
        ".eslintrc.cjs",
        "src/vite-env.d.ts",
        "src/main.ts",
      ],
    },
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
});
