# S3 Switch

Switch between multiple `.s3cfg` files from the command line.

[![npm version](https://img.shields.io/npm/v/s3-switch.svg)](https://www.npmjs.com/package/s3-switch)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

## Features

- 🔄 Manage multiple S3 configurations
- ⚡ Quick switching between different S3 accounts
- 💬 Interactive prompts for easy configuration management
- 🎯 Simple and intuitive CLI interface

## Installation

```bash
npm install -g s3-switch
```

## Usage

![Usage s3-switch GIF](assets/s3-switch.gif)

### Get Version

```bash
s3s -v
# or
s3s --version
```

### Commands

```bash
s3s add <file> [-n, --name <name>]
```
Add a new S3 configuration from an existing `.s3cfg` file.

```bash
s3s ls
```
List all saved S3 configurations. The currently active configuration is marked with `*`.

```bash
s3s use [name]
```
Switch to a specific S3 configuration. If no name is provided, an interactive prompt will appear.

```bash
s3s save <name>
```
Save the current `.s3cfg` file with a specific name.

```bash
s3s rm [name]
```
Delete a saved S3 configuration. If no name is provided, an interactive prompt will appear.

```bash
s3s mv [-s, --source <source>] [-d, --dest <dest>]
```
Rename a saved S3 configuration.

### Examples

```bash
# Add a new configuration
s3s add ~/.s3cfg-production --name production

# List all configurations
s3s ls

# Switch to production configuration
s3s use production

# Save current configuration
s3s save development

# Remove a configuration
s3s rm old-config
```

## How It Works

s3-switch stores your S3 configurations in `~/.s3-switch/` and manages your active `~/.s3cfg` file by copying the selected configuration to it.

## Requirements

- Node.js >= 18
- s3cmd (for using the S3 configurations)

## Development

This project is written in TypeScript and maintained with pnpm.

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm

### Setup

```bash
pnpm install
```

### Build

```bash
pnpm run build
```

### Test

```bash
pnpm test

# Watch mode
pnpm run test:watch
```

### Type Check

```bash
pnpm run typecheck
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT
