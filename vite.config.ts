import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";

const entry = "src/index.tsx";
export default defineConfig({
  plugins: [
    devServer({
      adapter,
      entry,
    }),
    ssg({
      entry,
    }),
  ],
  resolve: {
    alias: {
      "@/": `${__dirname}/src/`,
    },
  },
});
