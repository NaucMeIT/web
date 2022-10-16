import { packages } from "../utils/packages"
import { PackageBox } from "./PackageBox"
import { Typography } from "./Typography"

export function Packages() {
    return (
        <section className='flex flex-col items-center justify-center gap-4 bg-alt px-5 pt-20 pb-28'>
            <span id='packages'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='mb-8 text-center'>
                Začni se učit ještě dnes!
            </Typography>
            <Typography className='mb-6 text-center' component='p'>
                Vyber si jeden z našich výhodných balíčků a ušetři pro začátek pár kaček.
            </Typography>
            <div className='grid md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 justify-center gap-8'>
                {packages.map((p) => (
                    <PackageBox
                        key={p.title}
                        {...p}
                        buttonProps={{ href: `/sign?startPlan=${p.title}` }}
                        priority={p.title === "Standard"}
                    />
                ))}
            </div>
        </section>
    )
}
