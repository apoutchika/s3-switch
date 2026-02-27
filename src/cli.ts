import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'
import { selectName } from './utils/selectName.js'
import { getName } from './utils/getName.js'
import path from 'path'
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'

import {
  actual,
  s3cfgFile,
  names,
  content,
  validName,
  s3sDir
} from './utils/config.js'

// Get package.json version
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
)

const program = new Command()

program
  .name('s3s')
  .description('Switch between multiple s3cfg files')
  .version(packageJson.version, '-v, --version', 'Output the current version')

program
  .command('add <file>')
  .option('-n, --name <name>', 's3 name')
  .description('Add s3 config from s3cfg file.')
  .action(async (file: string, options: { name?: string }) => {
    const name = await getName(options.name)
    await fs.copy(
      path.resolve(process.cwd(), file),
      path.join(s3sDir, name)
    )
  })

program
  .command('ls')
  .description('List s3 config.')
  .action(() => {
    names.forEach(name => {
      if (content[name] === actual) {
        console.log(chalk.blue(`* ${name}`))
      } else {
        console.log(`- ${name}`)
      }
    })
  })

program
  .command('rm [name]')
  .description('Delete saved s3 config.')
  .action(async (name?: string) => {
    const selectedName = await selectName(name)
    const res = await inquirer.prompt<{ ok: boolean }>([
      {
        type: 'confirm',
        name: 'ok',
        message: `Delete ${selectedName} ? `
      }
    ])
    if (res.ok) {
      await fs.remove(path.join(s3sDir, selectedName))
    }
  })

program
  .command('save <name>')
  .description('Save actual s3 config.')
  .action(async (name: string) => {
    if (!validName(name)) {
      console.log(chalk.red.bold('Name must has string.'))
      process.exit(1)
    }
    await fs.copy(s3cfgFile, path.join(s3sDir, name))
  })

program
  .command('use [name]')
  .description('Use s3 config.')
  .action(async (name?: string) => {
    const selectedName = await selectName(name)
    await fs.copy(path.join(s3sDir, selectedName), s3cfgFile, { overwrite: true })
  })

function goodDest(name: string | undefined): string | true {
  if (!validName(name)) {
    return 'The name must be a string match with a-zA-Z0-9-'
  }
  if (names.indexOf(name!) !== -1) {
    return 'This name already exists.'
  }

  return true
}

program
  .command('mv')
  .description('Rename s3 config.')
  .option('-s, --source <source>', 'S3 config name source')
  .option('-d, --dest <dest>', 'S3 config name destination')
  .action(async (options: { source?: string; dest?: string }) => {
    const source = await selectName(options.source)
    if (goodDest(options.dest) === true) {
      fs.renameSync(
        path.join(s3sDir, source),
        path.join(s3sDir, options.dest!)
      )
      return
    }

    const res = await inquirer.prompt<{ dest: string }>([
      {
        type: 'input',
        name: 'dest',
        default: options.dest,
        message: `Rename ${source} dest :`,
        validate: (dest: string) => {
          if (!validName(dest)) {
            return 'The name must be a string match with a-zA-Z0-9-'
          }
          if (names.indexOf(dest) !== -1) {
            return 'This name already exists.'
          }
          return true
        }
      }
    ])
    fs.renameSync(path.join(s3sDir, source), path.join(s3sDir, res.dest))
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
