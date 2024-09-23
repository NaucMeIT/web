import type { RandomIdentifierOptions } from './typescript'

export function generateRandomIdentifier(options?: Partial<RandomIdentifierOptions>): string {
  const staticPrefix = options?.prefix || 'crs'
  const randomPrefix = randomStringGenerator(5)
  const timestamp = options?.timestamp || Date.now()
  const dynamicSuffix = randomStringGenerator(12)

  return `${staticPrefix}::${randomPrefix}-${timestamp}-${dynamicSuffix}`
    .toLowerCase()
    .slice(0, options?.maxLength || 32)
}

export function randomStringGenerator(length: number): string {
  return Array.from({ length: length }, (_) => randomChar()).join('')
}

export function randomChar(): string {
  const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return CHARS.charAt(rand(0, CHARS.length - 1))
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
