import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  return {
    base: `${(env.PAGES_BASE_PATH || "").replace(/\/$/, "")}/`,
    server: { host: "0.0.0.0" },
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL("./index.html", import.meta.url)),
          // Unlisted page shared directly with family and friends; nothing links to it.
          chiefHopper: fileURLToPath(new URL("./chief-hopper/index.html", import.meta.url)),
        },
      },
    },
  };
});
