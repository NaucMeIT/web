import { FacebookBtn, LinkedInBtn } from "./Button"
import { Typography } from "./Typography"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"

type Person = {
	readonly name: string
	readonly position: string
	readonly email: string
	readonly image?: string | StaticImageData
}

type Props = {
	readonly people: readonly Person[]
}

export function AboutUs({ people }: Props) {
	return (
		<section className={"mt-20 flex flex-col items-center justify-center gap-x-36 gap-y-4 px-5 xl:flex-row"}>
			<div className='flex w-fit max-w-xl flex-col'>
				<span id='about'>&nbsp;</span>
				<Typography variant='h2' component='h2' className='mb-8'>
					O nás
				</Typography>
				<Typography className='mb-6 max-w-xsProse' component='div'>
					<p className='mb-4'>
						Nápad založit Nauč mě IT nám vnukli naši přátelé. Chtěli začít v IT, ale ztratili se v množství informací,
						které jim Google vyhodil. Kde začít? Jaký programovací jazyk si vybrat? Kdo mi dá aktuální informace? Proč
						mi někdo doporučil Javu?! Toto vše jsme slyšeli.
					</p>
					<figure>
						<blockquote className='italic'>
							Bylo mi jasné, že tuto vizi nedokážu naplnit sám. Požádal jsem tedy o pomoc Lýdii Hemalovou a Pavla
							Koudelku. Díky nim jsme do projektu konečně kopli a spatřil tak světlo světa. S jasnou vizí a posláním
							pomoct komukoliv dostat se do IT.
						</blockquote>
						<figcaption>- Petr Glaser</figcaption>
					</figure>
				</Typography>
				<div className='flex flex-row justify-center gap-x-10 xl:justify-start'>
					<FacebookBtn href='https://www.facebook.com/NaucMeIT' label='Facebook stránka - Nauč mě IT' />
					<LinkedInBtn href='https://www.linkedin.com/company/nauc-me-it/' label='LinkedIn stránka - Nauč mě IT' />
				</div>
			</div>
			<div className='flex flex-col gap-4 md:grid lg:gap-20 md:grid-rows-3 md:grid-cols-2'>
				{people.map((p) => (
					<div
						className={`flex flex-col gap-y-2 ${p.image ? "mx-auto md:col-span-2 md:row-span-2" : ""}`}
						key={p.email}
					>
						{p.image && (
							<Image src={p.image} alt={`Profilová fotka - ${p.name}`} sizes='100vw' loading='lazy' className='px-16' />
						)}
						<Typography variant='h3' component='h3' className='text-center'>
							{p.name}
						</Typography>
						<Typography className='text-center'>{p.position}</Typography>
						<Typography
							variant='link'
							component={Link}
							componentProps={{ href: `mailto:${p.email}?subject=Dotaz na Nauč mě IT` }}
							className='text-center'
						>
							{p.email}
						</Typography>
					</div>
				))}
			</div>
		</section>
	)
}
