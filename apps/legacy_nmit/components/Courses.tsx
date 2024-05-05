import Link from "next/link"
import { CourseBox } from "./CourseBox"
import { Typography } from "./Typography"

export function Courses() {
    return (
        <section className='pt-20'>
            <span id='courses'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='text-center'>
                Naše kurzy
            </Typography>
            <CourseBox image='/images/qa_illustration.svg' width={320} height={291} side='right' title='Placené'>
                <p className='mb-2'>
                    Ať jsi programátor nebo tester, AI potřebuješ ke svému životu. Googlení už není in, proto je čas
                    natrhnout triko neefektivitě.
                </p>
                <Typography
                    variant='link'
                    component={Link}
                    componentProps={{ href: "/kurz-ai" }}
                    className='underline mb-5 block'
                >
                    Mrknout na AI kurz {">"}
                </Typography>
                <p className='mb-2'>
                    Git je magie! Aby ses ji naučil, nemusíš ukrást zakázanou knihu drakovi. Stačí pochopit základní
                    koncepty, které tě vystřelí rychle dál.
                </p>
                <Typography
                    variant='link'
                    component={Link}
                    componentProps={{ href: "/kurz-git-zaklad" }}
                    className='underline mb-5 block'
                >
                    Mrknout na kurz Gitu {">"}
                </Typography>
            </CourseBox>
            <CourseBox image='/images/dev_illustration.svg' width={320} height={348} side='left' title='Samostudium'>
                <p className='mb-2'>
                    Práce testera je ověřování kvality produktu. Na&nbsp;nalezené chyby upozorňuje srozumitelnou formou.
                    Práce testera není příliš složitá. Vše potřebné se naučíš v našem kurzu.
                </p>
                <Typography
                    variant='link'
                    component={Link}
                    componentProps={{ href: "/chapter/qa-00" }}
                    className='underline mb-5 block'
                >
                    Mrknout na kurz testera {">"}
                </Typography>
                <p className='mb-2'>
                    Aplikace se nevytvoří samy. Skrývá se za tím komplexní proces, jehož nedílnou částí je programování.
                </p>
                <p className='mb-2'>
                    U nás se naučíš tvořit webové aplikace. Pod tím si můžeš představit třeba Gmail nebo Facebook.
                    Samozřejmě nebudeš hned tvořit tak velké věci, ale začneš u menších projektů.
                </p>
                <Typography
                    variant='link'
                    component={Link}
                    componentProps={{ href: "/chapter/fe-01" }}
                    className='underline mb-5 block'
                >
                    Mrknout na kurz vývojáře {">"}
                </Typography>
            </CourseBox>
        </section>
    )
}
