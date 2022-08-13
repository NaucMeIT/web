import { LinkProps } from "next/link"

export function isExternalUrl(url: LinkProps["href"]): boolean {
    return /^(https?:)?\/\//.test(url.toString())
}
