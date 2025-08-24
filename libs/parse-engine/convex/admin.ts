import type { WorkflowId } from '@convex-dev/workflow'
import { workflow } from '@nmit-coursition/parse-engine/media.ts'
import { v } from 'convex/values'
import { internal } from './_generated/api'
import { action, internalAction, mutation, query } from './_generated/server'

export const startMediaWorkflow = action({
  args: {
    identityId: v.string(),
    mediaId: v.string(),
    fileId: v.id('_storage'),
    keywords: v.optional(v.array(v.string())),
    language: v.optional(v.string()),
    output: v.array(v.union(v.literal('vtt'), v.literal('srt'), v.literal('text'))),
  },
  handler: async (ctx, args): Promise<string> => {
    const workflowId = await workflow.start(ctx, internal.media.mediaWorkflow, args)
    await ctx.scheduler.runAfter(5000, internal.admin.cleanupWorkflowAfterComplete, { workflowId })
    return workflowId
  },
})

export const startPublicMediaWorkflow = action({
  args: {
    identityId: v.string(),
    mediaId: v.string(),
    publicMediaUrl: v.string(),
    fileId: v.id('_storage'),
    keywords: v.optional(v.array(v.string())),
    language: v.optional(v.string()),
    output: v.array(v.union(v.literal('vtt'), v.literal('srt'), v.literal('text'))),
  },
  handler: async (ctx, args): Promise<string> => {
    const workflowId = await workflow.start(ctx, internal.media.publicMediaWorkflow, args)
    await ctx.scheduler.runAfter(5000, internal.admin.cleanupWorkflowAfterComplete, { workflowId })
    return workflowId
  },
})

export const getWorkflowStatus = query({
  args: {
    workflowId: v.string(),
  },
  handler: async (ctx, args) => {
    return workflow.status(ctx, args.workflowId as WorkflowId)
  },
})

export const cancelWorkflow = mutation({
  args: {
    workflowId: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    return workflow.cancel(ctx, args.workflowId as WorkflowId)
  },
})

export const cleanupWorkflowAfterComplete = internalAction({
  args: {
    workflowId: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const workflowId = args.workflowId as WorkflowId
    try {
      while (true) {
        const status = await workflow.status(ctx, workflowId)
        if (status.type === 'inProgress') {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          continue
        }
        console.log('Workflow completed with status:', status)
        break
      }
    } finally {
      await workflow.cleanup(ctx, workflowId)
    }
  },
})
