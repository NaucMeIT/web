import { Button } from "./Button"
import { Problem } from "./Problem"
import { Typography } from "./Typography"

export function CompanyCatch() {
    return (
        <section className='my-36 bg-alt py-16'>
            <span id='company'>&nbsp;</span>
            <Typography variant='h2' className='mb-11 block text-center' component='h2'>
                Potřebujete zaměstnance na míru?
            </Typography>
            <div className='mx-auto flex max-w-6xl flex-col flex-wrap items-center justify-center gap-6 w-fit mb-6'>
                <Problem order={1} title='Ne každý vývojář je dobrý mentor'>
                    Existuje spousta excelentních programátorů. To však neznamená, že umí dobře předat své znalosti. Je
                    to zcela jiná disciplína, ve které se nemusí cítit vůbec dobře. Při vynuceném mentorování nováčků
                    riskujete ztrátu zkušeného matadora!
                </Problem>
                <Problem order={2} title='Vývoj nepočká'>
                    Málokdo si může dovolit vyhradit lidi z projektu na mentoring nováčků. Je to potřeba, ale vývoj
                    generuje peníze. Pokud produkt stagnuje, může dojít k odlivu zákazníků ke konkurenci.
                </Problem>
                <Problem order={3} title='Příprava materiálů'>
                    Pokud chcete juniora naučit všemu potřebnému, je třeba věnovat nemalé úsilí přípravě materiálů. Poté
                    je někdo musí aktualizovat. Průběžně vylepšovat a sbírat zpětnou vazbu na jejich kvalitu. To je
                    velmi náročné, pokud nevzděláváte desítky studentů ročně.
                </Problem>
                <Problem order={4} title='Platforma'>
                    Cvičení jsou připravená, ale kde je provozovat? Svět se neustále posouvá kupředu, a tak i cvičné
                    prostředí může být téměř nerozeznatelné od vývojového. Pokud si žák v průběhu studia zvyká na editor
                    a jeho prostředí, bude mnohem efektivnější ihned po nástupu.
                </Problem>
            </div>
            <Button theme='off' size='large' className='w-max mx-auto block' href='/companies'>
                Chci zaměstnance
            </Button>
        </section>
    )
}
