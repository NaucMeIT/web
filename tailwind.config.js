/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */

function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`
		}
		return `rgb(var(${variable}) / ${opacityValue})`
	}
}

// eslint-disable-next-line functional/immutable-data
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		data: {
			open: 'state~="open"',
			close: 'state~="closed"',
		},
		colors: {
			primary: withOpacityValue("--color-primary"),
			secondary: withOpacityValue("--color-secondary"),
			off: withOpacityValue("--color-off"),
			background: withOpacityValue("--color-background"),
			highlight: withOpacityValue("--color-highlight"),
			print: withOpacityValue("--color-print"),
			form: withOpacityValue("--color-form"),
			error: withOpacityValue("--color-error"),
		},
		fontFamily: {
			poppins: ["Poppins", "sans-serif"],
			montserrat: ["Montserrat", "sans-serif"],
		},
		fontSize: {
			xsDeviceBody: "0.75rem",
			xs: "0.875rem",
			sm: "1rem",
			base: "1.125rem",
			lg: "1.25rem",
			xl: "1.875rem",
			"2xl": "2.813rem",
			"3xl": "3.5rem",
			"4xl": "4.375rem",
		},
		letterSpacing: {
			normal: "0",
			wider: "0.019rem",
			huge: "0.281rem",
		},
		extend: {
			appearance: {
				button: "button",
			},
			backgroundColor: {
				transparent: "transparent",
			},
			backgroundPosition: {
				rightCut: "120%",
			},
			backgroundSize: {
				"100/100": "100% 100%",
				"100/0": "100% 0%",
			},
			backgroundImage: {
				landing: "image-set(url('/images/bg-landing.webp') 1x, url('/images/bg-landing.avif') 2x)",
				animable: "linear-gradient(rgb(var(--color-primary)) 0 0)",
				alt: "linear-gradient(90deg, rgb(17, 25, 58) 0%, rgb(54, 69, 122) 100%), linear-gradient(270deg, rgba(109,157,255,0.4) 0%, rgba(141,130,255,0.4) 54%, rgba(47,58,145,0.4) 87.9%, rgba(21,45,86,0.4) 100%)",
				rightSide: "url('/images/right.svg')",
			},
			minHeight: {
				28: "7rem",
			},
			maxWidth: {
				xxs: "14rem",
				xsProse: "41ch",
				sProse: "45ch",
				"screen-3xl": "1800px",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(0deg)" },
					"25%": { transform: "rotate(-1deg)" },
					"75%": { transform: "rotate(1deg)" },
				},
				pulseDown: {
					"0%, 10%, 100%": { transform: "translateY(0)" },
					"5%": { transform: "translateY(11px)" },
				},
				slideDown: {
					"0%": {
						height: 0,
					},
					"100%": {
						height: "var(--radix-accordion-content-height)",
					},
				},
				slideUp: {
					"0%": {
						height: "var(--radix-accordion-content-height)",
					},
					"100%": {
						height: 0,
					},
				},
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out 1",
				pulseDown: "pulseDown 30s ease-in-out infinite",
				open: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
				close: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
			},
			transitionProperty: {
				backgroundSize: "background-size",
			},
			listStyleType: {
				dash: '"- "',
			},
			screens: {
				xs: "360px",
				"3xl": "1800px",
			},
		},
	},
	plugins: [],
}
