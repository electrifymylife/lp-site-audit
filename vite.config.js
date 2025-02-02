import { defineConfig } from 'vite';
import autoprefixer from "autoprefixer"
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer({
        overrideBrowserslist: ["last 2 version"]
      })],
    },
  },
})
