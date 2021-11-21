import React from "react"
import Image from "next/image"

interface IconProps {
    path: string
    alt: string
}

interface PathProps {
    mainColour: "blue" | "green"
    id: string
    title: string
    text: string[]
    textQuote?: string
    icon?: IconProps
}

export const Path: React.FC<PathProps> = ({ mainColour, text, title, textQuote, icon, id }) => {
    const textClasses = `
		z-10 pt-5 mx-auto my-0 text-md-fluid ${mainColour === "green" ? "text-green-off" : "text-blue-off"}
	`
    return (
        <article
            className={`flex flex-col justify-center items-center ${
                mainColour === "green" ? "bg-green-main" : "bg-blue-main"
            } px-[10vw] py-10`}
        >
            <div className='flex flex-col flex-wrap lg:flex-row'>
                <h2
                    id={id}
                    className={`lg:min-w-[80vw] z-10 self-start ml-0 text-lg-fluid ${
                        mainColour === "green" ? "text-green-highlight" : "text-blue-highlight"
                    }`}
                >
                    {title}
                </h2>
                <section className={`${icon && "lg:w-[65%]"}`}>
                    {text.map((t, i) => (
                        <p key={id + i} className={textClasses}>
                            {t}
                        </p>
                    ))}
                </section>
                {icon && (
                    <div className='w-[40vw] h-[40vw] mx-auto lg:w-[25vw] lg:h-[25vw] order-first lg:order-1 lg:pl-10'>
                        <Image src={icon.path} alt={icon.alt} layout='responsive' width={"100"} height={"100"} />
                    </div>
                )}
            </div>
            {textQuote && <blockquote className={textClasses + "italic"}>{textQuote}</blockquote>}
        </article>
    )
}
