import fs from 'fs-extra'
import path from 'path'
import { glob } from 'glob'
import os from 'os'

const home = os.homedir()
export const s3sDir = path.join(home, '.s3-switch')
export const s3cfgFile = path.join(home, '.s3cfg')

fs.ensureDirSync(s3sDir)
fs.ensureFileSync(s3cfgFile)

function conf(name: string): string {
  return path.join(s3sDir, name)
}

export const content: Record<string, string> = {}
const files = glob.sync(path.join(s3sDir, '/*'))
files.forEach(file => {
  content[path.basename(file)] = fs.readFileSync(file, 'utf8')
})

export const actual = fs.readFileSync(s3cfgFile, 'utf8')

// Create default conf if first
if (actual && Object.keys(content).length === 0) {
  fs.copySync(s3cfgFile, conf('default'))
  content['default'] = actual
}

export const names = Object.keys(content)

export function validName(name: string | undefined): boolean {
  if (!name) {
    return false
  }
  return !!name.match(/^[a-zA-Z0-9-]+$/)
}
