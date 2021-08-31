import type { NextPage } from "next"
import Head from "next/head"
import React from "react"
import Preparation from "../components/Preparation"

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Nauč mě IT - Úvodní strana</title>
            </Head>

            <main>
                <Preparation />
            </main>
        </>
    )
}

export default Home
