import { Types } from 'effect'

export type LooseAutocomplete<T extends string> = T | Omit<string, T>

export type Mutable<T> = {
  -readonly [k in keyof T]: T[k]
}

export interface RandomIdentifierOptions {
  prefix: string
  timestamp: number
  maxLength: number
}

export type OverrideProps<Base, Extend> = Extend & Omit<Base, keyof Extend>

export type MixinProps<Mixin extends string, Props> = {
  [Key in keyof Props as `${Mixin}${Capitalize<Key & string>}`]: Props[Key]
}

export type SplitProps<Props, Mixins extends string[]> = {
  [Mixin in Mixins[number]]: {
    [MixinKey in keyof Props as MixinKey extends `${Mixin}${infer Key}` ? Uncapitalize<Key> : never]: Props[MixinKey]
  }
} & {
  rest: Types.Simplify<
    Omit<
      Props,
      {
        [Mixin in Mixins[number]]: keyof {
          [MixinKey in keyof Props as MixinKey extends `${Mixin}${string}` ? MixinKey : never]: never
        }
      }[Mixins[number]]
    >
  >
}
