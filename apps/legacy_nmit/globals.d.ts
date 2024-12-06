export {}

declare global {
    interface Window {
        readonly turnstile: {
            readonly reset: () => undefined
        }
        readonly fbq: {
          readonly pageview: () => undefined
        }
    }
}
