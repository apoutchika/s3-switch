'use strict'

const home = require('user-home')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const s3sDir = path.join(home, '.s3-switch')
const s3cfgFile = path.join(home, '.s3cfg')

fs.ensureDirSync(s3sDir)
fs.ensureFileSync(s3cfgFile)

// Get config path
function conf (name) {
  return path.join(s3sDir, name)
}

const content = {}
glob.sync(path.join(s3sDir, '/*')).map(file => {
  content[path.basename(file)] = fs.readFileSync(file, 'utf8')
})

const actual = fs.readFileSync(s3cfgFile, 'utf8')

// Create default conf if first
if (actual && Object.keys(content).length === 0) {
  fs.copySync(s3cfgFile, conf('default'))
  content['default'] = actual
}

module.exports = {
  names: Object.keys(content),
  actual,
  content,
  validName (name) {
    return !!name.match(/^[a-zA-Z0-9-]+$/)
  },
  s3sDir,
  s3cfgFile
}
