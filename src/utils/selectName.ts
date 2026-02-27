import inquirer from 'inquirer'
import { names, validName } from './config.js'

export async function selectName(name: string | undefined): Promise<string> {
  const choices = names
  if (
    typeof name === 'string' &&
    validName(name) &&
    choices.indexOf(name) !== -1
  ) {
    return name
  }

  const res = await inquirer.prompt<{ name: string }>([
    {
      type: 'list',
      name: 'name',
      choices,
      message: 'Choose s3 configuration :'
    }
  ])

  return res.name
}
