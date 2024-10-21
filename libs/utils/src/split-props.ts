import { String, pipe } from 'effect'
import type { SplitProps } from './typescript'

/**
 *
 * @template Props - The full set of props passed to the component.
 * @template Mixins - A tuple of strings representing the mixin prefixes used to split the props.
 *
 * @param {Props} props - The props object to be split.
 * @param {...Mixins} mixins - A list of strings representing the mixin prefixes for splitting props.
 *
 * @returns {SplitProps<Props, Mixins>} - An object with keys for each mixin and a `rest` key containing unsplit props.
 *
 * @param mixins
 * @returns
 */
export const splitProps = <Props, Mixins extends string[]>(
  props: Props,
  ...mixins: Mixins
): SplitProps<Props, Mixins> => {
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
