// eslint-disable-next-line promise/avoid-new -- we want to use the Promise constructor here
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
