import React from "react"
import Monitor from "./Monitor"

export const SignUpContainer: React.FC = () => (
    <div className='flex flex-col justify-center flex-auto mx-5 lg:flex-row lg:items-center'>
        <div className='z-10 lg:-mt-36 lg:max-w-[40vw]'>
            <h1 className='mt-12 font-bold text-center text-vh-md-fluid lg:text-lg-fluid'>
                Nauč se programovat a nech si za to platit!
            </h1>
            <p className='mt-4 text-center text-vh-sm-fluid text-blue-off lg:text-md-fluid'>
                Klademe si za cíl pomoci komukoliv získat dovednosti a znalosti vhodné pro práci v IT.
            </p>
            <p className='mt-4 text-center text-vh-sm-fluid text-blue-off lg:text-md-fluid'>
                To vše bez nesmyslných poplatků nebo vysokého školného.
            </p>
        </div>
        <div className='z-10'>
            <Monitor className='lg:w-[50vw] 2xl:w-[40vw]' />
        </div>
    </div>
)
