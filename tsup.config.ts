import { defineConfig } from 'tsup'
import { copyFileSync } from 'fs'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts'
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    shims: true,
    splitting: false,
    sourcemap: true
  },
  {
    entry: {
      cli: 'src/cli.ts'
    },
    format: ['esm', 'cjs'],
    dts: true,
    shims: true,
    splitting: false,
    sourcemap: true,
    esbuildOptions(options) {
      options.banner = {
        js: '#!/usr/bin/env node'
      }
    },
    onSuccess: async () => {
      // Copy package.json to dist for version reading
      copyFileSync('package.json', 'dist/package.json')
    }
  }
])
