import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import federation from "module-federation-vite";
import path from "path";
import { defineConfig } from "vite";
import mfConfig from "./module-federation/federation.config.cjs";

export default defineConfig(async ({ command }) => ({
  server: {
    fs: {
      allow: [".", "../shared"],
    },
    proxy: { "/src/remote_assets": "http://localhost:4174/" },
  },
  resolve:
    command === "serve"
      ? {
          alias: {
            vue: path.resolve(
              __dirname,
              "./node_modules/vue/dist/vue.runtime.esm-bundler.js"
            ),
            pinia: path.resolve(
              __dirname,
              "./node_modules/pinia/dist/pinia.mjs"
            ),
            shared: path.resolve(__dirname, "../shared/shared"),
          },
        }
      : {},
  plugins: [
    
    await federation(mfConfig),
    vue(),
    vueJsx(),
  ],
}));
