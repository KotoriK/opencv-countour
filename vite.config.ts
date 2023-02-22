import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [solidPlugin(), dts({ rollupTypes: true, })],
  server: {
    port: 3000
  },
  build: {
    target: "esnext",
    minify: false,
    lib: {
      fileName: 'opencv-countour',
      entry: './src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: [/^ol/]
    }
  }
});
