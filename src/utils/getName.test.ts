import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getName } from './getName.js'
import inquirer from 'inquirer'

vi.mock('inquirer')

describe('getName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return the name if valid', async () => {
    const result = await getName('valid-name')
    expect(result).toBe('valid-name')
  })

  it('should prompt for name if not provided', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ name: 'prompted-name' })
    
    const result = await getName(undefined)
    
    expect(result).toBe('prompted-name')
    expect(inquirer.prompt).toHaveBeenCalledOnce()
  })

  it('should prompt for name if invalid', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ name: 'valid-name' })
    
    const result = await getName('invalid_name')
    
    expect(result).toBe('valid-name')
    expect(inquirer.prompt).toHaveBeenCalledOnce()
  })
})
