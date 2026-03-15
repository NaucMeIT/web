import { PostHog } from "posthog-node"

const POSTHOG_HOST = "https://eu.i.posthog.com"

export function createPostHogClient() {
    const apiKey = process.env["NEXT_PUBLIC_POSTHOG_KEY"]

    if (!apiKey) {
        return null
    }

    return new PostHog(apiKey, { host: POSTHOG_HOST })
}
