import Link, { LinkProps } from "next/link"
import { isExternalUrl } from "../utils/string"
import { typographyClasses } from "./Typography"
import Image from "next/image"
import LinkedIn from "../images/linkedin.svg"
import { Facebook } from "./icons"

type Props = {
    readonly theme: "main" | "off" | "naked"
    readonly disabled?: boolean
    readonly className?: string
}
type NormalButtonProps = Props & JSX.IntrinsicElements["button"]
export type LinkButtonProps = Props & LinkProps
export type ButtonProps = (LinkButtonProps | NormalButtonProps) & {
    readonly children: string
    readonly size?: keyof typeof sizeClasses
}
type SocialButtonProps = (Omit<NormalButtonProps, "theme"> | Omit<LinkButtonProps, "theme">) & {
    readonly children: React.ReactElement
    readonly label: string
    readonly naked?: boolean
}

const disabledClasses = "cursor-not-allowed pointer-events-none opacity-80"
const enabledClasses = "cursor-pointer hover:animate-wiggle"
const mainClasses =
    "inline-flex border-none polygon-path focus-visible:outline-none before:bg-primary focus:before:bg-secondary text-center appearance-button"
const themeClasses = {
    enabled: {
        naked: "",
        main: `bg-primary ${enabledClasses} hover:text-highlight`,
        off: `bg-scroll bg-animable bg-clip-border bg-origin-padding bg-transparent bg-100/0 bg-bottom bg-no-repeat transition-backgroundSize duration-1000 hover:duration-500 ease hover:bg-100/100 ${enabledClasses}`,
    },
    disabled: {
        naked: "",
        main: `bg-primary ${disabledClasses}`,
        off: `bg-scroll bg-animable bg-clip-border bg-origin-padding bg-transparent bg-100/0 bg-bottom bg-no-repeat ${disabledClasses}`,
    },
}
const sizeClasses = {
    huge: "pt-6 pb-5 pl-14 pr-16 text-xl",
    large: "pt-6 pb-5 pl-11 pr-12",
    medium: "pt-4 pb-4 pl-11 pr-12",
    normal: "pt-2 pb-2 pl-7 pr-8",
    none: "",
    icon: "p-4",
}
const polygonBorderVars = {
    "--path": "20% 0%, 90% 0%, 100% 20%, 100% 50%, 80% 100%, 20% 100%, 10% 100%, 0% 70%, 0% 40%",
    "--border": "2px",
} as React.CSSProperties
const hexagonBorderVars = {
    "--path": "30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%",
    "--border": "2px",
} as React.CSSProperties

export function Button({ className, disabled, children, theme, size, ...rest }: Readonly<ButtonProps>) {
    const props = {
        className: `${theme !== "naked" && mainClasses} ${
            disabled ? themeClasses.disabled[theme] : themeClasses.enabled[theme]
        } ${typographyClasses.normal} ${className ?? ""} ${
            "href" in rest && !!rest.href ? "pointer-events-none" : sizeClasses[size || "normal"]
        }`,
        style: polygonBorderVars,
    }
    const hasHref = "href" in rest && !!rest.href
    const splitBeeProps =
        hasHref && isExternalUrl(rest.href)
            ? {
                  "data-splitbee-event": "External Link",
                  "data-splitbee-event-destination": rest.href,
              }
            : hasHref
            ? {}
            : {
                  "data-splitbee-event": "Button",
                  "data-splitbee-event-destination": `${children}`,
              }

    return hasHref ? (
        <span {...props} tabIndex={-1}>
            <Link
                {...rest}
                className={`pointer-events-auto h-full items-center ${sizeClasses[size || "normal"]}`}
                target={isExternalUrl(rest.href) ? "_blank" : "_self"}
                {...splitBeeProps}
            >
                {children}
            </Link>
        </span>
    ) : (
        <button {...props} {...(rest as NormalButtonProps)} {...splitBeeProps}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    type: "button",
}

export function SocialButton({ naked, label, className, disabled, children, ...rest }: Readonly<SocialButtonProps>) {
    const theme = naked ? "naked" : "off"
    const props = {
        className: `${naked ? "" : mainClasses} ${
            disabled ? themeClasses.disabled[theme] : themeClasses.enabled[theme]
        } ${"href" in rest ? "pointer-events-none" : ""} ${sizeClasses.icon} ${
            className ?? ""
        } items-center aspect-square`,
        style: hexagonBorderVars,
    }
    const hasHref = "href" in rest && !!rest.href
    const splitBeeProps =
        hasHref && isExternalUrl(rest.href)
            ? {
                  "data-splitbee-event": "External Link",
                  "data-splitbee-event-destination": rest.href,
              }
            : hasHref
            ? {}
            : {
                  "data-splitbee-event": "Button",
                  "data-splitbee-event-destination": label,
              }

    return hasHref ? (
        <span {...props} tabIndex={-1}>
            <Link
                {...rest}
                className='pointer-events-auto h-full items-center inline-flex p-2'
                aria-label={label}
                target={isExternalUrl(rest.href) ? "_blank" : "_self"}
                {...splitBeeProps}
            >
                {children}
            </Link>
        </span>
    ) : (
        <button {...props} {...(rest as NormalButtonProps)} aria-label={label}>
            {children}
        </button>
    )
}

SocialButton.defaultProps = {
    type: "button",
}

export const LinkedInBtn = (props: { readonly href: string; readonly label: string }) => (
    <SocialButton {...props}>
        <Image src={LinkedIn} width={16} height={16} alt='LinkedIn' />
    </SocialButton>
)

export const FacebookBtn = (props: { readonly href: string; readonly label: string }) => (
    <SocialButton {...props}>
        <Facebook width={16} />
    </SocialButton>
)
