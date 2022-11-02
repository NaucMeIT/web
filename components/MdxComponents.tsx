import Link from "next/link"
import { FacebookBtn, LinkedInBtn } from "./Button"
import { EmailLink } from "./EmailLink"
import { Typography } from "./Typography"

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
const Strong = (props: MdxTypographyProps) => (
    <Typography className='pt-1' variant='strong' component='strong' {...props} />
)
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
const Ol = (props: any) => <ol className='list-decimal pl-6 py-2' {...props}></ol>
const Ul = (props: any) => <ul className='list-disc pl-6 py-2' {...props}></ul>
const Hr = (props: any) => <hr className='my-3' {...props} />
const Img = (props: any) => (
    <Link href={props.src}>
        <img alt='Obrázek uvnitř MDX' loading='lazy' {...props} />
    </Link>
)

export const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    LinkedInBtn,
    FacebookBtn,
    p: Text,
    em: EmailLinkMdx,
    strong: Strong,
    a: LinkMdx,
    ol: Ol,
    ul: Ul,
    hr: Hr,
    img: Img,
}
