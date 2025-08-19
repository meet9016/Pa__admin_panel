import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://pa.2-min.in", // your backend domain
        changeOrigin: true,
        secure: false, // if backend uses self-signed SSL, keep false
        rewrite: (path) => path.replace(/^\/api/, ""), // remove `/api` prefix
      },
    },
  },
});
