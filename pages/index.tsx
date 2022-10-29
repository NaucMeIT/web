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
import img from "../images/petr_border.png"
import { LearnEarn, PayConsultancy, Time, Worldwide } from "../components/icons"
import { SideDecoration } from "../components/SideDecoration"

const links = [
    { title: "Jak to funguje?", link: "#how" },
    { title: "Balíčky", link: "#packages" },
    { title: "Kurzy", link: "#courses" },
    { title: "O nás", link: "#about" },
    { title: "Pro firmy", link: "/companies" },
    { title: "Kontakt", link: "#contact" },
    { title: "Přihlásit se", link: "/sign", isImportant: true },
]

const Home: NextPage = () => {
    return (
        <div className='bg-landing bg-cover bg-fixed pt-20'>
            <Head
                desc='Chceš získat práci v IT a nevíš, jak začít? Právě proto jsme tu my! Na naší platformě poskytujeme kurzy, díky kterým získáš práci v IT dřív než řekneš Java.'
                url='https://naucme.it/'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/og.png'
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "Course",
                    name: "Úvod do testování a webových technologií",
                    description:
                        "Kurzy pro kohokoliv, kdo se chce dostat do světa IT, zejména testování a webového vývoje.",
                    provider: {
                        "@type": "Organization",
                        name: "Nauč mě IT",
                        sameAs: "https://naucme.it",
                    },
                }}
            >
                <title>Nauč mě IT - Úvodní strana</title>
            </Head>
            <Menu items={links} logoLink='/' />
            <SideDecoration />

            <main>
                <Landing
                    title='Nauč se programovat'
                    subtitle='a nech si za to platit!'
                    text={
                        <>
                            Klademe si za cíl pomoci komukoliv získat dovednosti a{"\u00A0"}znalosti vhodné pro práci v
                            IT. To vše bez časových limitací a za cenu dostupnou pro každého.
                        </>
                    }
                    catchPoints={[
                        { icon: <LearnEarn />, children: <>Učíš se a zároveň vyděláváš</> },
                        {
                            icon: <PayConsultancy />,
                            children: <>Platíš pouze za konzultace s{"\u00A0"}odborníkem z oboru</>,
                        },
                        {
                            icon: <Time />,
                            children: (
                                <>
                                    Rychlost kurzu si{"\u00A0"}určuješ{"\u00A0"}sám
                                </>
                            ),
                        },
                        { icon: <Worldwide />, children: <>Celý kurz je online přístupný odkudkoliv</> },
                    ]}
                    buttonText='Vyzkoušej ZDARMA'
                    buttonProps={{
                        href: "/sign?startPlan=Basic",
                    }}
                />

                <DownArrow
                    className='mx-auto mb-20 cursor-pointer hidden md:block'
                    onClick={() => window.scrollBy(0, document.documentElement.clientHeight * 0.8)}
                />

                <How
                    steps={[
                        "Zaregistruj se ZDARMA",
                        "Vyber si jeden z kurzů",
                        "Načerpej z něj znalosti",
                        "Ověř si je v praxi",
                        "Získej svůj první job v IT",
                    ]}
                    buttonText='Chci se přidat!'
                    buttonProps={{
                        href: "/sign?startPlan=Basic",
                    }}
                />

                <Packages />

                <Courses />

                <AboutUs
                    people={[
                        {
                            name: "Petr Glaser",
                            email: "petr.glaser@naucme.it",
                            position: "Staff Software Engineer",
                            image: img,
                        },
                        {
                            name: "Pavel Koudelka",
                            email: "pavel.koudelka@naucme.it",
                            position: "Sales",
                        },
                        {
                            name: "Lýdie Hemalová",
                            email: "lydie.hemalova@naucme.it",
                            position: "QA Engineer",
                        },
                    ]}
                />

                <CompanyBox />

                <ContactForm />
            </main>

            <Footer links={links} />
        </div>
    )
}

export default Home
