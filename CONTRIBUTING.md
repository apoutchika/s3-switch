# Contributing to S3 Switch

Thank you for your interest in contributing to S3 Switch! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/your-username/s3-switch.git
cd s3-switch
```

2. Install pnpm (if not already installed)
```bash
npm install -g pnpm
```

3. Install dependencies
```bash
pnpm install
```

4. Build the project
```bash
pnpm run build
```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or bugfix
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes in the `src/` directory

3. Run type checking
```bash
pnpm run typecheck
```

4. Build the project
```bash
pnpm run build
```

5. Run tests
```bash
pnpm test
```

### Writing Tests

We use Vitest for testing. Tests should be placed next to the source files with a `.test.ts` extension.

Example:
```typescript
import { describe, it, expect } from 'vitest'
import { validName } from './config.js'

describe('validName', () => {
  it('should return true for valid names', () => {
    expect(validName('test-123')).toBe(true)
  })
})
```

Run tests in watch mode during development:
```bash
pnpm run test:watch
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Commit Messages

Follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test additions or changes
- `refactor:` for code refactoring
- `chore:` for maintenance tasks

Example:
```
feat: add support for multiple S3 profiles
fix: handle missing configuration files gracefully
docs: update README with new examples
```

## Testing Your Changes

Before submitting a pull request:

1. Ensure all tests pass
```bash
pnpm test
```

2. Check TypeScript types
```bash
pnpm run typecheck
```

3. Build the project
```bash
pnpm run build
```

4. Test the CLI locally
```bash
node dist/cli.js --help
```

## Submitting a Pull Request

1. Push your changes to your fork
```bash
git push origin feature/your-feature-name
```

2. Create a pull request on GitHub

3. Describe your changes clearly in the PR description

4. Link any related issues

5. Wait for review and address any feedback

## Project Structure

```
s3-switch/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── index.ts            # Library exports
│   └── utils/
│       ├── config.ts       # Configuration management
│       ├── getName.ts      # Name input helper
│       └── selectName.ts   # Name selection helper
├── dist/                   # Compiled output (generated)
├── tests/                  # Test files
└── package.json
```

## Questions?

If you have questions, feel free to:
- Open an issue on GitHub
- Check existing issues and discussions

Thank you for contributing!
