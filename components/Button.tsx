import Link, { LinkProps } from "next/link"
import { typographyClasses } from "./Typography"

type Props = {
    readonly theme: "main" | "off"
    readonly disabled?: boolean
    readonly className?: string
}
// eslint-disable-next-line functional/no-return-void
type NormalButtonProps = Props & JSX.IntrinsicElements["button"]
type LinkButtonProps = Props & LinkProps
type ButtonProps = (LinkButtonProps | NormalButtonProps) & {
    readonly children: string
    readonly size?: "large" | "normal"
}
type SocialButtonProps = (Omit<NormalButtonProps, "theme"> | Omit<LinkButtonProps, "theme">) & {
    readonly children: React.ReactElement
    readonly label: string
}

const mainClasses =
    "border-none polygon-path focus-visible:outline-none before:bg-primary focus:before:bg-secondary text-center appearance-button"
const themeClasses = {
    main: "bg-primary",
    off: "bg-scroll bg-animable bg-clip-border bg-origin-padding bg-transparent bg-100/0 bg-bottom bg-no-repeat transition-backgroundSize duration-1000 hover:duration-500 ease hover:bg-100/100",
}
const sizeClasses = {
    large: "pt-6 pb-5 pl-11 pr-12",
    normal: "pt-2 pb-2 pl-7 pr-8",
}
const polygonBorderVars = {
    "--path": "20% 0%, 90% 0%, 100% 20%, 100% 50%, 80% 100%, 20% 100%, 10% 100%, 0% 70%, 0% 40%",
    "--border": "2px",
} as React.CSSProperties
const hexagonBorderVars = {
    "--path": "30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%",
    "--border": "2px",
} as React.CSSProperties

export function Button({ className, disabled, children, theme, size, ...rest }: ButtonProps) {
    const props = {
        className: `${mainClasses} ${themeClasses[theme]} ${
            disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:animate-wiggle"
        } ${"href" in rest ? "pointer-events-none" : sizeClasses[size || "normal"]} ${typographyClasses.normal} ${
            className ?? ""
        }`,
        style: polygonBorderVars,
    }

    return "href" in rest ? (
        <button {...props} tabIndex={-1}>
            <Link {...rest} passHref>
                <a className={`pointer-events-auto inline-flex ${sizeClasses[size || "normal"]}`}>{children}</a>
            </Link>
        </button>
    ) : (
        <button {...props} {...rest}>
            {children}
        </button>
    )
}

export function SocialButton({ label, className, disabled, children, ...rest }: SocialButtonProps) {
    const props = {
        className: `${mainClasses} ${themeClasses.off} ${
            disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:animate-wiggle"
        } ${"href" in rest ? "pointer-events-none" : "py-2 px-5"} ${typographyClasses.normal} ${
            className ?? ""
        } inline-flex items-center aspect-square`,
        style: hexagonBorderVars,
    }

    return "href" in rest ? (
        <span {...props} tabIndex={-1}>
            <Link {...rest}>
                <a className='pointer-events-auto inline-flex py-2 px-5' aria-label={label}>
                    {children}
                </a>
            </Link>
        </span>
    ) : (
        <button {...props} {...rest} aria-label={label}>
            {children}
        </button>
    )
}
