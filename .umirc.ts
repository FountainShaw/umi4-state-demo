import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "ZustandPage" },
    { path: "/dva", component: "DvaPage" },
    { path: "/hox", component: "HoxPage" },
  ],
  plugins: ['@umijs/plugins/dist/dva'],
  dva: {},
  npmClient: 'pnpm',
});
