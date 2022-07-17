import { Disclosure, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import React, { Fragment, useState } from "react"
import { useStore } from "../hooks/useStore"

interface IconTypeProps {
    readonly width: number
    readonly height: number
    readonly color?: string
    readonly className?: string
}

interface MenuItem {
    readonly icon?: (props: IconTypeProps) => JSX.Element
    readonly link: string
    readonly title: string
    readonly active?: boolean
}

interface MenuProps {
    readonly items: readonly MenuItem[]
}

export const MainMenu: React.FC<MenuProps> = ({ items }) => {
    const signUpVisible = useStore((state) => state.signUpVisible)
    const [showCTA, setShowCTA] = useState(true)
    return (
        <Disclosure as='nav' className='fixed top-0 z-20 w-screen bg-blue-main'>
            {({ open, close }) => (
                <>
                    <div className='px-6 mx-auto max-w-7xl 2xl:max-w-[80vw] lg:px-0'>
                        <div className='relative flex items-center justify-between h-16'>
                            <div className='flex items-center justify-between flex-1 sm:items-stretch'>
                                <div className='flex items-center flex-shrink-0 invisible w-10 h-10 lg:hidden'>
                                    {/* TODO: Add logo once it is done. */}
                                </div>
                                <Transition
                                    appear={true}
                                    unmount={false}
                                    show={!signUpVisible}
                                    as={"button"}
                                    className={`!block p-1 rounded-lg w-max bg-green-contrast text-green-contrast-highlight sm:order-last sm:justify-self-end ${
                                        showCTA ? "opacity-100" : "opacity-0"
                                    }`}
                                    enter='transition-opacity duration-1000'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='transition-opacity duration-1000'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                    afterEnter={() => setShowCTA(true)}
                                    afterLeave={() => setShowCTA(false)}
                                >
                                    » Chci pracovat v IT!
                                </Transition>
                                <div className='inset-y-0 flex items-center sm:hidden'>
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className='z-10 inline-flex items-center justify-center p-2 rounded-md text-blue-highlight hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                        <span className='sr-only'>Otevřít menu</span>
                                        {open ? (
                                            <XIcon className='block w-6 h-6' aria-hidden='true' />
                                        ) : (
                                            <MenuIcon className='block w-6 h-6' aria-hidden='true' />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className='hidden sm:block'>
                                    <div className='flex space-x-4'>
                                        {items.map((item) => (
                                            <a
                                                key={item.title}
                                                href={item.link}
                                                className={classNames(
                                                    item.active
                                                        ? "text-blue-highlight hover:text-blue-off"
                                                        : "text-blue-off font-bold hover:text-blue-highlight",
                                                    "lg:px-3 py-2 rounded-md text-md-fluid font-medium",
                                                )}
                                                aria-current={item.active ? "page" : undefined}
                                                onClick={() => close()}
                                            >
                                                {item.icon &&
                                                    React.createElement(item.icon, {
                                                        width: 36,
                                                        height: 36,
                                                        className: "inline-block pr-2 text-current -mt-2",
                                                    })}
                                                {item.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-250'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition ease-in duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Disclosure.Panel className='absolute right-0 z-20 w-screen bg-opacity-90 bg-green-main sm:hidden'>
                            <div className='px-2 pt-2 pb-3'>
                                {items.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.link}
                                        className={classNames(
                                            item.active
                                                ? "text-green-off font-black"
                                                : "text-green-highlight hover:text-green-off",
                                            "tracking-wide block px-3 py-2 rounded-md text-base font-medium leading-9 text-center align-middle",
                                        )}
                                        aria-current={item.active ? "page" : undefined}
                                        onClick={() => close()}
                                    >
                                        {item.icon &&
                                            React.createElement(item.icon, {
                                                width: 24,
                                                height: 24,
                                                className: "inline-block pr-2 text-current -mt-1",
                                            })}
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}
