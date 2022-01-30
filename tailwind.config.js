/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */

const blueHue = 229
const greenHue = 188
const contrastGreentHue = 134

const blueSat = 86
const greenSat = 44
const contrastGreenSat = 62

const highlightLightness = 98
const offLightness = 90

module.exports = {
    plugins: [
        require("tailwindcss-fluid")({
            textSizes: true,
        }),
    ],
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    jit: true,
    textSizes: {
        sm: {
            min: "10px",
            max: "14px",
            minvw: "320px",
            maxvw: "1280px",
        },
        md: {
            min: "14px",
            max: "30px",
            minvw: "320px",
            maxvw: "1920px",
        },
        lg: {
            min: "22px",
            max: "60px",
            minvw: "320px",
            maxvw: "1920px",
        },
    },
    theme: {
        extend: {
            colors: {
                "blue-main": `hsl(${blueHue}, ${blueSat}%, 11%)`,
                "blue-highlight": `hsl(${blueHue}, ${blueSat}%, ${highlightLightness}%)`,
                "blue-off": `hsl(${blueHue},${blueSat}%, ${offLightness}%)`,
                "green-main": `hsl(${greenHue}, ${greenSat}%, 19%)`,
                "green-highlight": `hsl(${greenHue}, ${greenSat}%, ${highlightLightness}%)`,
                "green-off": `hsl(${greenHue}, ${greenSat}%, ${offLightness}%)`,
                "green-contrast": `hsl(${contrastGreentHue}, ${contrastGreenSat}%, 51%)`,
                "green-contrast-highlight": `hsl(${contrastGreentHue}, ${contrastGreenSat}%, ${highlightLightness}%)`,
            },
            screens: {
                "reduce-motion": { raw: "(prefers-reduced-motion: reduce)" },
            },
        },
    },
}
