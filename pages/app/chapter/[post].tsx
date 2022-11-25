import remarkPrism from "remark-prism"
import remarkGfm from "remark-gfm"
import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"
import { getAndParseMdx, getDataFromParsedMdx, getFilesAt } from "../../../utils/mdx"
import { getSourceId } from "../../../utils/string"
import { Menu } from "../../../components/Menu"
import { SideMenu } from "../../../components/SideMenu"
import { Typography } from "../../../components/Typography"
import { Head } from "../../../components/Head"
import { TableOfContents } from "../../../components/TableOfContents"
import { ActionSidebar } from "../../../components/ActionSidebar"
import { components } from "../../../components/MdxComponents"
import { CodeHighlight } from "../../../components/CodeHighlight"
import { useTrackedUser } from "../../../hooks/useTrackedUser"
import { SocialButton } from "../../../components/Button"
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

type PostProps = {
    readonly mdx: MDXRemoteProps
    readonly metaInformation: Record<string, string>
    readonly headings: readonly {
        readonly text: string
        readonly level: number
        readonly href: string
    }[]
}

const Post: React.FC<PostProps> = ({ mdx, metaInformation, headings }) => {
    const [user, { logout }] = useTrackedUser()

    return (
        <>
            <Head desc={metaInformation.abstract} url=''>
                <title>{metaInformation.title}</title>
            </Head>
            <Menu items={[]} logoLink='/' inApp>
                {!!user ? (
                    <SocialButton
                        label='Odhlásit se'
                        naked
                        className='hover:text-secondary !aspect-auto flex'
                        onClick={logout}
                    >
                        <>
                            <ArrowLeftOnRectangleIcon className='h-6 w-6 mr-2' aria-hidden='true' /> Odhlásit se
                        </>
                    </SocialButton>
                ) : (
                    <SocialButton
                        label='Přihlásit se'
                        naked
                        className='hover:text-secondary !aspect-auto flex'
                        href='/sign'
                    >
                        <>
                            <ArrowRightOnRectangleIcon className='h-6 w-6 mr-2' aria-hidden='true' /> Přihlásit se
                        </>
                    </SocialButton>
                )}
            </Menu>
            <div className='grid grid-cols-12 auto-rows-auto h-screen'>
                <div className='row-start-1 row-end-2 xl:row-end-7 xl:row-span-full col-span-full xl:col-span-2 mt-20 bg-secondary/5 overflow-auto'>
                    <SideMenu>
                        <TableOfContents headings={headings} />
                    </SideMenu>
                </div>
                <main className='flex flex-row justify-start items-start row-end-7 xl:col-start-3 col-span-full row-start-3 xl:row-start-1 row-span-full overflow-auto px-10 xl:mt-20 pb-2 overscroll-none'>
                    <article className='max-w-prose'>
                        <Typography
                            className='py-4'
                            variant='h2'
                            component='h1'
                            componentProps={{ id: getSourceId(metaInformation.title) }}
                        >
                            {metaInformation.title}
                        </Typography>
                        <MDXRemote {...mdx} components={components} />
                    </article>
                    <ActionSidebar />
                </main>
                <CodeHighlight />
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<PostProps> = async (props) => {
    const folderPath = path.join(process.cwd(), "chapters")
    const paths = getFilesAt(folderPath, ".mdx")

    const menuData = Object.fromEntries(
        paths
            .map((mdxName) => [mdxName, getAndParseMdx(folderPath, mdxName)] as const)
            .map(([mdxPath, { content, data }]) => [mdxPath, getDataFromParsedMdx(mdxPath, content, data)]),
    )
    const currentPost = menuData[props?.params?.post as string]
    const mdx = await serialize(currentPost.content, { mdxOptions: { remarkPlugins: [remarkPrism, remarkGfm] } })
    const headings = Object.entries(menuData).flatMap(([_, d]) => d.headings)

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
