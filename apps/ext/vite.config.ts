import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        transaction: resolve(__dirname, "src/transaction.html"),
        index: resolve(__dirname, "src/index.html"),
      },
    },
  },
  plugins: [vanillaExtractPlugin({}), react(), crx({ manifest })],
});
