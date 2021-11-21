import React from "react"

export const SellPoints: React.FC = () => {
    /*     const textClasses = `
		z-10 pt-5 mx-auto my-0 text-md-fluid "text-green-off"}
	` */
    return (
        <article className={`flex flex-col justify-center items-center bg-green-main px-[10vw] py-10`}>
            <div className='flex flex-col flex-wrap lg:flex-row text-md-fluid text-green-off'>
                <h2 id='about' className={`lg:min-w-[80vw] z-10 self-start ml-0 text-lg-fluid text-green-highlight`}>
                    O kurzu
                </h2>
                <ul>
                    <li>
                        Cena kurzu <b>49 Kč</b>
                    </li>
                    <li>Celý kurz online</li>
                    <li>Tempo samostudia si určuješ sám</li>
                    <li>Když si nevíš rady, máme pro tebe placenou konzultaci</li>
                    <li>Finančně ohodnocená praxe</li>
                </ul>
                <section className='pt-5'>
                    <h2 className={`lg:min-w-[80vw] z-10 self-start ml-0 text-lg-fluid text-green-highlight`}>
                        Jak fungujeme?
                    </h2>
                    <p className='z-10 mx-auto my-0 '>
                        Kurz se skládá z externích materiálů, doplněných naším komentářem. Látku rozvádíme v případě
                        nedostatku kvalitních materiálů. V neposlední řadě se můžeš těšit na naše vlastní cvičení, kde
                        si ověříš své znalosti a budeš tak připraven na praxi!
                    </p>
                </section>
                {/* {icon && (
                    <div className='w-[40vw] h-[40vw] mx-auto lg:w-[25vw] lg:h-[25vw] order-first lg:order-1 lg:pl-10'>
                        <Image src={icon.path} alt={icon.alt} layout='responsive' width={"100"} height={"100"} />
                    </div>
                )} */}
            </div>
        </article>
    )
}
