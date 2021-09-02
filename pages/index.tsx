import type { NextPage } from "next"
import Head from "next/head"
import React from "react"
import { MainMenu } from "../components/MainMenu"

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Nauč mě IT - Úvodní strana</title>
            </Head>

            <main>
                <div className='absolute top-0 right-0 w-vw-50 lg:w-vw-25 h-vw-50 lg:h-vw-25 bg-gradient-rad-t-r from-green-off'></div>
                <div className='absolute bottom-0 left-0 w-vw-50 lg:w-vw-25 h-vw-50 lg:h-vw-25 bg-gradient-rad-b-l from-green-off'></div>
                <MainMenu
                    items={[
                        { title: "Home", link: "#" },
                        { title: "About", link: "#" },
                    ]}
                />
            </main>
        </>
    )
}

export default Home
