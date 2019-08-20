'use strict'

const inquirer = require('inquirer')
const { validName } = require('./config')

module.exports = (options, cb) => {
  if (typeof options.name === 'string' && validName(options.name)) {
    return cb(options.name)
  }

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Configuration name :',
        validate: (name, b, c) => {
          if (!validName(name)) {
            return 'The name must be a string match with a-zA-Z0-9-'
          }
          return true
        }
      }
    ])
    .then(res => {
      return cb(res.name)
    })
}
