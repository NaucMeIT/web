import { NextPage } from "next"
import { AboutUs } from "../components/AboutUs"
import { CompanyBox } from "../components/CompanyBox"
import { ContactForm } from "../components/ContactForm"
import { Menu } from "../components/Menu"
import { DownArrow } from "../components/DownArrow"
import { Footer } from "../components/Footer"
import { Landing } from "../components/Landing"
import { How } from "../components/How"
import { Packages } from "../components/Packages"
import { Courses } from "../components/Courses"
import { Head } from "../components/Head"

const Home: NextPage = () => {
    return (
        <div className='bg-landing bg-cover bg-fixed pt-20'>
            <Head
                desc='Mám zájem Naučit se IT a posunout se v kariéře dál!'
                url='https://naucme.it/'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/facebook.png'
            >
                <title>Nauč mě IT - Úvodní strana</title>
            </Head>
            <Menu
                items={[
                    {
                        title: "Jak to funguje?",
                        link: "#how",
                    },
                    {
                        title: "Balíčky",
                        link: "#packages",
                    },
                    {
                        title: "Kurzy",
                        link: "#courses",
                    },
                    {
                        title: "O nás",
                        link: "#about",
                    },
                    {
                        title: "Pro firmy",
                        link: "#company",
                    },
                    {
                        title: "Kontakt",
                        link: "#contact",
                    },
                    {
                        title: "Přihlásit se",
                        link: "#login",
                        isImportant: true,
                    },
                ]}
            />
            <img src='/images/left.svg' className='fixed top-0 hidden h-full 3xl:block' alt='' height='110vh' />
            <img
                src='/images/right.svg'
                className='fixed top-0 right-0 hidden h-full 3xl:block'
                alt=''
                height='110vh'
            />

            <Landing />

            <DownArrow
                className='mx-auto mb-20 cursor-pointer hidden md:block'
                onClick={() => window.scrollBy(0, document.documentElement.clientHeight * 0.8)}
            />

            <How />

            <Packages />

            <Courses />

            <AboutUs
                people={[
                    {
                        name: "Petr Glaser",
                        email: "petr.glaser@naucme.it",
                        position: "Staff Software Engineer",
                        image: "/images/qa_illustration.svg",
                    },
                    {
                        name: "Pavel Koudelka",
                        email: "pavel.koudelka@naucme.it",
                        position: "Sales",
                        image: "/images/qa_illustration.svg",
                    },
                ]}
            />

            <CompanyBox />

            <ContactForm />

            <Footer />
        </div>
    )
}

export default Home
