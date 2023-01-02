import type { NextPage } from "next"
import React from "react"
import { Head } from "../components/Head"
import { Spoiler } from "../components/Spoiler"

const Interested: NextPage = () => {
    return (
        <>
            <Head
                desc='Mám zájem Naučit se IT a posunout se v kariéře dál!'
                url='https://naucme.it/interested'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/facebook.png'
            >
                <title>Mám zájem Naučit se IT!</title>
            </Head>

            <main>
                <Spoiler textButton='Ukaž řešení!'>
                    Toto je strašně dlouhý text, který musíme skrýt, aby student neviděl cvičení. Toto je strašně dlouhý
                    text, který musíme skrýt, aby student neviděl cvičení. Toto je strašně dlouhý text, který musíme
                    skrýt, aby student neviděl cvičení. Toto je strašně dlouhý text, který musíme skrýt, aby student
                    neviděl cvičení. Toto je strašně dlouhý text, který musíme skrýt, aby student neviděl cvičení. Toto
                    je strašně dlouhý text, který musíme skrýt, aby student neviděl cvičení. Toto je strašně dlouhý
                    text, který musíme skrýt, aby student neviděl cvičení. lov Toto je strašně dlouhý text, který musíme
                    skrýt, aby student neviděl cvičení. Toto je strašně dlouhý text, který musíme skrýt, aby student
                    neviděl cvičení. Toto je strašně dlouhý text, který musíme skrýt, aby student neviděl cvičení. Toto
                    je strašně dlouhý text, který musíme skrýt, aby student neviděl cvičení. Toto je strašně dlouhý
                    text, který musíme skrýt, aby student neviděl cvičení.
                </Spoiler>
            </main>
        </>
    )
}

export default Interested
