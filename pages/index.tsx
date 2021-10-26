import type { NextPage } from "next"
import Head from "../components/Head"
import React from "react"
import { MainMenu } from "../components/MainMenu"
import { SignUpContainer } from "../components/SignUpContainer"
import { PathList } from "../components/PathList"

const Home: NextPage = () => {
    return (
        <>
            <Head
                desc='Mám zájem Naučit se IT a posunout se v kariéře dál!'
                url='https://naucme.it/interested'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/facebook.png'
            >
                <title>Nauč mě IT - Úvodní strana</title>
            </Head>

            <header>
                {/* <div className='absolute top-0 right-0 w-vw-50 lg:w-vw-25 h-vw-50 lg:h-vw-25 bg-gradient-rad-t-r from-green-off'></div> */}
                {/* <div className='absolute left-[-37.5vh] -bottom-1/3 -z-1 w-vh-75 h-vh-75 bg-gradient-rad-c from-green-off'></div> */}
                <MainMenu
                    items={[
                        { title: "⌂ Home", link: "#", active: true },
                        { title: "★ About", link: "#" },
                    ]}
                />
                <SignUpContainer />
            </header>
            <main className='mt-10'>
                <PathList />
            </main>
        </>
    )
}

export default Home
