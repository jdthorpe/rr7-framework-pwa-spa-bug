import {reactRouter} from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {VitePWA} from "vite-plugin-pwa";
import type {VitePWAOptions} from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  srcDir: "app",
  filename: "sw.ts",
  strategies: "injectManifest",
  injectManifest: {
    minify: false,
  },
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    VitePWA({registerType: "autoUpdate"}),
  ],
});
