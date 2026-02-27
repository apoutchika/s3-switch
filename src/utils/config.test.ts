import { describe, it, expect } from 'vitest'
import { validName } from './config.js'

describe('config', () => {
  describe('validName', () => {
    it('should return true for valid names', () => {
      expect(validName('test')).toBe(true)
      expect(validName('test-123')).toBe(true)
      expect(validName('MyConfig')).toBe(true)
      expect(validName('config-1')).toBe(true)
    })

    it('should return false for invalid names', () => {
      expect(validName(undefined)).toBe(false)
      expect(validName('')).toBe(false)
      expect(validName('test_config')).toBe(false)
      expect(validName('test config')).toBe(false)
      expect(validName('test@config')).toBe(false)
      expect(validName('test.config')).toBe(false)
    })
  })
})
