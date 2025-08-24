import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const mediaType = {
  identityId: v.optional(v.string()),
  fileId: v.optional(v.string()),
  publicMediaUrl: v.optional(v.string()),
  keywords: v.optional(v.array(v.string())),
  language: v.optional(v.string()),
  vtt: v.optional(v.string()),
  srt: v.optional(v.string()),
  text: v.optional(v.string()),
  duration: v.optional(v.number()),
  status: v.union(v.literal('upload'), v.literal('parse'), v.literal('done')),
}

export default defineSchema(
  {
    media: defineTable(mediaType),
    workflowMetadata: defineTable({
      workflowId: v.string(),
      mediaId: v.optional(v.string()),
    }),
  },
  {
    schemaValidation: true,
  },
)
