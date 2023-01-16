import { prisma } from "./prisma"

async function main() {
	await prisma.plan.createMany({
		data: [
			{
				name: "Basic",
				credits: 0,
				price: 0,
				benefits: ["Základní kurz testera", "Přístup na Discord"],
			},
			{
				name: "Core",
				credits: 5,
				price: 1249,
				benefits: ["Základní kurz testera", "Přístup na Discord", "5 konzultací"],
			},
			{
				name: "Standard",
				credits: 10,
				price: 2299,
				benefits: ["Základní kurz testera", "Přístup na Discord", "10 konzultací", "Privátní skupina na Discordu"],
			},
			{
				name: "Ultimate",
				credits: 15,
				price: 3999,
				benefits: [
					"Základní kurz testera",
					"Přístup na Discord",
					"15 konzultací",
					"Privátní skupina na Discordu",
					"Prioritní schůzky",
				],
			},
		],
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
