import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import matter from "gray-matter"
import fs from "fs"
import path from "path"
import { components } from "../../../components/MdxWrapper"
import { Menu } from "../../../components/Menu"
import { SideMenu } from "../../../components/SideMenu"
import { Typography } from "../../../components/Typography"
import { Head } from "../../../components/Head"

type HeadingsType = readonly { readonly text: string; readonly level: number }[]

type PostProps = {
    readonly mdx: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
    readonly headings: HeadingsType
    readonly metaInformation: Record<string, string>
}

export function getHeadings(source: string): HeadingsType {
    const headingLines = source.split("\n").filter((line) => {
        return line.match(/^##*\s/)
    })

    return headingLines
        .filter((raw) => raw.startsWith("## "))
        .map((raw) => {
            const text = raw.replace(/^##*\s/, "")

            return { text, level: 2 }
        })
}

const TableOfContents = ({ headings }: { readonly headings: HeadingsType }) => {
    return (
        <>
            {headings.map((heading) => {
                return (
                    <Typography
                        variant='normal'
                        component={Link}
                        componentProps={{ href: `#${heading.text.replaceAll(" ", "-")}` }}
                        key={heading.text}
                        className='block'
                    >
                        {heading.text}
                    </Typography>
                )
            })}
        </>
    )
}

const Post: React.FC<PostProps> = ({ headings, mdx, metaInformation }) => {
    return (
        <>
            <Head desc={metaInformation.abstract} url=''>
                <title>{metaInformation.title}</title>
            </Head>
            <Menu items={[]} />
            <div className='grid grid-cols-12 auto-rows-auto h-screen'>
                <div className='row-end-7 row-span-full col-span-2 col-start-1 mt-20 bg-secondary/5 overflow-hidden'>
                    <SideMenu>
                        <TableOfContents headings={headings} />
                    </SideMenu>
                </div>
                <main className='row-end-7 col-start-3 col-span-full row-span-full overflow-auto px-10 mt-20 pb-2 overscroll-none'>
                    <Typography className='py-4' variant='h2' component='h1'>
                        {metaInformation.title}
                    </Typography>
                    <MDXRemote {...mdx} components={components} />
                </main>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (props) => {
    const folderPath = path.join(process.cwd(), "chapters")
    const filePath = path.join(folderPath, `${props?.params?.post}.mdx`)
    const rawFileSource = fs.readFileSync(filePath)

    const { content, data: metaInformation } = matter(rawFileSource)
    const headings = getHeadings(content)
    const mdx = await serialize(content)

    return {
        props: {
            mdx,
            metaInformation,
            headings,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const folderPath = path.join(process.cwd(), "chapters")
    const paths = fs
        .readdirSync(folderPath, { withFileTypes: true })
        .filter((item) => !item.isDirectory() && item.name.endsWith(".mdx"))
        .map((item) => ({ params: { post: item.name.replace(".mdx", "") } }))

    return {
        paths,
        fallback: false,
    }
}

export default Post
