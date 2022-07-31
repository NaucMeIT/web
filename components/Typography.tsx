export const typographyClasses = {
    h1: "font-poppins font-semibold text-3xl text-secondary uppercase",
    h2: "font-poppins font-light text-2xl text-primary leading-tight",
    h3: "font-poppins font-light text-xl text-secondary tracking-wider",
    step: "font-poppins font-light text-lg text-secondary",
    important: "font-poppins font-light text-base text-highlight",
    normal: "font-poppins font-light text-sm text-highlight",
    subtitle: "font-montserrat italic font-normal text-sm text-primary",
    link: "font-poppins font-medium text-sm text-primary",
    form: "font-poppins italic font-light text-xs text-form",
    eyeCatch: "font-poppins font-semibold text-4xl uppercase text-secondary tracking-huge",
    menu: "font-poppins font-medium text-base text-highlight",
    menuActive: "font-poppins font-bold text-base text-primary",
} as const
export const types = Object.keys(typographyClasses) as readonly (keyof typeof typographyClasses)[]

type TypographyProps<D extends React.ElementType> = {
    readonly children: React.ReactNode
    readonly variant: keyof typeof typographyClasses
    readonly component?: D
    readonly className?: string
    readonly componentProps?: React.ComponentProps<D>
}

export function Typography<D extends React.ElementType>({
    className,
    children,
    variant,
    component,
    componentProps,
}: TypographyProps<D>) {
    const El = component || "span"

    return (
        <El {...componentProps} className={`${typographyClasses[variant]} ${className || ""}`}>
            {children}
        </El>
    )
}
