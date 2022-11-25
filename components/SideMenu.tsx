import Link from "next/link"
import { Typography } from "./Typography"

type Props = {
    readonly children: React.ReactNode
}

export function SideMenu({ children }: Props) {
    return (
        <nav className='h-full flex flex-col justify-between bg-rightSide bg-no-repeat bg-contain bg-rightCut pl-4 pr-20 py-4'>
            <div>
                <Typography
                    variant='normal'
                    component={Link}
                    componentProps={{ href: "/" }}
                    className='block hover:text-secondary'
                >
                    Hlavní strana
                </Typography>
                <hr className='my-4' />
                {children}
            </div>
        </nav>
    )
}
