type Package = {
    readonly title: string
    readonly benefits: readonly string[]
    readonly price: number
}

export const packages: readonly Package[] = [
    {
        title: "Basic",
        benefits: ["Všechny kurzy", "Přístup na Discord"],
        price: 0,
    },
    {
        title: "Core",
        benefits: ["Všechny kurzy", "Přístup na Discord", "5 konzultací"],
        price: 1749,
    },
    {
        title: "Standard",
        benefits: ["Všechny kurzy", "Přístup na Discord", "10 konzultací", "Privátní skupina na Discordu"],
        price: 3199,
    },
    {
        title: "Ultimate",
        benefits: [
            "Všechny kurzy",
            "Přístup na Discord",
            "15 konzultací",
            "Privátní skupina na Discordu",
            "Prioritní schůzky",
        ],
        price: 5499,
    },
]
