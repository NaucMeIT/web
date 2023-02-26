import React, { useState } from "react"
import path from "path"
import { GetStaticProps } from "next"
import { getFilesAt, HeadingsType, getMenuData, getHeadings } from "../utils/mdx"
import { Head } from "../components/Head"
import { InAppMenu } from "../components/InAppMenu"
import { SideMenu } from "../components/SideMenu"
import { TreeToC } from "../components/TreeToC"
import { Typography } from "../components/Typography"
import { Select } from "../components/Select"

type ExercisesProps = {
    readonly headings: HeadingsType
}

const Exercises: React.FC<ExercisesProps> = ({ headings }) => {
    const [path, setPath] = useState("basic/bird")
    const hashPath = path.replace("/", "%7C")

    const handlePath = (value: string) => {
        setPath(value)
    }

    return (
        <>
            <Head
                desc='Dostaň se do IT ještě dnes a sleduj svou cestu junior testera či programátora právě zde!'
                url='https://naucme.it/Exercises'
            >
                <title>Nauč mě IT - Cvičení</title>
            </Head>
            <InAppMenu />
            <div className='grid grid-cols-12 auto-rows-auto h-screen'>
                <div className='row-start-1 row-end-2 xl:row-end-7 xl:row-span-full col-span-full xl:col-span-2 mt-20 bg-secondary/5 overflow-auto'>
                    <SideMenu>
                        <TreeToC headings={headings} />
                    </SideMenu>
                </div>
                <main className='row-end-7 xl:col-start-3 col-span-full row-start-3 xl:row-start-1 row-span-full overflow-auto xl:mt-20 pb-2 overscroll-none'>
                    <Typography className='py-4' variant='h2' component='h1'>
                        Cvičení
                    </Typography>
                    <Select
                        onChange={handlePath}
                        value={path}
                        label='Cvičení'
                        placeholder='Vyber si cvičení'
                        groupValues={[
                            [
                                "Základní",
                                { label: "Pták", value: "basic/bird" },
                                { label: "Přerušovaná čára", value: "basic/dash_line" },
                                { label: "Ryba", value: "basic/fish" },
                                { label: "Vlajka", value: "basic/flag" },
                                { label: "Srdce", value: "basic/heart" },
                                { label: "M", value: "basic/m" },
                                { label: "Jedna", value: "basic/one" },
                                { label: "Obdélník", value: "basic/rectangle" },
                                { label: "Čtverec", value: "basic/square" },
                                { label: "T", value: "basic/t" },
                                { label: "3 čáry", value: "basic/three_line" },
                                { label: "Trojúhelník", value: "basic/triangle" },
                            ],
                            [
                                "Podmínky",
                                { label: "Kytka", value: "condition/flower" },
                                { label: "Kolo", value: "condition/wheel" },
                            ],
                            [
                                "Funkce",
                                { label: "B", value: "function/b" },
                                { label: "Dům", value: "function/house" },
                                { label: "Žebřík", value: "function/ledder" },
                                { label: "Mnohoúhelník", value: "function/polygon" },
                                { label: "Čtverce", value: "function/squares" },
                                { label: "Dva čtverce", value: "function/two_squares" },
                            ],
                            [
                                "Zanořený cyklus",
                                { label: "Kříž", value: "nested_cycle/cross" },
                                { label: "Přerušovaný šestiúhelník", value: "nested_cycle/dash_hex" },
                                { label: "Diamant", value: "nested_cycle/diamond" },
                                { label: "Vločka", value: "nested_cycle/flake" },
                                { label: "Kytka", value: "nested_cycle/flower" },
                                { label: "Mlýn", value: "nested_cycle/mill" },
                                { label: "Obdélníková kytka", value: "nested_cycle/rectangle_flower" },
                            ],
                            [
                                "Opakování",
                                { label: "B", value: "repetition/b" },
                                { label: "Přerušovaná čára", value: "repetition/dash_line" },
                                { label: "Šestiúhelník", value: "repetition/hex" },
                                { label: "Dům", value: "repetition/house" },
                                { label: "Osmiúhelník", value: "repetition/octa" },
                                { label: "Čtverec", value: "repetition/square" },
                                { label: "Čtverec s useklými rohy", value: "repetition/square_edge" },
                                { label: "Schody", value: "repetition/stairs" },
                                { label: "Trojúhelník", value: "repetition/triangle" },
                                { label: "Dva šestiúhelníky", value: "repetition/two_hex" },
                            ],
                            [
                                "Proměnná",
                                { label: "Rostoucí čtverec", value: "variable/growing_square" },
                                { label: "Růže", value: "variable/rose" },
                                { label: "Spirála", value: "variable/spirala" },
                            ],
                        ]}
                    />
                    <embed
                        className='aspect-video w-11/12 mx-auto mt-2'
                        src={`https://stackblitz.com/edit/web-platform-xzniwb?embed=1&file=${path}_task.js&hideDevTools=1&hideExplorer=1&theme=dark&initialpath=index.html%23${hashPath}`}
                    />
                </main>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<{}> = async () => {
    const folderPath = path.join(process.cwd(), "chapters")
    const paths = getFilesAt(folderPath, ".mdx")
    const menuData = getMenuData(paths, folderPath)
    const headings = getHeadings(menuData)

    return {
        props: {
            headings,
        },
    }
}

export default Exercises
