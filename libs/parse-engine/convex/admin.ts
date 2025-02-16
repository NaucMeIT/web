import type { WorkflowId } from '@convex-dev/workflow'
import { v } from 'convex/values'
import { internal } from './_generated/api'
import { mutation, query } from './_generated/server'
import { workflow } from './example'

export const kickoffWorkflow = mutation({
  args: {
    storageId: v.id('_storage'),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const workflowId: string = await workflow.start(ctx, internal.example.exampleWorkflow, {
      storageId: args.storageId,
    } as never)
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
