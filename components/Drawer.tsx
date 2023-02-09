import { DownArrow } from "./DownArrow"

// eslint-disable-next-line functional/no-mixed-types
type DrawerProps = {
    readonly children: React.ReactNode
    readonly isOpen: boolean
    // eslint-disable-next-line functional/no-return-void
    readonly setIsOpen: (isOpen: boolean) => void
}

export function Drawer({ children, isOpen, setIsOpen }: DrawerProps) {
    return (
        <nav
            className={`fixed inset-0 z-10 transform overflow-hidden backdrop-blur-sm ease-in-out
        ${
            isOpen
                ? "translate-x-0 opacity-100 transition-opacity duration-500"
                : "-translate-x-full opacity-0 transition-all delay-500"
        }
      `}
        >
            <section
                className={`delay-400 absolute left-0 h-full transform bg-background shadow-xl transition-all duration-500 ease-in-out ${
                    isOpen ? " translate-x-0 " : "-translate-x-full"
                }`}
            >
                <article className='relative flex h-full flex-col overflow-y-auto p-10'>{children}</article>
                <DownArrow
                    className='margin-0 absolute right-0 top-2/4 rotate-90 cursor-pointer'
                    onClick={() => setIsOpen(false)}
                />
            </section>
            <section
                className=' h-full w-screen cursor-pointer '
                onClick={() => {
                    setIsOpen(false)
                }}
            ></section>
        </nav>
    )
}
