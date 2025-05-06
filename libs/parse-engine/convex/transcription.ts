import { internalAction } from '@nmit-coursition/parse-engine/_generated/server'
import { v } from 'convex/values'
// import { OpenAI } from 'openai'

// if (!process.env['OPENAI_API_KEY']) {
//   throw new Error('OPENAI_API_KEY is not configured.\n' + 'npx convex env set OPENAI_API_KEY sk-****')
// }
// const openai = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] })

export const computeTranscription = internalAction({
  args: {
    storageId: v.id('_storage'),
  },
  returns: v.string(),
  handler: async (ctx, { storageId }) => {
    const blob = await ctx.storage.get(storageId)
    if (!blob) {
      throw new Error(`Invalid storage ID: ${storageId}`)
    }
    const file = new File([blob], `${storageId}`, {
      type: blob.type,
    })
    console.log('file', file.name, file.type)
    // const transcription = await openai.audio.transcriptions.create({
    //   file,
    //   model: 'whisper-1',
    // })
    // return transcription.text
    return 'mock translation'
  },
})

export const computeEmbedding = internalAction({
  args: {
    transcription: v.string(),
  },
  returns: v.array(v.number()),
  handler: async (_, args) => {
    console.log('transcription', args.transcription)
    // const embeddingResponse = await openai.embeddings.create({
    //   input: [args.transcription],
    //   model: 'text-embedding-3-small',
    // })
    // const embedding = embeddingResponse.data[0]?.embedding || []
    // return embedding
    return [1, 2, 3]
  },
})
