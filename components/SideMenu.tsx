import { DownArrow } from "./DownArrow"
import { Horizontal } from "./icons"

// eslint-disable-next-line functional/no-mixed-type
type DrawerProps = {
    readonly children: React.ReactNode
}

export function SideMenu({ children }: DrawerProps) {
    return (
        <nav className='h-full flex flex-row justify-between'>
            <section className='h-full shadow-xl'>
                <article className='relative flex h-full flex-col overflow-y-auto p-10'>{children}</article>
            </section>
            <picture>
                <source srcSet='/images/right.svg' media='(min-width: 1280px)' />
                <img height='110vh' aria-hidden srcSet='' alt='' loading='lazy' className='h-full hidden xl:block' />
            </picture>
        </nav>
    )
}
