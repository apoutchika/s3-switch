import inquirer from 'inquirer'
import { validName } from './config.js'

export async function getName(name: string | undefined): Promise<string> {
  if (typeof name === 'string' && validName(name)) {
    return name
  }

  const res = await inquirer.prompt<{ name: string }>([
    {
      type: 'input',
      name: 'name',
      message: 'Configuration name :',
      validate: (name: string) => {
        if (!validName(name)) {
          return 'The name must be a string match with a-zA-Z0-9-'
        }
        return true
      }
    }
  ])

  return res.name
}
