module.exports = {
    plugins: [
        require("tailwindcss-fluid")({
            textSizes: true,
        }),
    ],
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    variants: {
        extend: {},
    },
    jit: true,
    mode: "jit",
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
                "blue-main": "#040d35",
                "blue-highlight": "#f5f7fe",
                "blue-off": "#cfd9fc",
                "green-off": "#1B4046",
            },
            backgroundImage: {
                "gradient-rad-t-r": "radial-gradient(circle at top right, var(--tw-gradient-stops) 70%);",
                "gradient-rad-t-l": "radial-gradient(circle at top left, var(--tw-gradient-stops) 70%);",
                "gradient-rad-b-r": "radial-gradient(circle at bottom right, var(--tw-gradient-stops) 70%);",
                "gradient-rad-b-l": "radial-gradient(circle at bottom left, var(--tw-gradient-stops) 70%);",
                "gradient-rad-c": "radial-gradient(circle at center, var(--tw-gradient-stops) 70%);",
            },
            width: {
                "vw-25": "25vw",
                "vw-50": "50vw",
                "vw-75": "75vw",
                "vh-25": "25vh",
                "vh-50": "50vh",
                "vh-75": "75vh",
            },
            height: {
                "vw-25": "25vw",
                "vw-50": "50vw",
                "vw-75": "75vw",
                "vh-25": "25vh",
                "vh-50": "50vh",
                "vh-75": "75vh",
            },
            zIndex: {
                "-1": "-1",
            },
            screens: {
                "reduce-motion": { raw: "(prefers-reduced-motion: reduce)" },
            },
        },
    },
}
