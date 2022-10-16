export const typographyClasses = {
    h1: "font-semibold text-3xl text-secondary uppercase",
    h2: "font-light text-2xl text-primary leading-tight",
    h3: "font-light text-xl text-secondary tracking-wider",
    step: "font-light text-lg text-secondary",
    important: "font-light text-base text-highlight",
    normal: "font-light text-highlight",
    error: "font-light text-error",
    // subtitle: "font-montserrat italic font-normal text-primary",
    link: "font-medium text-primary",
    form: "italic font-light text-xs text-form",
    eyeCatch: "font-semibold text-4xl uppercase text-secondary tracking-huge",
    menu: "font-medium text-base text-highlight",
    menuActive: "font-bold text-base text-primary",
} as const
export const types = Object.keys(typographyClasses) as readonly (keyof typeof typographyClasses)[]

type TypographyProps<D extends React.ElementType> = {
    readonly children?: React.ReactNode
    readonly variant: keyof typeof typographyClasses
    readonly component?: D
    readonly className?: string
    readonly componentProps?: React.ComponentProps<D>
}

function Typography<D extends React.ElementType>({
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

Typography.defaultProps = {
    variant: "normal",
}

export { Typography }
