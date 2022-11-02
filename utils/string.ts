import { LinkProps } from "next/link"

export function isExternalUrl(url: LinkProps["href"]): boolean {
    return /^(https?:)?\/\//.test(url.toString())
}

export const getSourceId = (source: string) =>
    source
        .toLowerCase()
        .replaceAll(" ", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
