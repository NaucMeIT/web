import React, { useEffect } from "react"
import { useStore } from "../hooks/useStore"
import { useVisible } from "../hooks/useVisible"
import Monitor from "./Monitor"

export const SignUpContainer: React.FC = () => {
    const [monitorRef, isVisible] = useVisible<HTMLDivElement, boolean>((vi) => vi >= 0.7)

    const setSignUpVisible = useStore((state) => state.setSignUpVisible)
    useEffect(() => {
        setSignUpVisible(isVisible)
    }, [setSignUpVisible, isVisible])

    return (
        <div className='flex flex-col justify-center flex-auto mx-5 lg:pt-5 lg:flex-row lg:items-center'>
            <div className='z-10 mt-30 lg:-mt-32 lg:max-w-[40vw]'>
                <h1 className='mt-24 font-bold text-center lg:mt-12 text-vh-md-fluid lg:text-lg-fluid'>
                    Nauč se programovat a nech si za to platit!
                </h1>
                <p className='mt-4 text-center text-vh-sm-fluid text-blue-off lg:text-md-fluid'>
                    Klademe si za cíl pomoci komukoliv získat dovednosti a znalosti vhodné pro práci v IT.
                </p>
                <p className='mt-4 text-center text-vh-sm-fluid text-blue-off lg:text-md-fluid'>
                    To vše bez časových limitací a za cenu dostupnou pro každého.
                </p>
            </div>
            <div className='z-10' ref={monitorRef}>
                <Monitor className='lg:w-[50vw] 2xl:w-[40vw]' />
            </div>
        </div>
    )
}
