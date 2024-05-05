import Link from "next/link"
import { Typography } from "./Typography"

type EmailLinkProps = {
    readonly email: string
    readonly subject?: string
    readonly className?: string
}

export function EmailLink({ email, className, subject }: EmailLinkProps) {
    return (
        <Typography
            className={`hover:text-primary ${className || ""}`}
            component={Link}
            componentProps={
                {
                    href: `mailto:${email}?subject=${subject}`,
                    "data-splitbee-event": "External Link",
                    "data-splitbee-event-destination": `${email}-${subject}`,
                } as any
            }
        >
            {email}
        </Typography>
    )
}

EmailLink.defaultProps = {
    subject: "Dotaz na Nauč mě IT",
}
