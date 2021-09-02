module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
    jit: true,
    theme: {
        extend: {
            colors: {
                "main-blue": "#040d35",
                "green-off": "#1B4046",
            },
            backgroundImage: {
                "gradient-rad-t-r": "radial-gradient(circle at top right, var(--tw-gradient-stops) 75%);",
                "gradient-rad-t-l": "radial-gradient(circle at top left, var(--tw-gradient-stops) 75%);",
                "gradient-rad-b-r": "radial-gradient(circle at bottom right, var(--tw-gradient-stops) 75%);",
                "gradient-rad-b-l": "radial-gradient(circle at bottom left, var(--tw-gradient-stops) 75%);",
            },
            width: {
                "vw-25": "25vw",
                "vw-50": "50vw",
                "vw-75": "50vw",
                "vh-25": "25vh",
                "vh-50": "50vh",
                "vh-75": "50vh",
            },
            height: {
                "vw-25": "25vw",
                "vw-50": "50vw",
                "vw-75": "50vw",
                "vh-25": "25vh",
                "vh-50": "50vh",
                "vh-75": "50vh",
            },
        },
    },
}
