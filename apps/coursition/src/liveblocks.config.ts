import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'
import { publicConfig } from '@nmit-coursition/env'
import { Effect } from 'effect'

const publicEnv = Effect.runSync(publicConfig)
const client = createClient({
  publicApiKey: publicEnv.LIVEBLOCKS_PUBLIC_API_KEY,
})

export const { RoomProvider, useRoom } = createRoomContext(client)
