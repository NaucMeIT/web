export type LooseAutocomplete<T extends string> = T | Omit<string, T>

export type Mutable<T> = {
  -readonly [k in keyof T]: T[k]
}
