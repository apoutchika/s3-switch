import { describe, it, expect, vi, beforeEach } from 'vitest'
import { selectName } from './selectName.js'
import inquirer from 'inquirer'

vi.mock('inquirer')
vi.mock('./config.js', () => ({
  names: ['config1', 'config2', 'default'],
  validName: (name: string | undefined) => {
    if (!name) return false
    return !!name.match(/^[a-zA-Z0-9-]+$/)
  }
}))

describe('selectName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return the name if valid and exists', async () => {
    const result = await selectName('config1')
    expect(result).toBe('config1')
  })

  it('should prompt for name if not provided', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ name: 'config2' })
    
    const result = await selectName(undefined)
    
    expect(result).toBe('config2')
    expect(inquirer.prompt).toHaveBeenCalledOnce()
  })

  it('should prompt for name if invalid', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ name: 'default' })
    
    const result = await selectName('invalid_name')
    
    expect(result).toBe('default')
    expect(inquirer.prompt).toHaveBeenCalledOnce()
  })

  it('should prompt for name if not in list', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ name: 'config1' })
    
    const result = await selectName('nonexistent')
    
    expect(result).toBe('config1')
    expect(inquirer.prompt).toHaveBeenCalledOnce()
  })
})
