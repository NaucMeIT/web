import { WorkflowManager } from '@convex-dev/workflow'
import { components, internal } from '@nmit-coursition/parse-engine/_generated/api'
import { internalMutation, mutation, query } from '@nmit-coursition/parse-engine/_generated/server'
import { mediaType } from '@nmit-coursition/parse-engine/schema.ts'
import { v } from 'convex/values'

export const workflow = new WorkflowManager(components.workflow)

const tableName = 'media'
const updateMediaArgs = {
  ...mediaType,
  _id: v.string(),
}

export const mediaWorkflow = workflow.define({
  args: {
    identityId: v.string(),
    fileId: v.id('_storage'),
    keywords: v.optional(v.array(v.string())),
    language: v.optional(v.string()),
    mediaId: v.string(),
    output: v.array(v.union(v.literal('vtt'), v.literal('srt'), v.literal('text'))),
  },
  handler: async (step, args) => {
    const { output: _, mediaId, ...restArgs } = args
    const transcription = await step.runAction(internal.transcription.computeTranscription, {
      storageId: args.fileId,
    })
    console.log(transcription)
    const embedding = await step.runAction(internal.transcription.computeEmbedding, {
      transcription,
    })
    console.log(embedding.slice(0, 20))
    await step.runMutation(internal.media.updateMediaInternal, {
      ...restArgs,
      text: transcription,
      _id: mediaId,
      status: 'done',
    })
  },
})

export const publicMediaWorkflow = workflow.define({
  args: {
    identityId: v.string(),
    publicMediaUrl: v.string(),
    keywords: v.optional(v.array(v.string())),
    language: v.optional(v.string()),
    mediaId: v.string(),
    fileId: v.id('_storage'),
    output: v.array(v.union(v.literal('vtt'), v.literal('srt'), v.literal('text'))),
  },
  handler: async (step, args) => {
    console.log('publicMediaWorkflow args: ', args)
    const { mediaId, output: _, ...restArgs } = args

    const transcription = await step.runAction(internal.transcription.computeTranscription, {
      storageId: args.fileId,
    })
    console.log(transcription)
    const embedding = await step.runAction(internal.transcription.computeEmbedding, {
      transcription,
    })
    console.log(embedding.slice(0, 20))

    await step.runMutation(internal.media.updateMediaInternal, {
      ...restArgs,
      text: transcription,
      _id: mediaId,
      status: 'done',
    })
  },
})

export const newMedia = mutation({
  args: mediaType,
  handler: async (ctx, args) => {
    const mediaId = await ctx.db.insert(tableName, args)
    return mediaId.toString()
  },
})

export const updateMediaInternal = internalMutation({
  args: updateMediaArgs,
  handler: async (ctx, { _id, ...args }) => {
    const id = ctx.db.normalizeId('media', _id)
    if (!id) {
      throw new Error('required ID is incorrect')
    }
    await ctx.db.patch(id, {
      ...args,
    })
    return _id
  },
})

export const getMedia = query({
  args: {
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db.query(tableName).order('desc').take(args.count)
    return {
      items,
    }
  },
})
export const getMediaById = query({
  args: {
    mediaId: v.string(),
  },
  handler: async (ctx, args) => {
    const id = ctx.db.normalizeId('media', args.mediaId)
    if (!id) {
      throw new Error('required ID is incorrect: ' + id)
    }
    const item = await ctx.db.get(id)
    return {
      media: {
        ...item,
        videoSource: undefined,
      },
    }
  },
})

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl()
})

export const getFileUrl = query({
  args: { storageId: v.optional(v.string()) },
  handler: async (ctx, { storageId }) => {
    if (!storageId) {
      return ''
    }
    return await ctx.storage.getUrl(storageId)
  },
})
