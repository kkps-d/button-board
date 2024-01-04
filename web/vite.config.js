import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, "app", "index.html"),
        "app-oobe": resolve(__dirname, "app-oobe", "index.html"),
        configure: resolve(__dirname, "configure", "index.html"),
      },
    },
  },
});
