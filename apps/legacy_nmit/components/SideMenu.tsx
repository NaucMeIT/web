import * as Separator from "@radix-ui/react-separator"
import Link from "next/link"
import { Typography } from "./Typography"

type Props = {
    readonly children: React.ReactNode
}

export function SideMenu({ children }: Props) {
    return (
        <nav className='h-full flex flex-col justify-between bg-rightSide bg-no-repeat bg-contain bg-rightCut pl-4 pr-20 py-4 pt-20'>
            <div>
                <Typography
                    variant='normal'
                    component={Link}
                    componentProps={{ href: "/dashboard" }}
                    className='block hover:text-secondary'
                >
                    Dashboard
                </Typography>
                <Separator.Root className='my-4 h-px w-full bg-highlight' />
                {children}
            </div>
        </nav>
    )
}
