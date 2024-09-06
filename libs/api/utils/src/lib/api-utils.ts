export function reportUsage(apiKey: string, duration: number, type: 'video' | 'document' | 'web') {
  console.log(`API Key ${apiKey} used ${duration} on ${type}.`)
}

export function validateApiKey(apiKey: string) {
  if (!apiKey) return false
}
