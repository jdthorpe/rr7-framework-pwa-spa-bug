import {reactRouter} from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {VitePWA} from "vite-plugin-pwa";
import type {VitePWAOptions} from "vite-plugin-pwa";

/* UNCOMMENT TO USE THE BABEL PLUGIN

import babel from "vite-plugin-babel";

const babelConfig = {
  plugins: [
    ["babel-plugin-react-compiler", {}],
    ["@babel/plugin-syntax-jsx", {}],
  ],
  presets: ["@babel/preset-typescript"],
};

*/

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
    /* UNCOMMENT TO USE THE BABEL PLUGIN
    babel({
      babelConfig,
      filter: /\.[jt]sx?$/u,
      loader: "jsx",
    }),
    */
    VitePWA(pwaOptions),
  ],
});
