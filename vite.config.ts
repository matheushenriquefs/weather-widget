/// <reference types="vitest" />
import { resolve } from "path";

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    visualizer({
      gzipSize: true,
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 3333,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "WeatherWidget",
      fileName: "weather-widget",
    },
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
