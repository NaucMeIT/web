import spaceTrim from 'spacetrim'

export const trim = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  return spaceTrim(String.raw({ raw: strings }, ...values))
}

export function createSafeKey(title: string) {
  return `key-${title.replaceAll(/[^a-zA-Z0-9]/g, '-')}`
}
