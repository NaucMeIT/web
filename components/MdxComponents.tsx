import { getSourceId } from "../utils/string"
import { FacebookBtn, LinkedInBtn } from "./Button"
import { EmailLink } from "./EmailLink"
import { Typography } from "./Typography"

type MdxTypographyProps = Omit<React.ComponentProps<typeof Typography>, "className" | "variant" | "component">
type ElProps = JSX.IntrinsicElements

const H1 = (props: MdxTypographyProps) => (
    <Typography
        componentProps={{ id: getSourceId(props.children?.toString() || "") }}
        className='py-4'
        variant='h2'
        component='h1'
        {...props}
    />
)
const H2 = (props: MdxTypographyProps) => (
    <Typography
        componentProps={{ id: getSourceId(props.children?.toString() || "") }}
        className='pt-4'
        variant='h3'
        component='h2'
        {...props}
    />
)
const H3 = (props: MdxTypographyProps) => <Typography className='pt-4' variant='step' component='h3' {...props} />
const Text = (props: MdxTypographyProps) => <Typography className='pt-1' component='p' {...props} />
const Strong = (props: MdxTypographyProps) => (
    <Typography className='pt-1 font-semibold' component='strong' {...props} />
)
const Em = (props: MdxTypographyProps) => <Typography className='pt-1 italic' component='em' {...props} />
const LinkMdx = (props: any) => (
    <Typography
        variant='link'
        component='a'
        componentProps={
            {
                href: props.href,
                target: "_blank",
                className: "text-highlight hover:text-primary",
                "data-splitbee-event": "External Link",
                "data-splitbee-event-destination": `${props.children}`,
            } as any
        }
    >
        {props.children}
    </Typography>
)
const Ol = (props: Readonly<ElProps["ol"]>) => (
    <ol className='mdx list-decimal pl-6 py-2 print:text-print' {...props}></ol>
)
const Ul = (props: Readonly<ElProps["ul"]>) => <ul className='mdx list-disc pl-6 py-2 print:text-print' {...props}></ul>
const Table = (props: Readonly<ElProps["table"]>) => (
    <div className='overflow-auto print:overflow-visible print:text-xsDeviceBody print:text-print my-3'>
        <table className='w-max lg:max-w-3xl' {...props}></table>
    </div>
)
const Td = (props: Readonly<ElProps["td"]>) => <td className='border border-solid border-highlight p-2' {...props}></td>
const Th = (props: Readonly<ElProps["th"]>) => <th className='border border-solid border-highlight p-1' {...props}></th>
const Hr = (props: Readonly<ElProps["hr"]>) => <hr className='my-3' {...props} />
const Img = (props: Readonly<ElProps["img"]>) => (
    <a href={props.src}>
        {/* Next.js image doesn't work well with gallery plugin */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt='Obrázek uvnitř MDX' loading='lazy' decoding='async' className='gallery-item' {...props} />
    </a>
)

export const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    LinkedInBtn,
    FacebookBtn,
    EmailLink,
    p: Text,
    em: Em,
    strong: Strong,
    a: LinkMdx,
    ol: Ol,
    ul: Ul,
    hr: Hr,
    img: Img,
    table: Table,
    td: Td,
    th: Th,
}
