# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-02-27

### Changed
- Migrated entire codebase to TypeScript
- Updated all dependencies to latest major versions:
  - chalk: 2.4.2 → 5.6.2
  - commander: 3.0.0 → 14.0.3
  - fs-extra: 8.1.0 → 11.3.3
  - glob: 7.1.4 → 13.0.6
  - inquirer: 6.5.1 → 13.3.0
- Replaced `user-home` with native `os.homedir()`
- Refactored callback-based functions to async/await
- Improved error handling and type safety
- Migrated to pnpm as package manager
- Fixed devDependencies versions (removed ^ for reproducibility)
- Simplified documentation to focus on CLI usage

### Added
- Full TypeScript support with type declarations
- CommonJS and ESM dual module support
- Unit tests with Vitest (9 tests)
- Test coverage reporting
- Type checking script
- Programmatic API exports for library usage
- Development documentation in MIGRATION.md and CONTRIBUTING.md
- Node.js version requirement (>=18.0.0)
- pnpm as package manager with strict dependency management
- GitHub Actions CI workflow
- .npmrc configuration for strict dependency management

### Fixed
- Improved validation logic for configuration names
- Better error messages

### Removed
- Legacy JavaScript files (index.js, utils/)
- package-lock.json (replaced with pnpm-lock.yaml)

## [0.0.6] - Previous version

Previous JavaScript implementation.
