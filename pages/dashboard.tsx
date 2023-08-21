import Image from "next/image"
import { Root } from "@radix-ui/react-separator"
import { HeadingsType } from "../utils/mdx"
import { Head } from "../components/Head"
import { InAppMenu } from "../components/InAppMenu"
import { SideMenu } from "../components/SideMenu"
import { TreeToC } from "../components/TreeToC"
import { MissingBanner } from "../components/MissingBanner"
import { ContentCard } from "../components/ContentCard"
import { Typography } from "../components/Typography"
import { ActionSidebar } from "../components/ActionSidebar"
import { useTrackedUser } from "../hooks/useTrackedUser"

const Dashboard: React.FC = () => {
    const [user] = useTrackedUser()
    const headings: HeadingsType = [
        {
            text: "Tester",
            href: "/chapter/qa-00",
            level: 1,
            children: [],
        },
        /*         {
            text: "Frontend",
            href: "/chapter/fe-01",
            level: 1,
            children: [],
        }, */
    ]

    const isLoggedOut = !user || !user.name || !user.email

    return (
        <>
            <Head
                desc='Dostaň se do IT ještě dnes a sleduj svou cestu junior testera či programátora právě zde!'
                url='https://naucme.it/dashboard'
            >
                <title>Nauč mě IT - Dashboard</title>
            </Head>
            <InAppMenu />
            <div className='grid grid-cols-12 auto-rows-auto h-screen'>
                <div className='row-start-1 row-end-2 xl:row-end-7 xl:row-span-full col-span-full xl:col-span-2 mt-20 bg-secondary/5 overflow-auto'>
                    <SideMenu>
                        <TreeToC headings={headings} />
                    </SideMenu>
                </div>
                <main className='row-end-7 xl:col-start-3 col-span-full row-start-3 xl:row-start-1 row-span-full overflow-auto xl:mt-20 pb-2 overscroll-none'>
                    <MissingBanner />
                    <section className='flex flex-col lg:flex-row justify-center items-center lg:items-start mt-5 gap-10'>
                        <ContentCard title='Kurz QA' priority phrase='Začít' href='/chapter/qa-00'>
                            <Image
                                src='/images/qa_illustration.svg'
                                width={320}
                                height={291}
                                alt='Ilustrace ke kurzu QA'
                                loading='lazy'
                            />
                        </ContentCard>
                        {/* <ContentCard title='Kurz frontend' phrase='Začít' href='/chapter/fe-01'>
                            <Image
                                src='/images/dev_illustration.svg'
                                width={214}
                                height={185}
                                alt='Ilustrace ke kurzu frontend'
                                loading='lazy'
                            />
                        </ContentCard> */}
                        <ContentCard title='Discord' phrase='Připojit se' href='https://naucme.it/discord'>
                            <Image
                                src='/images/discord.svg'
                                width={205}
                                height={291}
                                alt='Ilustrace ke kurzu QA'
                                loading='lazy'
                            />
                        </ContentCard>
                        {!isLoggedOut && (
                            <ContentCard title='Další'>
                                <div className='w-full h-full'>
                                    <ActionSidebar />
                                </div>
                            </ContentCard>
                        )}
                    </section>
                    <Root className='my-8 h-px w-11/12 mx-auto bg-secondary' />
                    <section className='flex flex-col items-center mt-5 gap-8'>
                        <Typography variant='h3'>Externí zdroje</Typography>
                        <div className='flex flex-col flex-wrap lg:flex-row justify-center items-center lg:items-start gap-10'>
                            <ContentCard
                                priority
                                small
                                title='Bezpečný kód'
                                phrase='Piš bezpečně'
                                href='https://bezpecnykod.cz'
                            >
                                <Image
                                    src='/images/bezpecny_kod.svg'
                                    width={200}
                                    height={200}
                                    alt='Logo Bezpečný kód'
                                    loading='lazy'
                                />
                            </ContentCard>
                            <ContentCard small title='Vzhůru dolů' phrase='Učit se' href='https://vzhurudolu.cz'>
                                <Image
                                    src='/images/vzhuru.svg'
                                    width={100}
                                    height={100}
                                    alt='Logo Vzhůru dolů'
                                    loading='lazy'
                                />
                            </ContentCard>
                            <ContentCard small title='Junior Guru' phrase='Navštívit' href='https://junior.guru/'>
                                <Image
                                    src='/images/junior-guru.svg'
                                    width={200}
                                    height={100}
                                    alt='Logo Junior Guru'
                                    loading='lazy'
                                />
                            </ContentCard>
                            <ContentCard
                                small
                                title='Videa DevTools'
                                phrase='Koukat'
                                href='https://www.youtube.com/@ChromeDevs'
                            >
                                <Image
                                    src='/images/devtools.svg'
                                    width={100}
                                    height={100}
                                    alt='Play btn'
                                    loading='lazy'
                                />
                            </ContentCard>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Dashboard
