import { PackageBox } from "./PackageBox"
import { Typography } from "./Typography"

export function Packages() {
    return (
        <section className='flex flex-col items-center justify-center gap-4 bg-alt px-5 pt-20 pb-28'>
            <span id='packages'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='mb-8 text-center'>
                Začni se učit programovat ještě dnes!
            </Typography>
            <Typography className='mb-6 text-center' component='p'>
                Vyber si jeden z našich výhodných balíčků a ušetři pro začátek pár kaček
            </Typography>
            <div className='flex flex-row flex-wrap justify-center gap-8'>
                <PackageBox title='Basic' benefits={["Základní kurz testera", "Přístup na Discord"]} price={0} />
                <PackageBox
                    title='Core'
                    benefits={["Základní kurz testera", "Přístup na Discord", "5 konzultací"]}
                    price={1249}
                />
                <PackageBox
                    title='Standard'
                    benefits={[
                        "Základní kurz testera",
                        "Přístup na Discord",
                        "10 konzultací",
                        "Privátní skupina na Discordu",
                    ]}
                    price={2299}
                    priority
                />
                <PackageBox
                    title='Ultimate'
                    benefits={[
                        "Základní kurz testera",
                        "Přístup na Discord",
                        "15 konzultací",
                        "Privátní skupina na Discordu",
                        "Prioritní schůzky",
                    ]}
                    price={3999}
                />
            </div>
        </section>
    )
}
