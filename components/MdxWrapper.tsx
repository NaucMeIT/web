import { MDXProvider } from "@mdx-js/react"
import { Typography } from "./Typography"
import { Children, DetailedHTMLProps, HTMLAttributes } from "react"
import { EmailLink } from "./EmailLink"
import Link from "next/link"
import { Menu } from "./Menu"
import { SideMenu } from "./SideMenu"

type MdxTypographyProps = Omit<React.ComponentProps<typeof Typography>, "className" | "variant" | "component">

const H1 = (props: MdxTypographyProps) => <Typography className='py-4' variant='h2' component='h1' {...props} />
const H2 = (props: MdxTypographyProps) => (
    <Typography
        componentProps={{ id: props.children?.toString().replaceAll(" ", "-") }}
        className='pt-4'
        variant='h3'
        component='h2'
        {...props}
    />
)
const H3 = (props: MdxTypographyProps) => <Typography className='pt-4' variant='step' component='h3' {...props} />
const Text = (props: MdxTypographyProps) => <Typography className='pt-1' variant='normal' component='p' {...props} />
const EmailLinkMdx = (props: any) => (
    <EmailLink subject='Dotaz na Zpracování údajů či obchodní podmínky' email={props.children}></EmailLink>
)
const LinkMdx = (props: any) => (
    <Typography
        variant='link'
        component={Link}
        componentProps={{
            href: props.href,
            className: "text-highlight hover:text-primary",
        }}
    >
        {props.children}
    </Typography>
)

export const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: Text,
    em: EmailLinkMdx,
    a: LinkMdx,
}

export function MdxWrapper(props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <MDXProvider components={components}>
            <main {...props} className='px-8 pt-3 pb-10' />
        </MDXProvider>
    )
}

export function MdxChapterWrapper(props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    const anchors = Children.toArray(props.children)
        .filter((child: any) => child.props?.mdxType && ["h1", "h2", "h3"].includes(child.props.mdxType))
        .map((child: any) => ({
            url: "#" + child.props.id,
            depth: (child.props?.mdxType && parseInt(child.props.mdxType.replace("h", ""), 0)) ?? 0,
            text: child.props.children,
        }))
    return (
        <MDXProvider components={components}>
            <Menu items={[]} />
            <div className='grid grid-cols-12 auto-rows-auto h-screen'>
                <div className='row-end-7 row-span-full col-span-2 col-start-1 mt-20 bg-secondary/5 overflow-hidden'>
                    <SideMenu>Test</SideMenu>
                </div>
                <main
                    {...props}
                    className='row-end-7 col-start-3 col-span-full row-span-full overflow-auto px-10 mt-20 pb-2 overscroll-none'
                />
            </div>
        </MDXProvider>
    )
}
