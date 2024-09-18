import { describe, expect, it } from 'bun:test'
import { isDateBeforeNow } from './date'

describe('isDateBeforeNow', () => {
  it('is', () => {
    expect(isDateBeforeNow(new Date('2000-01-01'))).toBeTruthy()
  })
  it('is not', () => {
    expect(isDateBeforeNow(new Date('3500-01-01'))).toBeFalsy()
  })
})
