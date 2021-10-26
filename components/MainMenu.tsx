import { Disclosure, Menu, Transition } from "@headlessui/react"
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import React, { Fragment } from "react"

interface MenuItem {
    link: string
    title: string
    active?: boolean
}

interface MenuProps {
    items: MenuItem[]
}

export const MainMenu: React.FC<MenuProps> = ({ items }) => (
    <Disclosure as='nav' className='fixed top-0 z-20 w-screen bg-blue-main'>
        {({ open }) => (
            <>
                <div className='px-6 mx-auto max-w-7xl 2xl:max-w-[80vw] sm:px-6 lg:px-8'>
                    <div className='relative flex items-center justify-between h-16'>
                        <div className='flex items-center justify-between flex-1 sm:items-stretch sm:justify-start'>
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
                            <div className='inset-y-0 flex items-center sm:hidden'>
                                {/* Mobile menu button*/}
                                <Disclosure.Button className='z-10 inline-flex items-center justify-center p-2 rounded-md text-blue-highlight hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='sr-only'>Open main menu</span>
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
                                                    ? "text-blue-off font-bold"
                                                    : "text-blue-highlight hover:text-blue-off",
                                                "px-3 py-2 rounded-md text-md-fluid font-medium",
                                            )}
                                            aria-current={item.active ? "page" : undefined}
                                        >
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
                    <Disclosure.Panel className='absolute right-0 z-20 w-screen bg-opacity-90 bg-green-off sm:hidden'>
                        <div className='px-2 pt-2 pb-3'>
                            {items.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.link}
                                    className={classNames(
                                        item.active
                                            ? "text-blue-off font-black"
                                            : "text-blue-highlight hover:text-blue-off",
                                        "tracking-wide block px-3 py-2 rounded-md text-base font-medium leading-9 text-center align-middle first-letter:font-normal first-letter:text-3xl first-letter:mr-3",
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