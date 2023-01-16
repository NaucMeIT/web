type Package = {
	readonly title: string
	readonly benefits: readonly string[]
	readonly price: number
}

export const packages: readonly Package[] = [
	{
		title: "Basic",
		benefits: ["Základní kurz testera", "Přístup na Discord"],
		price: 0,
	},
	{
		title: "Core",
		benefits: ["Základní kurz testera", "Přístup na Discord", "5 konzultací"],
		price: 1249,
	},
	{
		title: "Standard",
		benefits: ["Základní kurz testera", "Přístup na Discord", "10 konzultací", "Privátní skupina na Discordu"],
		price: 2299,
	},
	{
		title: "Ultimate",
		benefits: [
			"Základní kurz testera",
			"Přístup na Discord",
			"15 konzultací",
			"Privátní skupina na Discordu",
			"Prioritní schůzky",
		],
		price: 3999,
	},
]
