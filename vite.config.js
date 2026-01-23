import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
// Plugin will be imported after installing the tarball
// import shopifyClean from '@driver-digital/vite-plugin-shopify-clean'

export default defineConfig({
  build: {
    emptyOutDir: false, // Important: let the plugin handle cleanup, not Vite
  },
  plugins: [
    // shopifyClean(), // Uncomment after installing - must be BEFORE shopify()
    shopify({
      themeRoot: '.',
      sourceCodeDir: 'frontend',
    }),
  ],
})
