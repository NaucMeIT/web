import React from "react"
import { NextPage } from "next"
import { Spoiler } from "../components/Spoiler"

const PlayGround: NextPage = () => {
    return (
        <>
            <Spoiler textButton='Zobrazit odpověď'>
                This is text in outer div! Really long text, so that it should be hidden below the centered text. This
                is text in outer div! Really long text, so that it should be hidden below the centered text. This is
                text in outer div! Really long text, so that it should be hidden below the centered text. This is text
                in outer div! Really long text, so that it should be hidden below the centered text. This is text in
                outer div! Really long text, so that it should be hidden below the centered text. This is text in outer
                div! Really long text, so that it should be hidden below the centered text. This is text in outer div!
                Really long text, so that it should be hidden below the centered text. This is text in outer div! Really
                long text, so that it should be hidden below the centered text. This is text in outer div! Really long
                text, so that it should be hidden below the centered text.
            </Spoiler>
        </>
    )
}
export default PlayGround
