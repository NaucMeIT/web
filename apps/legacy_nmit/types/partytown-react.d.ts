declare module "@builder.io/partytown/react" {
    import type { JSX } from "react"

    export type PartytownProps = {
        readonly debug?: boolean
        readonly forward?: readonly string[]
        readonly lib?: string
        readonly nonce?: string
        readonly resolveUrl?: (...args: readonly unknown[]) => URL | string | void
    }

    export function Partytown(props?: PartytownProps): JSX.Element
}
