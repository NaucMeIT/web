import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { getSourceId } from "./string"

type Ext = string
type Extension = `.${Ext}`
type Heading = { readonly text: string; readonly level: number; readonly href: string }
type Headings = readonly Heading[]
export type HeadingsType = readonly (Heading & {
    readonly children: readonly Heading[]
})[]

function assert(parsedMdx: any): asserts parsedMdx is { readonly data: { readonly title: string } } {
    if (!parsedMdx.data.title) {
        // eslint-disable-next-line functional/no-throw-statements
        throw new Error("Title is missing in ", parsedMdx)
    }
}

function getHeadingsFromMdx(source: string, path: string): Headings {
    const headingLines = source.split("\n").filter((line) => {
        return line.match(/^##*\s/)
    })

    return headingLines
        .filter((raw) => raw.startsWith("## "))
        .map((raw) => {
            const text = raw.replace(/^##*\s/, "")

            return { text, level: 2, href: `/chapter/${path}#${getSourceId(text)}` }
        })
}

export function getFilesAt(folderPath: string, fileType: Extension) {
    const paths = fs
        .readdirSync(folderPath, { withFileTypes: true })
        .filter((item) => !item.isDirectory() && item.name.endsWith(fileType))
        .map((item) => item.name.replace(fileType, ""))

    return paths
}

export function getAndParseMdx(folderPath: string, filePath: string) {
    const parsedMdx = matter(fs.readFileSync(path.join(folderPath, `${filePath}.mdx`)))
    assert(parsedMdx)
    return parsedMdx
}

export function getDataFromParsedMdx<T extends { readonly title: string }>(mdxPath: string, content: string, data: T) {
    return {
        headings: [
            {
                text: data.title,
                level: 1,
                href: `/chapter/${mdxPath}#${getSourceId(data.title)}`,
                children: [...getHeadingsFromMdx(content, mdxPath)],
            },
        ],
        content,
        data,
    }
}

export function dataHasTitle(data: Record<string, unknown>): data is { readonly title: string } {
    return !!data.title
}

export function getMenuData(paths: readonly string[], folderPath: string) {
    return Object.fromEntries(
        paths
            .map((mdxName) => [mdxName, getAndParseMdx(folderPath, mdxName)] as const)
            .map(([mdxPath, { content, data }]) => [mdxPath, getDataFromParsedMdx(mdxPath, content, data)]),
    )
}

export function getHeadings(menuData: ReturnType<typeof getMenuData>): HeadingsType {
    return Object.values(menuData).flatMap((d) => d.headings)
}
