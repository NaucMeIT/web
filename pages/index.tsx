import type { NextPage } from "next"
import React from "react"
import { AtSymbolIcon, ClipboardCheckIcon, CodeIcon, HomeIcon, InformationCircleIcon } from "@heroicons/react/outline"
import Head from "../components/Head"
import { MainMenu } from "../components/MainMenu"
import { SignUpContainer } from "../components/SignUpContainer"
import { PathList } from "../components/PathList"
import { SellPoints } from "../components/SellPoints"

type IconProps = Readonly<React.ComponentProps<"svg">>

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
                <MainMenu
                    items={[
                        {
                            icon: (props: IconProps) => <HomeIcon {...props} color={"#fff"} />,
                            title: "Úvod",
                            link: "#home",
                            active: true,
                        },
                        {
                            icon: (props: IconProps) => <InformationCircleIcon {...props} color={"#fff"} />,
                            title: "O kurzu",
                            link: "#about",
                        },
                        {
                            icon: (props: IconProps) => <ClipboardCheckIcon {...props} color={"#fff"} />,
                            title: "Tester",
                            link: "#qa",
                        },
                        {
                            icon: (props: IconProps) => <CodeIcon {...props} color={"#fff"} />,
                            title: "Vývojář",
                            link: "#developer",
                        },
                        {
                            icon: (props: IconProps) => <AtSymbolIcon {...props} color={"#fff"} />,
                            title: "Kontakt",
                            link: "#contact",
                        },
                    ]}
                />
                <SignUpContainer />
            </header>
            <main>
                <SellPoints />
                <PathList />
            </main>
            <footer id='contact'>
                <div className='bg-blue-main px-[10vw] py-10'>
                    <h2 className={`lg:min-w-[80vw] z-10 self-start ml-0 text-lg-fluid text-blue-highlight`}>
                        Kontakt
                    </h2>
                    <h3 className='mt-5 text-md-fluid'>Přihlášky, informace</h3>{" "}
                    <a className='text-sm-fluid text-blue-off' href='mailto:lydie.hemalova@naucme.it'>
                        info@naucme.it
                    </a>
                    <h3 className='mt-5 text-md-fluid'>Petr Glaser - senior vývojář</h3>{" "}
                    <a className='text-sm-fluid text-blue-off' href='mailto:petr.glaser@naucme.it'>
                        petr.glaser@naucme.it
                    </a>
                    <h3 className='mt-5 text-md-fluid'>Lýdie Hemalová - tester</h3>{" "}
                    <a className='text-sm-fluid text-blue-off' href='mailto:lydie.hemalova@naucme.it'>
                        lydie.hemalova@naucme.it
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Home
