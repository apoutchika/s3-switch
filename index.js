#!/usr/bin/env node

'use strict'

const program = require('commander')
const fs = require('fs-extra')
const chalk = require('chalk')
const selectName = require('./utils/selectName')
const getName = require('./utils/getName')
const path = require('path')
const inquirer = require('inquirer')

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
    getName(options.name, name => {
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
  .command('rm [name]')
  .description('Delete saved s3 config.')
  .action(name => {
    selectName(name, name => {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'ok',
            message: `Delete ${name} ? `
          }
        ])
        .then(res => {
          if (res.ok) {
            fs.remove(path.join(s3sDir, name))
          }
        })
    })
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

function goodDest (name) {
  if (!validName(name)) {
    return 'The name must be a string match with a-zA-Z0-9-'
  }
  if (names.indexOf(name) !== -1) {
    return 'This name already exists.'
  }

  return true
}

program
  .command('mv')
  .description('Rename s3 config.')
  .option('-s, --source <source>', 'S3 config name source')
  .option('-d, --dest <dest>', 'S3 config name destination')
  .action(options => {
    selectName(options.source, source => {
      if (goodDest(options.dest) === true) {
        return fs.renameSync(
          path.join(s3sDir, source),
          path.join(s3sDir, options.dest)
        )
      }

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'dest',
            default: options.dest,
            message: `Rename ${source} dest :`,
            validate: dest => {
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
        .then(res => {
          fs.renameSync(path.join(s3sDir, source), path.join(s3sDir, res.dest))
        })
    })
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
