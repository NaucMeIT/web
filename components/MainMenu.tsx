import { Disclosure, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import React, { Fragment, useState } from "react"
import { useStore } from "../hooks/useStore"

interface IconTypeProps {
    width: number
    height: number
    color?: string
    className?: string
}

interface MenuItem {
    icon?: (props: IconTypeProps) => JSX.Element
    link: string
    title: string
    active?: boolean
}

interface MenuProps {
    items: MenuItem[]
}

export const MainMenu: React.FC<MenuProps> = ({ items }) => {
    const signUpVisible = useStore((state) => state.signUpVisible)
    const [showCTA, setShowCTA] = useState(true)
    return (
        <Disclosure as='nav' className='fixed top-0 z-20 w-screen bg-blue-main'>
            {({ open }) => (
                <>
                    <div className='px-6 mx-auto max-w-7xl 2xl:max-w-[80vw] sm:px-6 lg:px-8'>
                        <div className='relative flex items-center justify-between h-16'>
                            <div className='flex items-center justify-between flex-1 sm:items-stretch'>
                                <div className='flex items-center flex-shrink-0'>
                                    <img
                                        className='block w-auto h-8 lg:hidden'
                                        src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                                        alt='Workflow'
                                    />
                                    <img
                                        className='hidden w-auto h-8 lg:block'
                                        src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                                        alt='Workflow'
                                    />
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
                                <div className='hidden sm:block sm:ml-6'>
                                    <div className='flex space-x-4'>
                                        {items.map((item) => (
                                            <a
                                                key={item.title}
                                                href={item.link}
                                                className={classNames(
                                                    item.active
                                                        ? "text-blue-highlight hover:text-blue-off"
                                                        : "text-blue-off font-bold hover:text-blue-highlight",
                                                    "px-3 py-2 rounded-md text-md-fluid font-medium",
                                                )}
                                                aria-current={item.active ? "page" : undefined}
                                            >
                                                {item.icon &&
                                                    React.createElement(item.icon, {
                                                        width: 36,
                                                        height: 36,
                                                        className: "inline-block pr-2 text-current",
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
                        enterFrom='transform opacity-0'
                        enterTo='transform opacity-100'
                        leave='transition ease-in duration-150'
                        leaveFrom='transform opacity-100'
                        leaveTo='transform opacity-0'
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
                                    >
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
