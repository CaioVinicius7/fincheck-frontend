import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "@router": path.resolve(__dirname, "./src/router"),
      "@assets": path.resolve(__dirname, "./src/assets"),

      "@config": path.resolve(__dirname, "./src/app/config"),
      "@contexts": path.resolve(__dirname, "./src/app/contexts"),
      "@hooks": path.resolve(__dirname, "./src/app/hooks"),
      "@services": path.resolve(__dirname, "./src/app/services"),
      "@utils": path.resolve(__dirname, "./src/app/utils"),
      "@entities": path.resolve(__dirname, "./src/app/entities"),

      "@components": path.resolve(__dirname, "./src/view/Components"),
      "@layouts": path.resolve(__dirname, "./src/view/layouts"),
      "@pages": path.resolve(__dirname, "./src/view/pages")
    }
  }
});
