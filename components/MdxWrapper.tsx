import { MDXProvider } from "@mdx-js/react"
import Link from "next/link"
import { Typography } from "./Typography"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import { EmailLink } from "./EmailLink"
import { LinkedInBtn, FacebookBtn } from "./Button"

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
        componentProps={
            {
                href: props.href,
                className: "text-highlight hover:text-primary",
                "data-splitbee-event": "External Link",
                "data-splitbee-event-destination": `${props.children}`,
            } as any
        }
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
    LinkedInBtn,
    FacebookBtn,
}

export function MdxWrapper(props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <MDXProvider components={components}>
            <main {...props} className='px-8 pt-3 pb-10' />
        </MDXProvider>
    )
}
