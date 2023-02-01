import type { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { useId } from "react"
import { Typography, typographyClasses } from "./Typography"

type InputProps = {
    readonly width?: string
    readonly label?: string
    readonly component?: "input"
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TextareaProps = {
    readonly width?: string
    readonly label: string
    readonly component: "textarea"
} & DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const inputBorderVars = {
    "--path": "30px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20px",
    "--border": "2px",
} as React.CSSProperties

function DecoratedInput(props: Readonly<InputProps | TextareaProps>): JSX.Element {
    // TODO: Needs to solve props inference
    const Input: any = props.component
    const id = useId()
    const name = props.name ?? id
    return (
        <div className={`flex flex-col gap-y-4 ${props.width || "w-full"}`}>
            <Typography componentProps={{ htmlFor: name }} component='label'>
                {props.label}
            </Typography>
            <div
                style={inputBorderVars}
                className='polygon-path before:ease inline-block w-full before:bg-form before:transition-colors before:duration-150 focus-within:before:bg-primary'
            >
                <Input
                    {...props}
                    name={name}
                    className={`${
                        typographyClasses.form
                    } w-full bg-transparent px-6 pt-5 pb-4 outline-none transition-colors duration-150 focus:text-highlight ${
                        props.className || ""
                    }`}
                    aria-label={props.label}
                />
            </div>
        </div>
    )
}

DecoratedInput.defaultProps = {
    component: "input",
}

export { DecoratedInput }
