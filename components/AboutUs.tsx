import { Facebook, Instagram } from "./icons"
import { SocialButton } from "./Button"
import { Typography } from "./Typography"
import Link from "next/link"

type Props = {
    readonly people: readonly {
        readonly name: string
        readonly position: string
        readonly email: string
        readonly image: string
    }[]
}
export function AboutUs({ people }: Props) {
    return (
        <div className={`mt-10 flex flex-col items-center justify-center gap-x-36 gap-y-4 px-5 xl:flex-row`}>
            <div className='flex w-fit max-w-xl flex-col'>
                <span id='about'>&nbsp;</span>
                <Typography variant='h2' component='h2' className='mb-8'>
                    O nás
                </Typography>
                <Typography className='mb-6 max-w-xsProse' component='p'>
                    Práce testera je hledání chyb a upozorňování na ně srozumitelnou formou. Proto abys mohl být tester,
                    nepotřebuješ mnoho. Práce testera je hledání chyb a upozorňování na ně srozumitelnou formou.
                </Typography>
                <Typography className='mb-10 max-w-xsProse' component='p'>
                    Proto abys mohl být tester, nepotřebuješ mnoho.
                </Typography>
                <div className='flex flex-row justify-center gap-x-10 xl:justify-start'>
                    <SocialButton href='/' label='Facebook stránka - Nauč mě IT'>
                        <Facebook width={16} />
                    </SocialButton>
                    <SocialButton href='/' label='Instagram stránka - Nauč mě IT'>
                        <Instagram width={16} />
                    </SocialButton>
                </div>
            </div>
            <div className='flex flex-col justify-center gap-x-20 md:flex-row'>
                {people.map((p) => (
                    <div className='flex flex-col gap-y-2' key={p.email}>
                        <img
                            src={p.image}
                            className='w-full'
                            width={"245px"}
                            height={"264px"}
                            alt={`Profilová fotka - ${p.name}`}
                            loading='lazy'
                        />
                        <Typography variant='h3' component='h3' className='text-center'>
                            {p.name}
                        </Typography>
                        <Typography className='text-center'>{p.position}</Typography>
                        <Typography
                            variant='link'
                            component={Link}
                            componentProps={{ href: `mailto:${p.email}?subject=Dotaz na Nauč mě IT` }}
                            className='text-center underline'
                        >
                            {p.email}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}
