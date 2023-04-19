import { prisma } from "./prisma"

async function main() {
    await prisma.plan.createMany({
        data: [
            {
                name: "Basic",
                credits: 0,
                price: 0,
                benefits: ["Všechny kurzy", "Přístup na Discord"],
            },
            {
                name: "Core",
                credits: 5,
                price: 1749,
                benefits: ["Všechny kurzy", "Přístup na Discord", "5 konzultací"],
            },
            {
                name: "Standard",
                credits: 10,
                price: 3199,
                benefits: [
                    "Všechny kurzy",
                    "Přístup na Discord",
                    "10 konzultací",
                    "Privátní skupina na Discordu",
                ],
            },
            {
                name: "Ultimate",
                credits: 15,
                price: 5499,
                benefits: [
                    "Všechny kurzy",
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
