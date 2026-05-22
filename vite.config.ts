import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: "src/lib/index.ts",
      name: "PhosphorSvelte",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["svelte"],
      output: {
        globals: { svelte: "Svelte" },
        // Preserve individual modules for tree-shaking
        preserveModules: true,
        preserveModulesRoot: "src/lib",
      },
    },
    // Don't inline svelte — let consumers bundle it
    outDir: "dist",
    emptyOutDir: true,
  },
});
