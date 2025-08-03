import type { NextPage } from "next"
import { Menu } from "../components/Menu"
import { DownArrow } from "../components/DownArrow"
import { Footer } from "../components/Footer"
import { Landing } from "../components/Landing"
import { How } from "../components/How"
import { Head } from "../components/Head"
import { LearnEarn, PayConsultancy, Time, Worldwide } from "../components/icons"
import { CompanyCatch } from "../components/CompanyCatch"
import { CompanyForm } from "../components/CompanyForm"
import { Employees } from "../components/Employees"
import { SideDecoration } from "../components/SideDecoration"

const employeeFormLink = "https://calendly.com/pavel-koudelka-naucme/zlepsete-svuj-eshop"
const links = [
    { title: "Jsem student", link: "/education" },
    { title: "Jak to funguje?", link: "#how" },
    { title: "Informace", link: "#company" },
    { title: "Specializace", link: "#employees" },
    { title: "Kontakt", link: "#contact" },
    { title: "Domluvit schůzku", link: employeeFormLink, isImportant: true },
]

const Home: NextPage = () => {
    return (
        <div className='bg-landing bg-cover bg-fixed pt-20'>
            <Head
                desc='Chybí vám zaměstnanci? Chcete začít od píky, ale nemáte čas na přípravu juniorů? Jsme tu pro vás. Připravíme juniora na míru!'
                url='https://naucme.it/'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/og.png'
            >
                <title>Nauč mě IT - Firmy</title>
            </Head>
            <Menu items={links} logoLink='/' />
            <SideDecoration />

            <main>
                <Landing
                    title='Junior s praxí?'
                    subtitle='Dodáme vám ho!'
                    text={
                        <>
                            U nás vychováváme budoucí testery, developery i kodéry. Také zajišťujeme praxi, takže ani
                            úplný junior není bez zkušeností!
                        </>
                    }
                    catchPoints={[
                        { icon: <LearnEarn />, children: <>Ušetříte za výuku juniora, školí ho naši profesionálové</> },
                        {
                            icon: <PayConsultancy />,
                            children: <>Platíte pouze za odvedenou práci a zaměstnance</>,
                        },
                        {
                            icon: <Time />,
                            children: <>Sami určíte, kdy zaměstnance potřebujete</>,
                        },
                        { icon: <Worldwide />, children: <>Školíme plně online a není třeba žadných prostor</> },
                    ]}
                    buttonText='Domluvit schůzku'
                    buttonProps={{ href: employeeFormLink }}
                />

                <DownArrow />

                <How
                    steps={[
                        "Určení zadání a požadavků",
                        "Úprava materiálů na míru",
                        "Zařazení a školení studentů",
                        "Placená stáž s dozorem",
                        "Nástup do firmy",
                    ]}
                    buttonText='Domluvit schůzku'
                    buttonProps={{ href: employeeFormLink }}
                />

                <CompanyCatch employeeLink={employeeFormLink} />

                <Employees link={employeeFormLink} />

                <CompanyForm />
            </main>

            <Footer links={links} />
        </div>
    )
}

export default Home
