import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "nanomate-learning-map";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? `/${repoName}/` : "/"),
  plugins: [react()]
});
