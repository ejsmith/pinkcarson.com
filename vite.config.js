import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  return {
    base: `${(env.PAGES_BASE_PATH || "").replace(/\/$/, "")}/`,
    server: { host: "0.0.0.0" },
  };
});
