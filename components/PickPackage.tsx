import { packages } from "../utils/packages"
import { PackageBox } from "./PackageBox"
import { Typography } from "./Typography"

// eslint-disable-next-line functional/no-mixed-type
type Props = {
    readonly selectedPackage: string
}

export function PickPackage({ selectedPackage }: Props) {
    return (
        <section className='flex flex-col items-center justify-center gap-4'>
            <Typography variant='h2' component='h2' className='mb-8 text-center'>
                Vyber si plán
            </Typography>
            <Typography className='mb-6 text-center' component='p'>
                Vyber si jeden z našich výhodných balíčků a ušetři pro začátek pár kaček.
            </Typography>
            <div className='grid w-full md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 justify-center gap-8'>
                {packages.map((p) => (
                    <PackageBox
                        key={p.title}
                        {...p}
                        radioInput
                        buttonProps={{ href: `/register?startPlan=${p.title}`, replace: true, scroll: false }}
                        priority={selectedPackage === p.title}
                    />
                ))}
            </div>
        </section>
    )
}
