import * as React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { HeadingsType } from "../utils/mdx"
import { Typography } from "./Typography"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { removeAfterHash } from "../utils/string"

type Props = { readonly headings: HeadingsType }
type ItemProps = HeadingsType[0]["children"][0] & { readonly active?: boolean }

const ItemText = ({ level, href, text, active }: ItemProps) => (
    <Typography
        variant={level === 1 ? "important" : "normal"}
        component={Link}
        componentProps={{ href }}
        key={href}
        className={`block hover:text-secondary ${level === 1 ? "mt-2" : "ml-4"} ${active ? "text-secondary" : ""}`}
    >
        {text}
    </Typography>
)

export function TreeToC({ headings }: Props) {
    const router = useRouter()
    const activeRoute = removeAfterHash(router.asPath)
    const [openList, setOpenList] = useState([activeRoute])

    useEffect(() => {
        setOpenList([...openList, activeRoute])
        // Only when URL changes, we want to update opened submenus
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRoute])

    return (
        <Accordion.Root type='multiple' value={openList} onValueChange={setOpenList}>
            {headings.map((heading) => {
                return (
                    <Accordion.Item key={heading.href} className='my-2' value={removeAfterHash(heading.href)}>
                        <Accordion.Header
                            className={`my-2 flex flex-row justify-between w-full ${
                                heading.href.includes(activeRoute) ? "text-secondary" : ""
                            }`}
                        >
                            <ItemText {...heading} active={heading.href.includes(activeRoute)} />
                            {!!heading.children.length && (
                                <Accordion.Trigger className='group'>
                                    <ChevronDownIcon
                                        className='group-data-open:rotate-180 transition-transform duration-500'
                                        aria-hidden
                                    />
                                </Accordion.Trigger>
                            )}
                        </Accordion.Header>
                        <Accordion.Content className='data-open:animate-open data-close:animate-close will-change-auto overflow-hidden'>
                            {heading.children?.map((sub) => (
                                <ItemText key={sub.href} {...sub} />
                            ))}
                        </Accordion.Content>
                    </Accordion.Item>
                )
            })}
        </Accordion.Root>
    )
}
