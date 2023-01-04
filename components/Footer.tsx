import { Horizontal, Logo } from "./icons"
import { Typography } from "./Typography"
import { FacebookBtn, LinkedInBtn } from "./Button"
import Link from "next/link"
import { EmailLink } from "./EmailLink"

type FooterProps = {
    readonly links: readonly {
        readonly title: string
        readonly link: string
    }[]
}

export function Footer({ links }: FooterProps) {
    const footerLinks = [{ title: "Nahoru", link: "#" }, ...links]
    return (
        <>
            <Horizontal className='mx-auto my-16 max-w-full' />
            <footer className='flex flex-row flex-wrap items-center justify-center gap-y-10 gap-x-6 pb-12 md:gap-x-32'>
                <Link href='/' aria-label='Logo Nauč mě IT'>
                    <Logo width={220} />
                </Link>
                <div className='flex w-full flex-col gap-4 md:w-auto'>
                    <Typography className='text-center'>Jsme na sociálních sítích!</Typography>
                    <div className='flex flex-row justify-center gap-6'>
                        <FacebookBtn href='https://www.facebook.com/NaucMeIT' label='Facebook stránka - Nauč mě IT' />
                        <LinkedInBtn
                            href='https://www.linkedin.com/company/nauc-me-it/'
                            label='LinkedIn stránka - Nauč mě IT'
                        />
                    </div>
                </div>
                <div className='md:order-0 order-2 flex flex-col'>
                    {footerLinks.map(({ title, link }) => (
                        <Typography
                            key={link}
                            componentProps={{ href: link }}
                            component={Link}
                            className='hover:text-primary'
                        >
                            {title}
                        </Typography>
                    ))}
                </div>
                <address className='flex flex-col gap-3 not-italic'>
                    <Typography variant='step'>Kontakt</Typography>
                    <p>
                        <Typography className='block'>Pavel Koudelka</Typography>
                        <Typography className='block'>735 62 Český Těšín</Typography>
                    </p>
                    <p>
                        <Typography
                            className='block hover:text-primary'
                            component={Link}
                            componentProps={{ href: "tel:+420731472822" }}
                        >
                            +420 731 472 822
                        </Typography>
                        <EmailLink email='info@naucme.it' />
                    </p>
                </address>
            </footer>
        </>
    )
}
