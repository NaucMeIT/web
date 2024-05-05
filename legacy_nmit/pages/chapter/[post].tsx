import { useCallback, useRef } from "react"
import rehypeShiki from "rehype-pretty-code"
import imageSize from "rehype-img-size"
import remarkGfm from "remark-gfm"
import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"
import LightGallery from "lightgallery/react"
import { InitDetail } from "lightgallery/lg-events"
import { getFilesAt, HeadingsType, getMenuData, getHeadings } from "../../utils/mdx"
import { getSourceId } from "../../utils/string"
import { SideMenu } from "../../components/SideMenu"
import { Typography } from "../../components/Typography"
import { Head } from "../../components/Head"
import { TreeToC } from "../../components/TreeToC"
import { ActionSidebar } from "../../components/ActionSidebar"
import { components } from "../../components/MdxComponents"
import { InAppMenu } from "../../components/InAppMenu"
import { Logo } from "../../components/icons"

import "lightgallery/css/lightgallery.css"

type PostProps = {
    readonly mdx: MDXRemoteProps
    readonly metaInformation: Record<string, string>
    readonly headings: HeadingsType
}

const Post: React.FC<PostProps> = ({ mdx, metaInformation, headings }) => {
    const lightGallery = useRef<any>(null)

    const onInit = useCallback((detail: Readonly<InitDetail>) => {
        if (detail) {
            lightGallery.current = detail.instance
            setTimeout(() => {
                lightGallery.current.refresh()
            }, 500)
        }
    }, [])

    return (
        <>
            <Head desc={metaInformation.abstract} url=''>
                <title>{metaInformation.title}</title>
            </Head>
            <InAppMenu />
            <div className='grid grid-cols-12 auto-rows-auto h-screen'>
                <div className='print:hidden row-start-1 row-end-2 xl:row-end-7 xl:row-span-full col-span-full xl:col-span-2 mt-20 bg-secondary/5 overflow-auto'>
                    <SideMenu>
                        <TreeToC headings={headings} />
                    </SideMenu>
                </div>
                <main className='flex flex-row justify-start items-start row-end-7 xl:col-start-3 col-span-full row-start-3 xl:row-start-1 row-span-full overflow-auto print:overflow-visible px-10 xl:mt-20 pb-2 overscroll-none'>
                    <article className='max-w-prose print:block'>
                        <Logo className='hidden print:block' width={120} />
                        <Typography
                            className='py-4'
                            variant='h2'
                            component='h1'
                            componentProps={{ id: getSourceId(metaInformation.title) }}
                        >
                            {metaInformation.title}
                        </Typography>
                        <LightGallery supportLegacyBrowser={false} onInit={onInit} selector='.gallery-item'>
                            <MDXRemote {...mdx} components={components} lazy />
                        </LightGallery>
                    </article>
                    <aside className='print:hidden'>
                        <ActionSidebar />
                    </aside>
                </main>
            </div>
        </>
    )
}

type Node = Record<string, any>
export const getStaticProps: GetStaticProps<PostProps> = async (props) => {
    const options = {
        // Use one of Shiki's packaged themes
        theme: "one-dark-pro",
        onVisitLine(node: Node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }]
            }
        },
        // Feel free to add classNames that suit your docs
        onVisitHighlightedLine(node: Node) {
            node.properties.className.push("highlighted")
        },
        onVisitHighlightedWord(node: Node) {
            node.properties.className = ["word"]
        },
    }

    const folderPath = path.join(process.cwd(), "chapters")
    const paths = getFilesAt(folderPath, ".mdx")
    const menuData = getMenuData(paths, folderPath)

    const currentCourse = (props?.params?.post as string)?.split("-")[0]
    const currentPost = menuData[props?.params?.post as string]
    const mdx = await serialize(currentPost.content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                [rehypeShiki as any, options],
                [imageSize as any, { dir: "public" }],
            ],
        },
    })
    // Show headings only for the active course
    const headings = getHeadings(menuData).filter((heading) => heading.href.startsWith(`/chapter/${currentCourse}`))

    return {
        props: {
            mdx,
            metaInformation: currentPost.data,
            headings,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const folderPath = path.join(process.cwd(), "chapters")
    const paths = getFilesAt(folderPath, ".mdx").map((post) => ({ params: { post } }))

    return {
        paths,
        fallback: false,
    }
}

export default Post
