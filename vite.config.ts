import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "clientes.html"),
    },
    outDir: "dist-clientes",
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 👈 isso ensina o Vite o que é "@"
    },
  },
});