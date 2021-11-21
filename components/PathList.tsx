import React from "react"
import { Path } from "./Path"

export const PathList: React.FC = () => (
    <section className='overflow-hidden'>
        <Path
            mainColour='green'
            title='Tester'
            text={[
                "Určitě bys nechtěl dostat hodinky, které rozbalíš a nebudou mít funkční minutovou ručičku. To samé platí i u software. Práce testera je hledání chyb a upozorňování na ně srozumitelnou formou. Proto abys mohl být tester, nepotřebuješ mnoho. Stačí kritické myšlení a základní znalosti testovaného programu. V případě webových aplikací, na které se kurz zaměřuje, je vhodné znát i nástroje, které usnadňují nejen testerům práci.",
                "Kurz je složený z 10 kapitol, první část je zaměřená na rozvoj přemýšlení. Dále pokračujeme k praktickým znalostem z prostředí webového vývoje (základy HTML, CSS a Javascriptu). Jakmile rozumíš základům přesuneme se k nástrojům, které práci testera značně zjednodušují a urychlují. Vše je zakončeno praktickými úlohami, kde máš možnost ověřit nabyté znalosti.",
            ]}
            textQuote='Pokud někoho upozorníš na chybu, říká se tomu kritika, pokud to ale uděláš oficiální cestou, říká se tomu testing.'
            icon={{
                path: "/qa_bug.svg",
                alt: "Lupa s broukem představující práci testera hledajícího chyby v programu.",
            }}
        />
        <Path
            mainColour='blue'
            title='Programátor'
            text={["Cesta je v přípravě."]}
            icon={{
                path: "/programmer.svg",
                alt: "Symbol programování či programovacích jazyků",
            }}
        />
    </section>
)
