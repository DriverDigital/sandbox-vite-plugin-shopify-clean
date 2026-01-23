import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const assetsDir = 'assets'
const viteDir = join(assetsDir, '.vite')

// Ensure directories exist
mkdirSync(viteDir, { recursive: true })

// Create fake old manifest (mimics vite-plugin-shopify output)
const oldManifest = {
  'frontend/entrypoints/main.js': {
    file: 'main-OLD1234.js',
    src: 'frontend/entrypoints/main.js',
    isEntry: true,
    css: ['main-OLD5678.css']
  },
  'frontend/fonts/example.woff2': {
    file: 'example-OLDabcd.woff2',
    src: 'frontend/fonts/example.woff2'
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
  'main-OLD1234.js',
  'main-OLD5678.css',
  'example-OLDabcd.woff2',  // Stale font file
  'deleted-OLDdef0.js',     // Entry that no longer exists in source
]

staleFiles.forEach(file => {
  writeFileSync(join(assetsDir, file), `// Stale file: ${file}\n`)
})

console.log('Created stale files:')
staleFiles.forEach(f => console.log(`  - assets/${f}`))
console.log(`  - assets/.vite/manifest.json`)
console.log('\nRun "npm run build" to verify plugin cleans these up.')
