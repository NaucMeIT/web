import { Disclosure, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Typography } from "./Typography"
import { Button } from "./Button"
import { Logo } from "./icons"

interface MenuItemProps {
    readonly link: string
    readonly title: string
    readonly isActive?: boolean
    readonly isImportant?: boolean
}

interface MenuProps {
    readonly items: readonly MenuItemProps[]
    readonly logoLink: string
    readonly children?: React.ReactElement
    readonly inApp?: boolean
}

function MenuItem({
    item,
    className,
    close,
}: {
    readonly item: MenuItemProps
    readonly className?: string
    // eslint-disable-next-line functional/no-return-void
    readonly close: () => void
}) {
    return (
        <Typography
            variant={item.isActive ? "menuActive" : "menu"}
            component={item.isImportant ? Button : Link}
            key={item.title}
            componentProps={{
                href: item.link,
                "aria-current": item.isActive ? "page" : undefined,
                onClick: () => close(),
                theme: item.isImportant ? "main" : undefined,
                size: "normal",
                className: `${className || ""} ${!item.isImportant ? "hover:text-primary" : ""}`,
            }}
        >
            {item.title}
        </Typography>
    )
}

export function Menu({ items, logoLink, children, inApp }: MenuProps) {
    return (
        <Disclosure as='nav' className='fixed top-0 z-20 w-screen bg-background/90 transition-all'>
            {({ open, close }) => (
                <>
                    <div className='mx-auto mt-4 max-w-screen-3xl px-6 lg:px-0'>
                        <div className='relative flex h-16 items-center justify-between'>
                            <div
                                className={`flex flex-1 items-center justify-between ${
                                    inApp ? "lg:justify-between" : "lg:justify-around"
                                } lg:items-stretch`}
                            >
                                <div className='ml-3 flex flex-shrink-0 items-center'>
                                    <Link href={logoLink} className='flex items-center' aria-label='Logo Nauč mě IT'>
                                        <Logo width={120} />
                                    </Link>
                                </div>
                                <div className='inset-y-0 flex items-center xl:hidden'>
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className='focus:ring-white z-10 inline-flex items-center justify-center p-2 text-highlight hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset'>
                                        <span className='sr-only'>Otevřít menu</span>
                                        {open ? (
                                            <XMarkIcon className='block h-10 w-10' aria-hidden='true' />
                                        ) : (
                                            <Bars3Icon className='block h-10 w-10' aria-hidden='true' />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className='mr-10 hidden xl:block'>
                                    <div className='flex items-center gap-x-12'>
                                        {items.map((item) => (
                                            <MenuItem close={close} key={item.title} item={item} />
                                        ))}
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Transition
                        enter='transition-opacity ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-in duration-500'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Disclosure.Panel className='absolute w-screen bg-background/90 xl:hidden'>
                            <div className='flex flex-col items-center gap-y-6 px-2 pt-2 pb-3'>
                                {items.map((item) => (
                                    <MenuItem
                                        close={close}
                                        key={item.title}
                                        item={item}
                                        className='block w-fit text-center'
                                    />
                                ))}
                                {children}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}
