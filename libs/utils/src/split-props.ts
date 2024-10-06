import { String, pipe } from 'effect'
import type { SplitProps } from './typescript'

export const splitProps = <Props, Mixins extends string[]>(props: Props, ...mixins: Mixins) => {
  const result: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}
  for (const mixinKey of mixins) result[mixinKey] = {}

  for (const key in props) {
    let split = false
    for (const mixinKey of mixins) {
      if (!String.startsWith(mixinKey)(key)) continue
      split = true
      const splitKey = pipe(key, String.substring(mixinKey.length), String.uncapitalize)
      const splitProps = result[mixinKey] as Record<string, unknown>
      splitProps[splitKey] = props[key]
    }
    if (!split) rest[key] = props[key]
  }

  result['rest'] = rest
  return result as SplitProps<Props, Mixins>
}
