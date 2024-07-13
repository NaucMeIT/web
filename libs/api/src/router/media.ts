import type { TRPCRouterRecord } from '@trpc/server'
import { z } from 'zod'

import { getTranscript } from '@nmit-coursition/ai'
import { publicProcedure } from '../trpc'

const ACCEPTED_FILE_TYPES = 'video/*,audio/*'
const MAX_UPLOAD_SIZE = 1024 * 1024 * 1024 * 2 // 2GB

export const mediaRouter = {
  transcribe: publicProcedure
    .use(async (opts) => {
      const input = await opts.getRawInput()
      console.log('input', input)
      return opts.next({
        input,
      })
    })
    .input(
      z.object({
        file: z
          .instanceof(File)
          .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE
          }, 'File size must be less than 2GB')
          .refine((file) => {
            return ACCEPTED_FILE_TYPES.includes(file.type)
          }, 'File must be a video or audio'),
        apiKey: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      }),
    )
    .mutation(({ input }) => {
      return getTranscript(input.file, input.keywords, input.apiKey)
    }),
  extractAudio: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File).refine((file) => {
          return ACCEPTED_FILE_TYPES.includes(file.type)
        }, 'File must be a video or audio'),
      }),
    )
    .mutation(({ input }) => {
      return undefined
    }),
} satisfies TRPCRouterRecord
