import { LinkProps } from "next/link"

export function isExternalUrl(url: Readonly<LinkProps["href"]>): boolean {
    return /^(https?:)?\/\//.test(url.toString())
}

export const removeAfterHash = (str: string) => str.replace(/#.*$/, "")

export const getSourceId = (source: string) =>
    source
        .toLowerCase()
        .replaceAll(" ", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
