import { Horizontal, Logo, Facebook, Instagram } from "./icons"
import { Typography } from "./Typography"
import { SocialButton } from "./Button"
import Link from "next/link"

export function Footer() {
    return (
        <>
            <Horizontal className='mx-auto my-16 max-w-full' />
            <div className='flex flex-row flex-wrap items-center justify-center gap-y-10 gap-x-6 pb-12 md:gap-x-32'>
                <Logo width={220} />
                <div className='flex w-full flex-col gap-4 md:w-auto'>
                    <Typography className='text-center'>Jsme na sociálních sítích!</Typography>
                    <div className='flex flex-row justify-center gap-6'>
                        <SocialButton href='/' label='Facebook stránka - Nauč mě IT'>
                            <Facebook width={16} />
                        </SocialButton>
                        <SocialButton href='/' label='Instagram stránka - Nauč mě IT'>
                            <Instagram width={16} />
                        </SocialButton>
                    </div>
                </div>
                <div className='md:order-0 order-2 flex flex-col'>
                    <Typography componentProps={{ href: "#home" }} component={Link} className='hover:text-primary'>
                        Úvod
                    </Typography>
                    <Typography componentProps={{ href: "#how" }} component={Link} className='hover:text-primary'>
                        Jak to funguje
                    </Typography>
                    <Typography componentProps={{ href: "#packages" }} component={Link} className='hover:text-primary'>
                        Cenové balíčky
                    </Typography>
                    <Typography componentProps={{ href: "#courses" }} component={Link} className='hover:text-primary'>
                        Kurzy
                    </Typography>
                    <Typography componentProps={{ href: "#about" }} component={Link} className='hover:text-primary'>
                        O nás
                    </Typography>
                    <Typography componentProps={{ href: "#company" }} component={Link} className='hover:text-primary'>
                        Pro firmy
                    </Typography>
                    <Typography componentProps={{ href: "#contact" }} component={Link} className='hover:text-primary'>
                        Kontakt
                    </Typography>
                    <Typography componentProps={{ href: "#login" }} component={Link} className='hover:text-primary'>
                        Registrovat
                    </Typography>
                </div>
                <div className='flex flex-col gap-3'>
                    <Typography variant='step'>Kontakt</Typography>
                    <p>
                        <Typography className='block'>Pavel Koudelka</Typography>
                        <Typography className='block'>735 42 Český Těšín</Typography>
                    </p>
                    <p>
                        <Typography className='block'>+420 705 099 099</Typography>
                        <Typography className='block'>info@naucme.it</Typography>
                    </p>
                </div>
            </div>
        </>
    )
}
