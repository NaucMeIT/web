import posthog from "posthog-js"
import splitbee from "@splitbee/web"
import { packages } from "../utils/packages"
import { PackageBox } from "./PackageBox"
import { Typography } from "./Typography"

type Props = {
    readonly selectedPackage: string
    readonly isEdit: boolean
}

export function PickPackage({ selectedPackage, isEdit }: Props) {
    const editParam = isEdit ? "&isEdit=true" : ""

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
                        buttonProps={{
                            href: `/profile/edit?startPlan=${p.title}${editParam}`,
                            replace: true,
                            scroll: false,
                            onClick: () => {
                              splitbee.track("Package change", { package: p.title })
                              posthog.capture('Package change', { package: p.title })
                            }
                        }}
                        priority={selectedPackage === p.title}
                    />
                ))}
            </div>
        </section>
    )
}
