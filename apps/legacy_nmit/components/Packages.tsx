import { packages as defaultPackages } from "../utils/packages"
import { PackageBox } from "./PackageBox"
import { Typography } from "./Typography"

type PackagesProps = {
    readonly packages?: typeof defaultPackages
    readonly headline?: string
    readonly subHeadline?: string
}

type BuilderPackage = {
    readonly title: string
    readonly benefits: readonly { text: string }[]
    readonly price: number
    readonly priority: boolean
}

type BuilderPackagesProps = {
    readonly packages: BuilderPackage[]
    readonly headline: string
    readonly subHeadline: string
}

export function Packages({
    packages = defaultPackages,
    headline = "Začni se učit ještě dnes!",
    subHeadline = "Vyber si jeden z našich výhodných balíčků a ušetři pro začátek pár kaček.",
}: PackagesProps) {
    return (
        <section className='flex flex-col items-center justify-center gap-4 bg-alt px-5 pt-20 pb-28'>
            <span id='packages'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='mb-8 text-center'>
                {headline}
            </Typography>
            <Typography className='mb-6 text-center' component='p'>
                {subHeadline}
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

export function BuilderPackages({ packages, headline, subHeadline }: BuilderPackagesProps) {
    const mappedPackages = packages?.map((p) => ({ ...p, benefits: p.benefits.map((b) => b.text) }))

    return (
        <section className='flex flex-col items-center justify-center gap-4 bg-alt px-5 pt-20 pb-28'>
            <span id='packages'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='mb-8 text-center'>
                {headline}
            </Typography>
            <Typography className='mb-6 text-center max-w-5xl' component='p'>
                {subHeadline}
            </Typography>
            <div className='grid grid-cols-1 grid-rows-1 md:grid-cols-2 justify-center gap-8'>
                {mappedPackages.map((p) => (
                    <PackageBox key={p.title} {...p} buttonProps={{ href: "#contact" }} priority={p.priority} />
                ))}
            </div>
        </section>
    )
}
