import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-infinite-scroll-component"],
  },
  resolve: {
    alias: {
      styles: "/src/styles",
      components: "/src/components",
      pages: "/src/pages",
      assets: "/src/assets",
      services: "/src/services",
      utils: "/src/utils",
      hooks: "/src/hooks",
      interface: "/src/interface",
      store: "/src/store",
      layout: "/src/layout",
    },
  },
});
