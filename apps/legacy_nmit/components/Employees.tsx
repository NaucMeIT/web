import { CourseBox } from "./CourseBox"
import { Typography } from "./Typography"

type EmployeesProps = {
    readonly link: string
}

export function Employees({ link }: EmployeesProps) {
    return (
        <section>
            <span id='employees'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='text-center'>
                Možní zaměstnanci
            </Typography>
            <CourseBox
                image='/images/qa_illustration.svg'
                width={320}
                height={291}
                side='right'
                title='Tester'
                link={link}
            >
                <p className='mb-4'>
                    Chyby stojí nemálo peněz. Jedna z těch nejdražších bylo vozidlo Mars Climate Orbiter, kterému se
                    nepovedlo přistát na Marsu. Důvod? Řídící software od NASA očekával metrické jednotky, ale naváděcí
                    software používal imperiální. Při vývoji se objevilo mnoho varování, avšak byla ignorována.
                </p>
                <p>
                    Nechcete draze platit za zbytečné chyby? Pak potřebujete testery. Čím později je objevena chyba ve
                    vývoji, tím je dražší.
                </p>
            </CourseBox>
        </section>
    )
}
