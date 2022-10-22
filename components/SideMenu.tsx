type Props = {
    readonly children: React.ReactNode
}

export function SideMenu({ children }: Props) {
    return (
        <nav className='h-full flex flex-col justify-between bg-rightSide bg-no-repeat bg-contain bg-rightCut pl-4 pr-20 py-4'>
            <div>
                Dashboard
                {children}
            </div>
            <div>Nahlásit chybu</div>
        </nav>
    )
}
