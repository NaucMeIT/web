import remarkPrism from "remark-prism"
import remarkGfm from "remark-gfm"
import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"
import {
    getAndParseMdx,
    getDataFromParsedMdx,
    getFilesAt,
    HeadingsType,
    getMenuData,
    getHeadings,
} from "../../utils/mdx"
import { getSourceId } from "../../utils/string"
import { SideMenu } from "../../components/SideMenu"
import { Typography } from "../../components/Typography"
import { Head } from "../../components/Head"
import { TreeToC } from "../../components/TreeToC"
import { ActionSidebar } from "../../components/ActionSidebar"
import { components } from "../../components/MdxComponents"
import { CodeHighlight } from "../../components/CodeHighlight"
import { InAppMenu } from "../../components/InAppMenu"
import { Logo } from "../../components/icons"

type PostProps = {
    readonly mdx: MDXRemoteProps
    readonly metaInformation: Record<string, string>
    readonly headings: HeadingsType
}

const Post: React.FC<PostProps> = ({ mdx, metaInformation, headings }) => {
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
                        <MDXRemote {...mdx} components={components} lazy />
                    </article>
                    <aside className='print:hidden'>
                        <ActionSidebar />
                    </aside>
                </main>
                <CodeHighlight />
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<PostProps> = async (props) => {
    const folderPath = path.join(process.cwd(), "chapters")
    const paths = getFilesAt(folderPath, ".mdx")
    const menuData = getMenuData(paths, folderPath)

    const currentPost = menuData[props?.params?.post as string]
    const mdx = await serialize(currentPost.content, { mdxOptions: { remarkPlugins: [remarkPrism, remarkGfm] } })
    const headings = getHeadings(menuData)

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
