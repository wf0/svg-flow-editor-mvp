import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    port: 5000,
    host: "0.0.0.0",
  },

  worker: {
    format: "es",
  },

  build: {
    // 打包成第三方库-不使用 index.html 为入口文件
    lib: {
      entry: "src/core/index.ts",
      name: "svg-flow-editor-mvp",
      formats: ["es", "cjs", "umd"],
      fileName: "svg-flow-editor-mvp",
    },
  },
});
