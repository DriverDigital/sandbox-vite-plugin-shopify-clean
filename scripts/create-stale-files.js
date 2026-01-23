import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const assetsDir = 'assets'
const viteDir = join(assetsDir, '.vite')

// Ensure directories exist
mkdirSync(viteDir, { recursive: true })

// Create fake old manifest (mimics vite-plugin-shopify output)
const oldManifest = {
  'frontend/entrypoints/theme.js': {
    file: 'theme-OLD1234.js',
    src: 'frontend/entrypoints/theme.js',
    isEntry: true,
    css: ['theme-OLD5678.css']
  },
  'frontend/entrypoints/product.js': {
    file: 'product-OLD9abc.js',
    src: 'frontend/entrypoints/product.js',
    isEntry: true
  },
  'frontend/entrypoints/deleted-entry.js': {
    file: 'deleted-OLDdef0.js',
    src: 'frontend/entrypoints/deleted-entry.js',
    isEntry: true
  }
}

writeFileSync(join(viteDir, 'manifest.json'), JSON.stringify(oldManifest, null, 2))

// Create corresponding stale asset files
const staleFiles = [
  'theme-OLD1234.js',
  'theme-OLD5678.css',
  'product-OLD9abc.js',
  'deleted-OLDdef0.js', // Entry that no longer exists in source
]

staleFiles.forEach(file => {
  writeFileSync(join(assetsDir, file), `// Stale file: ${file}\n`)
})

console.log('Created stale files:')
staleFiles.forEach(f => console.log(`  - assets/${f}`))
console.log(`  - assets/.vite/manifest.json`)
console.log('\nRun "npm run build" to verify plugin cleans these up.')
