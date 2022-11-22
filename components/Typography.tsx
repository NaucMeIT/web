export const typographyClasses = {
    h1: "font-semibold text-3xl text-secondary uppercase",
    h2: "text-2xl text-primary leading-tight",
    h3: "text-xl text-secondary tracking-wider",
    step: "text-lg text-secondary",
    important: "text-base text-highlight",
    normal: "text-highlight",
    strong: "font-semibold text-highlight",
    error: "text-error",
    // subtitle: "font-montserrat italic font-normal text-primary",
    link: "font-semibold text-primary hover:text-secondary",
    form: "italic text-xs text-form",
    eyeCatch: "font-semibold text-4xl uppercase text-secondary tracking-huge",
    menu: "font-medium text-base text-highlight hover:text-primary",
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
