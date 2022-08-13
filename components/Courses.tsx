import { CourseBox } from "./CourseBox"
import { Typography } from "./Typography"

export function Courses() {
    return (
        <section className='pt-20'>
            <span id='courses'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='text-center'>
                Nabízené kurzy
            </Typography>
            <CourseBox image='/images/qa_illustration.svg' side='right' title='Tester'>
                Práce testera je ověřování kvality produktu. Na&nbsp;nalezené chyby upozorňuje srozumitelnou formou.
                Práce testera není příliš složitá. Vše potřebné se naučíš v našem kurzu.
            </CourseBox>
            <CourseBox image='/images/dev_illustration.svg' side='left' title='Programátor'>
                <p className='mb-4'>
                    Aplikace se nevytvoří samy. Skrývá se za tím komplexní proces, jehož nedílnou částí je programování.
                </p>
                <p>
                    U nás se naučíš tvořit webové aplikace. Pod tím si můžeš představit třeba Gmail nebo Facebook.
                    Samozřejmě nebudeš hned tvořit tak velké věci, ale začneš u menších projektů.
                </p>
            </CourseBox>
        </section>
    )
}
