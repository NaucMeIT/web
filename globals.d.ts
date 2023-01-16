export {}

declare global {
	interface Window {
		readonly turnstile: {
			readonly reset: () => undefined
		}
	}
}
