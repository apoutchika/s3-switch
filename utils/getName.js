'use strict'

const inquirer = require('inquirer')
const { validName } = require('./config')

module.exports = (name, cb) => {
  if (typeof name === 'string' && validName(name)) {
    return cb(name)
  }

  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Configuration name :',
        validate: (name) => {
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
