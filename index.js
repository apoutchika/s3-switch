#!/usr/bin/env node

'use strict'

const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')
const selectName = require('./utils/selectName')
const getName = require('./utils/getName')
const path = require('path')

const {
  actual,
  s3cfgFile,
  names,
  content,
  validName,
  s3sDir
} = require('./utils/config')

program
  .command('add <file>')
  .option('-n, --name <name>', 's3 name')
  .description('Add s3 config from s3cfg file.')
  .action((file, options) => {
    getName(options, name => {
      return fs.copy(
        path.resolve(process.cwd(), file),
        path.join(s3sDir, name)
      )
    })
  })

program
  .command('ls')
  .description('List s3 config.')
  .action(() => {
    names.map(name => {
      if (content[name] === actual) {
        return console.log(chalk.blue(`* ${name}`))
      }
      console.log(`- ${name}`)
    })
  })

program
  .command('rm <name>')
  .description('Delete saved s3 config.')
  .action(name => {
    if (!validName(name)) {
      console.log(
        chalk.red.bold('The name must be a string match with a-zA-Z0-9-')
      )
      return process.exit(1)
    }

    fs.remove(path.join(s3sDir, name))
  })

program
  .command('save <name>')
  .description('Save actual s3 config.')
  .action(name => {
    if (!validName(name)) {
      console.log(chalk.red.bold('Name must has string.'))
      return process.exit(1)
    }
    fs.copy(s3cfgFile, path.join(s3sDir, name))
  })

program
  .command('use [name]')
  .description('Use s3 config.')
  .action(name => {
    selectName(name, name => {
      fs.copy(path.join(s3sDir, name), s3cfgFile, { overwrite: true })
    })
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
