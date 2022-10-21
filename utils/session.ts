export const PROTECTED_PAGES = ["/protected", "/register"]

export function shouldRedirect(page: string) {
    return PROTECTED_PAGES.includes(page)
}

export type AllowedOauth = "facebook" | "google"
export type AllowedProviders = AllowedOauth | "email"
export type SignStatus = "idle" | "signing" | "error" | "send" | "oauth"
