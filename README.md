# Shopify Vite Clean Plugin Sandbox

Minimal repo for testing [@driver-digital/vite-plugin-shopify-clean](https://github.com/DriverDigital/vite-plugin-shopify-clean) before publishing.

Uses [vite-plugin-shopify](https://shopify-vite.barrelny.com/) from Barrel to simulate a real Shopify theme setup.

## Setup

```bash
npm install
```

## Testing a new version

1. In the plugin repo, create a tarball:
   ```bash
   npm run build && npm pack
   ```

2. Install it here:
   ```bash
   npm install /path/to/driver-digital-vite-plugin-shopify-clean-X.Y.Z.tgz
   ```

3. Uncomment the plugin import and usage in `vite.config.js`

4. Test cleanup:
   ```bash
   npm run test-plugin
   ```

5. Verify:
   - Stale files (`*-OLD*.js`, `*-OLD*.css`) are deleted
   - New hashed files exist in `assets/`
   - Manifest is updated at `assets/.vite/manifest.json`

## Testing watch mode

1. Run: `npm run dev`
2. Modify `frontend/entrypoints/theme.js` (e.g., change the console.log message)
3. Save and verify old hash files are cleaned up

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Run Vite build |
| `npm run dev` | Run Vite in watch mode |
| `npm run clean` | Remove all built assets |
| `npm run simulate-stale` | Create fake stale files for testing |
| `npm run test-plugin` | Simulate stale files + build (full test) |

## Expected results

After `npm run test-plugin`:

| File | Should exist? |
|------|---------------|
| `assets/theme-OLD1234.js` | No (cleaned) |
| `assets/theme-OLD5678.css` | No (cleaned) |
| `assets/product-OLD9abc.js` | No (cleaned) |
| `assets/deleted-OLDdef0.js` | No (cleaned) |
| `assets/theme-[newhash].js` | Yes |
| `assets/theme-[newhash].css` | Yes |
| `assets/product-[newhash].js` | Yes |
| `assets/.vite/manifest.json` | Yes (updated) |

## Directory structure

```
sandbox-vite-plugin-shopify-clean/
├── assets/              # Vite output (gitignored)
│   └── .vite/           # Manifest location
├── frontend/
│   ├── entrypoints/
│   │   ├── theme.js     # Main entry point (imports scripts + CSS)
│   │   └── scripts/     # JS modules
│   │       ├── theme.js
│   │       └── product.js
│   └── styles/
│       └── theme.css
├── scripts/
│   └── create-stale-files.js
├── snippets/            # vite-plugin-shopify output (gitignored)
├── package.json
└── vite.config.js
```
