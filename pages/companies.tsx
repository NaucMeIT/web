import { GetServerSideProps, NextPage } from "next"
import { Menu } from "../components/Menu"
import { DownArrow } from "../components/DownArrow"
import { Footer } from "../components/Footer"
import { Landing } from "../components/Landing"
import { How } from "../components/How"
import { Head } from "../components/Head"
import { LearnEarn, PayConsultancy, Time, Worldwide } from "../components/icons"
import { CompanyCatch } from "../components/CompanyCatch"
import { handleEmail } from "../utils/email"

type FormData = {
    readonly name: string
    readonly email: string
    readonly phone: string
    readonly company: string
    readonly request: string
    readonly message: string
}

export const getServerSideProps: GetServerSideProps = handleEmail

const Home: NextPage = () => {
    return (
        <div className='bg-landing bg-cover bg-fixed pt-20'>
            <Head
                desc='Chybí vám zaměstnanci? Chcete začít od píky, ale nemáte čas na přípravu juniorů? Jsme tu pro vás. Připravíme juniora na míru!'
                url='https://naucme.it/companies'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/og.png'
            >
                <title>Nauč mě IT - Firmy</title>
            </Head>
            <Menu
                items={[
                    {
                        title: "Jak to funguje?",
                        link: "#how",
                    },
                    {
                        title: "Informace",
                        link: "#company",
                    },
                    {
                        title: "Specializace",
                        link: "#deliver",
                    },
                    {
                        title: "Kontakt",
                        link: "#contact",
                    },
                ]}
            />
            <img
                aria-hidden
                src='/images/left.svg'
                className='fixed top-0 hidden h-full 3xl:block'
                alt=''
                height='110vh'
            />
            <img
                aria-hidden
                src='/images/right.svg'
                className='fixed top-0 right-0 hidden h-full 3xl:block'
                alt=''
                height='110vh'
            />

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
                    buttonText='Chci zaměstnance!'
                />

                <DownArrow
                    className='mx-auto mb-20 cursor-pointer hidden md:block'
                    onClick={() => window.scrollBy(0, document.documentElement.clientHeight * 0.8)}
                />

                <How
                    steps={[
                        "Určení zadání a požadavků",
                        "Úprava materiálů na míru",
                        "Zařazení a školení studentů",
                        "Placená stáž s dozorem",
                        "Nástup do firmy",
                    ]}
                    buttonText='Chci zaměstnance!'
                />

                <CompanyCatch />
            </main>

            <Footer />
        </div>
    )
}

export default Home
