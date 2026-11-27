import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: "0.0.0.0",
  },
  preview: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(new URL(".", import.meta.url)), "index.html"),
        ko: resolve(fileURLToPath(new URL(".", import.meta.url)), "ko/index.html"),
        havenHelp: resolve(fileURLToPath(new URL(".", import.meta.url)), "products/haven-desktop/index.html"),
        havenHelpKo: resolve(fileURLToPath(new URL(".", import.meta.url)), "ko/products/haven-desktop/index.html"),
        havenVscodeHelp: resolve(fileURLToPath(new URL(".", import.meta.url)), "products/haven-vscode/index.html"),
        havenVscodeHelpKo: resolve(fileURLToPath(new URL(".", import.meta.url)), "ko/products/haven-vscode/index.html"),
      },
    },
  },
});
