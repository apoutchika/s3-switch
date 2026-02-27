# Migration to TypeScript

## Changes Made

### Project Structure
- Source code moved to `src/` folder
- Compiled code generated in `dist/` folder
- Separation of CLI (`src/cli.ts`) and API (`src/index.ts`)

### Updated Dependencies
- `chalk`: 2.4.2 → 5.3.0
- `commander`: 3.0.0 → 12.1.0
- `fs-extra`: 8.1.0 → 11.2.0
- `glob`: 7.1.4 → 11.0.0
- `inquirer`: 6.5.1 → 10.2.2
- Removed `user-home` (replaced with `os.homedir()`)

### New Development Dependencies
- `typescript`: 5.7.2
- `tsup`: 8.3.5 (for building)
- `vitest`: 2.1.8 (for testing)
- `@types/node`, `@types/fs-extra`, `@types/inquirer`

### Compatibility
- CommonJS and ESM support
- Generated files: `.js` (ESM) and `.cjs` (CommonJS)
- TypeScript declarations: `.d.ts` and `.d.cts`

### Tests
- 9 unit tests with Vitest
- Coverage of main functions: `validName`, `getName`, `selectName`

### npm Scripts
- `npm run build`: Compiles the TypeScript project
- `npm test`: Runs tests
- `npm run typecheck`: Checks TypeScript types
- `npm run test:watch`: Runs tests in watch mode

## Migration for End Users

No changes are required for end users. The `s3s` CLI works exactly the same way.

## Migration for Developers

If you import this module in your code:

### ESM (recommended)
```javascript
import { validName, getName, selectName } from 's3-switch'
```

### CommonJS
```javascript
const { validName, getName, selectName } = require('s3-switch')
```

Both formats are automatically supported thanks to the exports configuration in `package.json`.
