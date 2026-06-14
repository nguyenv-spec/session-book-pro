import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    // Keep Lovable's core server configurations untouched
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // Forces Nitro to build optimized Vercel server chunks
      }),
    ],
  },
});
