import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
// import shopifyClean from '@driver-digital/vite-plugin-shopify-clean'

export default defineConfig({
  build: {
    emptyOutDir: false, // Important: let the plugin handle cleanup, not Vite
  },
  plugins: [
    // shopifyClean(),
    shopify({
      themeRoot: '.',
      sourceCodeDir: 'frontend',
    }),
  ],
})
