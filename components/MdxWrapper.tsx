import { MDXProvider } from "@mdx-js/react"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import { components } from "./MdxComponents"

export function MdxWrapper(props: Readonly<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>) {
    return (
        <MDXProvider components={components}>
            <main {...props} className='px-8 pt-3 pb-10' />
        </MDXProvider>
    )
}
