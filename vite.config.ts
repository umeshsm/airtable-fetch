import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 12500,
  },
  resolve: {
    alias: [{ find: "src", replacement: path.resolve(__dirname, "src") }],
  },
});
