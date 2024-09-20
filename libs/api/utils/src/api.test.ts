import { describe, expect, it } from 'bun:test'
import { parseApiKey } from './api'

describe('parseApiKey', () => {
  it('should return invalid for an empty API key', () => {
    expect(parseApiKey('')).toEqual({ isValid: false })
  })
  it('should return valid for a valid PROD API key', () => {
    expect(parseApiKey('PRODPGrFxpGEtrOZfuWhnoJohUYBXuOE')).toEqual({ isValid: true, type: 'PROD' })
  })
  it('should return valid for a valid DEV API key', () => {
    expect(parseApiKey('DEV_3GrFxpGEtrOZfuWhnoJohUYBXuOE')).toEqual({ isValid: true, type: 'DEV' })
  })
  it('should return valid for a valid ROOT API key', () => {
    expect(parseApiKey('ROOTPGrFxpGEtrOZfuWhnoJohUYBXuOE')).toEqual({ isValid: true, type: 'ROOT' })
  })
  it('should return invalid for an API key that is too short', () => {
    expect(parseApiKey('PRODPGrFxpGEtrOZfuWh')).toEqual({ isValid: false })
  })
})
