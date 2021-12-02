import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

interface MonitorProps {
    readonly className?: string
}

const Monitor: React.FC<MonitorProps> = ({ className }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => setIsMounted(true), [])

    const prefersReducedMotion = useMediaQuery({
        query: "(prefers-reduced-motion: reduce)",
    })
    const [animDone, setAnimDone] = useState(false)

    // HACK: React does not know about onend event
    // eslint-disable-next-line functional/prefer-readonly-type
    const animateRef = useRef<SVGAnimateElement & { onend: unknown }>(null)
    useEffect(() => {
        if (prefersReducedMotion) {
            setAnimDone(true)
        } else if (animateRef.current) {
            // eslint-disable-next-line functional/immutable-data
            animateRef.current.onend = () => {
                setAnimDone(true)
            }
        }
    }, [animateRef, prefersReducedMotion])

    return (
        <svg className={`${className}`} viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
            <g>
                <g>
                    <path
                        d='m496 76v268h-480v-268a19.994 19.994 0 0 1 20-20h440a19.994 19.994 0 0 1 20 20z'
                        style={{ fill: "rgb(4, 13, 33)" }}
                    />
                    <path
                        d='m496 344v28a19.994 19.994 0 0 1 -20 20h-440a19.994 19.994 0 0 1 -20-20v-28z'
                        fill='#d8d7da'
                    />
                    <path d='m312 432h-112l8-40h96z' fill='#57565c' />
                    <path d='m160 432h192v24h-192z' fill='#d8d7da' />
                </g>
                <g>
                    <g>
                        <a href='https://forms.gle/NJ6zygSCNwa4LRbD7'>
                            <rect
                                style={{ fill: "rgb(52, 208, 88)", display: animDone ? "block" : "none" }}
                                x='46'
                                y='164'
                                width='419.823'
                                height='82.377'
                                rx='20'
                                ry='20'
                            />
                            <text
                                className='text-4xl font-bold uppercase whitespace-pre fill-current text-green-contrast-highlight'
                                x='52'
                                y='218'
                            >
                                {"»"}
                            </text>
                            <path id='MyPath'>
                                <animate
                                    attributeType='XML'
                                    attributeName='d'
                                    from='m77,218 h0'
                                    to='m77,218 h512'
                                    dur={prefersReducedMotion && isMounted ? "1ms" : "1s"}
                                    begin='0s'
                                    fill='freeze'
                                    ref={animateRef}
                                />
                            </path>
                            <text className='text-4xl font-bold uppercase whitespace-pre fill-current text-green-contrast-highlight'>
                                <textPath xlinkHref='#MyPath'>Chci pracovat v IT!</textPath>
                            </text>
                        </a>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default Monitor
