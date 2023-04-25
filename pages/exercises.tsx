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
import TurtleDesc from "../components/TurtleDesc.mdx"

const exercises = [
    [
        "Základy",
        { label: "Pták", value: "1_basic/bird" },
        { label: "Přerušovaná čára", value: "1_basic/dash_line" },
        { label: "Ryba", value: "1_basic/fish" },
        { label: "Vlajka", value: "1_basic/flag" },
        { label: "Srdce", value: "1_basic/heart" },
        { label: "M", value: "1_basic/m" },
        { label: "Jednička", value: "1_basic/one" },
        { label: "Obdélník", value: "1_basic/rectangle" },
        { label: "Čtverec", value: "1_basic/square" },
        { label: "T", value: "1_basic/t" },
        { label: "3 čáry", value: "1_basic/three_line" },
        { label: "Trojúhelník", value: "1_basic/triangle" },
    ],
    [
        "Cyklus",
        { label: "B", value: "2_cycle/b" },
        { label: "Přerušovaná čára", value: "2_cycle/dash_line" },
        { label: "Šestiúhelník", value: "2_cycle/hex" },
        { label: "Dům", value: "2_cycle/house" },
        { label: "Osmiúhelník", value: "2_cycle/octa" },
        { label: "Čtverec", value: "2_cycle/square" },
        { label: "Čtverec s useklými rohy", value: "2_cycle/square_edge" },
        { label: "Schody", value: "2_cycle/stairs" },
        { label: "Trojúhelník", value: "2_cycle/triangle" },
        { label: "Dva šestiúhelníky", value: "2_cycle/two_hex" },
    ],
    [
        "Zanořený cyklus",
        { label: "Kříž", value: "3_nested_cycle/cross" },
        { label: "Přerušovaný šestiúhelník", value: "3_nested_cycle/dash_hex" },
        { label: "Diamant", value: "3_nested_cycle/diamond" },
        { label: "Vločka", value: "3_nested_cycle/flake" },
        { label: "Kytka", value: "3_nested_cycle/flower" },
        { label: "Mlýn", value: "3_nested_cycle/mill" },
        { label: "Obdélníková kytka", value: "3_nested_cycle/rectangle_flower" },
    ],
    [
        "Funkce",
        { label: "B", value: "4_function/b" },
        { label: "Dům", value: "4_function/house" },
        { label: "Žebřík", value: "4_function/ledder" },
        { label: "Mnohoúhelník", value: "4_function/polygon" },
        { label: "Čtverce", value: "4_function/squares" },
        { label: "Dva čtverce", value: "4_function/two_squares" },
    ],
    [
        "Podmínky v cyklu",
        { label: "Kytka", value: "5_conditions_in_cycle/flower" },
        { label: "Kolo", value: "5_conditions_in_cycle/wheel" },
    ],
    [
        "Proměnná v cyklu",
        { label: "Rostoucí čtverec", value: "6_variable/growing_square" },
        { label: "Růže", value: "6_variable/rose" },
        { label: "Spirála", value: "6_variable/spirala" },
    ],
] as const

type ExercisesProps = {
    readonly headings: HeadingsType
}

const Exercises: React.FC<ExercisesProps> = ({ headings }) => {
    const [path, setPath] = useState("1_basic/bird")
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
                    <TurtleDesc />
                    <Select
                        onChange={handlePath}
                        value={path}
                        label='Cvičení'
                        placeholder='Vyber si cvičení'
                        groupValues={exercises}
                    />
                    <embed
                        className='aspect-video w-11/12 mx-auto mt-2'
                        src={`https://stackblitz.com/github/nauc-me-it/js-turtle-exercises?terminalHeight=0&embed=1&file=${path}_task.js&hideDevTools=1&hideExplorer=1&theme=dark&initialpath=index.html%23${hashPath}`}
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
