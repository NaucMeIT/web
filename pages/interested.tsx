import type { NextPage } from "next"
import React, { useEffect } from "react"
import { Head } from "../components/Head"

const Interested: NextPage = () => {
	useEffect(() => {
		setTimeout(() => {
			window?.location.replace("https://forms.gle/NJ6zygSCNwa4LRbD7")
		}, 3000)
	}, [])

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
				<h1 className='mx-10 mb-10 text-5xl text-center text-white mt-80'>Přesměrovávám na formulář...</h1>
				<span className='mx-10 text-center text-white '>
					Přesměrování neproběhlo? Klikni prosím{" "}
					<a className='underline' href='https://forms.gle/NJ6zygSCNwa4LRbD7'>
						zde
					</a>
					.
				</span>
			</main>
		</>
	)
}

export default Interested
