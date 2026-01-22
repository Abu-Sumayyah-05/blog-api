import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
