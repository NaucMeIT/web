import spaceTrim from 'spacetrim'

export const trim = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  return spaceTrim(String.raw({ raw: strings }, ...values))
}
