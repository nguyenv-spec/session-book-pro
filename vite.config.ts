import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    // Leave Lovable's native internal properties untouched here
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // Forces Nitro to compile your app into Vercel Functions
      }),
    ],
  },
});
