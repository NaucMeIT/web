import path from "path"
import fs from "fs"
import matter from "gray-matter"

type Ext = string
type Extension = `.${Ext}`
export type HeadingsType = readonly { readonly text: string; readonly level: number; readonly href: string }[]

function assert(parsedMdx: any): asserts parsedMdx is { readonly data: { readonly title: string } } {
    if (!parsedMdx.data.title) {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error("Title is missing in ", parsedMdx)
    }
}

const getSourceId = (source: string) => source.toLocaleLowerCase().replaceAll(" ", "-")

function getHeadings(source: string, path: string): HeadingsType {
    const headingLines = source.split("\n").filter((line) => {
        return line.match(/^##*\s/)
    })

    return headingLines
        .filter((raw) => raw.startsWith("## "))
        .map((raw) => {
            const text = raw.replace(/^##*\s/, "")

            return { text, level: 2, href: `/app/chapter/${path}#${getSourceId(text)}` }
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
        headings: [{ text: data.title, level: 1, href: mdxPath }, ...getHeadings(content, mdxPath)],
        content,
        data,
    }
}

export function dataHasTitle(data: Record<string, unknown>): data is { readonly title: string } {
    return !!data.title
}
