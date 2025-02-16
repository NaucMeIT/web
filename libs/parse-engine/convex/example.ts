import { query } from './_generated/server'

export const get = query({
  args: {},
  handler: async () => {
    return [{ text: 'Hello, World!', isCompleted: false, _id: '1' }]
  },
})
