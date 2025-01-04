import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'

const client = createClient({
  publicApiKey: import.meta.env['VITE_LIVEBLOCKS_PUBLIC_API_KEY'],
})

export const { RoomProvider, useRoom } = createRoomContext(client)
