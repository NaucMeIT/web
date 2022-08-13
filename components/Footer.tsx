import { Horizontal, Logo, Facebook } from "./icons"
import { Typography } from "./Typography"
import { SocialButton } from "./Button"
import Link from "next/link"
import Image from "next/image"
import LinkedIn from "../images/linkedin.svg"

export function Footer() {
    return (
        <>
            <Horizontal className='mx-auto my-16 max-w-full' />
            <footer className='flex flex-row flex-wrap items-center justify-center gap-y-10 gap-x-6 pb-12 md:gap-x-32'>
                <Logo width={220} />
                <div className='flex w-full flex-col gap-4 md:w-auto'>
                    <Typography className='text-center'>Jsme na sociálních sítích!</Typography>
                    <div className='flex flex-row justify-center gap-6'>
                        <SocialButton href='https://www.facebook.com/NaucMeIT' label='Facebook stránka - Nauč mě IT'>
                            <Facebook width={16} />
                        </SocialButton>
                        <SocialButton
                            href='https://www.linkedin.com/company/nauc-me-it/'
                            label='LinkedIn stránka - Nauč mě IT'
                        >
                            <Image src={LinkedIn} width={16} height={16} />
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
                    <Typography componentProps={{ href: "/companies" }} component={Link} className='hover:text-primary'>
                        Pro firmy
                    </Typography>
                    <Typography componentProps={{ href: "#contact" }} component={Link} className='hover:text-primary'>
                        Kontakt
                    </Typography>
                    <Typography componentProps={{ href: "#login" }} component={Link} className='hover:text-primary'>
                        Registrovat
                    </Typography>
                </div>
                <address className='flex flex-col gap-3 not-italic'>
                    <Typography variant='step'>Kontakt</Typography>
                    <p>
                        <Typography className='block'>Pavel Koudelka</Typography>
                        <Typography className='block'>735 42 Český Těšín</Typography>
                    </p>
                    <p>
                        <Typography
                            className='block hover:text-primary'
                            component={Link}
                            componentProps={{ href: "tel:+420731472822" }}
                        >
                            +420 731 472 822
                        </Typography>
                        <Typography
                            className='block hover:text-primary'
                            component={Link}
                            componentProps={{ href: "mailto:info@naucme.it?subject=Dotaz na Nauč mě IT" }}
                        >
                            info@naucme.it
                        </Typography>
                    </p>
                </address>
            </footer>
        </>
    )
}
