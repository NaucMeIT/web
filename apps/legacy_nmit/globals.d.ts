export {}

declare global {
    interface Window {
        readonly turnstile: {
            readonly reset: () => undefined
        }
        readonly fbq: (command: string, type: string) => undefined
    }
}
