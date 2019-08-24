'use strict'

const inquirer = require('inquirer')
const { names, validName } = require('./config')

module.exports = (name, cb) => {
  let choices = names
  if (
    typeof name === 'string' &&
    validName(name) &&
    choices.indexOf(name) !== -1
  ) {
    return cb(name)
  }

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'name',
        choices,
        message: 'Choose s3 configuration :',
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
