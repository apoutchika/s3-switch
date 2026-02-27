# Release v1.0.0

## Summary

Major rewrite of s3-switch with TypeScript migration and comprehensive improvements.

## Commits Made

1. **chore: add TypeScript and build configuration** (40a3eae)
   - Added tsconfig.json, vitest.config.ts, tsup.config.ts, .npmrc

2. **feat: migrate codebase to TypeScript** (d88ed8a)
   - Converted all JavaScript to TypeScript with strict types
   - Refactored callbacks to async/await
   - Added version flag support

3. **chore: remove legacy JavaScript files** (4215f7c)
   - Removed index.js and utils/ directory

4. **chore: migrate from npm to pnpm** (e224d03)
   - Replaced package-lock.json with pnpm-lock.yaml

5. **feat: update dependencies to latest versions** (b4fe328)
   - Updated all dependencies to latest major versions
   - Added TypeScript and testing dependencies

6. **chore: update ignore files** (d947c9d)
   - Updated .gitignore and added .npmignore

7. **ci: add GitHub Actions workflow** (650c324)
   - Added CI for Node.js 18, 20, 22

8. **docs: add comprehensive documentation** (abe0918)
   - Added CHANGELOG.md, MIGRATION.md, CONTRIBUTING.md

9. **docs: update README with new features** (754d64e)
   - Updated README with badges and new documentation

10. **chore: bump version to 1.0.0** (dfa9a16)
    - Updated version to 1.0.0
    - Updated CHANGELOG with release date

## Tag Created

**v1.0.0** - Annotated tag with full release notes

## To Push to Remote

```bash
# Push commits
git push origin master

# Push tag
git push origin v1.0.0

# Or push everything at once
git push origin master --tags
```

## To Publish to npm

```bash
# Make sure everything is built
pnpm run build

# Run tests one more time
pnpm test

# Publish (will run prepublishOnly script automatically)
npm publish

# Or if you want to test first
npm publish --dry-run
```

## Breaking Changes

- Requires Node.js >= 18
- All dependencies updated to latest major versions
- Development now uses pnpm instead of npm

## Migration Guide

Users upgrading from 0.0.6 should see MIGRATION.md for details.
