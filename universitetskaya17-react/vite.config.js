import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" — чтобы сборка работала и на GitHub Pages в подпапке,
// и при открытии со статического хостинга без настройки корня.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
