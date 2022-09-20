import Link, { LinkProps } from "next/link"
import { isExternalUrl } from "../utils/string"
import { typographyClasses } from "./Typography"

type Props = {
    readonly theme: "main" | "off"
    readonly disabled?: boolean
    readonly className?: string
}
type NormalButtonProps = Props & JSX.IntrinsicElements["button"]
type LinkButtonProps = Props & LinkProps
export type ButtonProps = (LinkButtonProps | NormalButtonProps) & {
    readonly children: string
    readonly size?: "large" | "normal"
}
type SocialButtonProps = (Omit<NormalButtonProps, "theme"> | Omit<LinkButtonProps, "theme">) & {
    readonly children: React.ReactElement
    readonly label: string
}

const disabledClasses = "cursor-not-allowed pointer-events-none opacity-80"
const enabledClasses = "cursor-pointer hover:animate-wiggle"
const mainClasses =
    "inline-flex border-none polygon-path focus-visible:outline-none before:bg-primary focus:before:bg-secondary text-center appearance-button"
const themeClasses = {
    enabled: {
        main: `bg-primary ${enabledClasses}`,
        off: `bg-scroll bg-animable bg-clip-border bg-origin-padding bg-transparent bg-100/0 bg-bottom bg-no-repeat transition-backgroundSize duration-1000 hover:duration-500 ease hover:bg-100/100 ${enabledClasses}`,
    },
    disabled: {
        main: `bg-primary ${disabledClasses}`,
        off: `bg-scroll bg-animable bg-clip-border bg-origin-padding bg-transparent bg-100/0 bg-bottom bg-no-repeat ${disabledClasses}`,
    },
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
        className: `${mainClasses} ${disabled ? themeClasses.disabled[theme] : themeClasses.enabled[theme]} ${
            "href" in rest ? "pointer-events-none" : sizeClasses[size || "normal"]
        } ${typographyClasses.normal} ${className ?? ""}`,
        style: polygonBorderVars,
    }

    return "href" in rest ? (
        <span {...props} tabIndex={-1}>
            <Link
                {...rest}
                className={`pointer-events-auto h-full items-center ${sizeClasses[size || "normal"]}`}
                target={isExternalUrl(rest.href) ? "_blank" : "_self"}
            >
                {children}
            </Link>
        </span>
    ) : (
        <button {...props} {...rest}>
            {children}
        </button>
    )
}

export function SocialButton({ label, className, disabled, children, ...rest }: SocialButtonProps) {
    const props = {
        className: `${mainClasses} ${disabled ? themeClasses.disabled.off : themeClasses.enabled.off} ${
            "href" in rest ? "pointer-events-none" : sizeClasses.normal
        } ${className ?? ""} items-center aspect-square`,
        style: hexagonBorderVars,
    }

    return "href" in rest ? (
        <span {...props} tabIndex={-1}>
            <Link
                {...rest}
                className='pointer-events-auto h-full items-center inline-flex py-2 px-5'
                aria-label={label}
                target={isExternalUrl(rest.href) ? "_blank" : "_self"}
            >
                {children}
            </Link>
        </span>
    ) : (
        <button {...props} {...rest} aria-label={label}>
            {children}
        </button>
    )
}
