import { Config, Redacted } from 'effect'

export const url = (name: string): Config.Config<URL> =>
  Config.string(name).pipe(Config.mapAttempt((url) => new URL(url)))
export const redactedUrl = (name: string): Config.Config<Redacted.Redacted<URL>> =>
  url(name).pipe(Config.map(Redacted.make))
export const redactedString = (name: string): Config.Config<Redacted.Redacted<string>> =>
  Config.string(name).pipe(Config.map(Redacted.make))
