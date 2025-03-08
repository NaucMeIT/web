import { z } from 'zod'
import { zfd } from 'zod-form-data'

const mediaInputBase = {
  keywords: z.string().optional(),
  language: z.string().optional(),
}

export const mediaFileSchema = zfd.formData({
  type: z.literal('file'),
  file: zfd.file(),
  ...mediaInputBase,
})

export const mediaUrlSchema = zfd.formData({
  type: z.literal('url'),
  url: z.string().url(),
  ...mediaInputBase,
})

export const mediaInputSchema = z.discriminatedUnion('type', [mediaFileSchema._def.schema, mediaUrlSchema._def.schema])

export type MediaInput = z.infer<typeof mediaInputSchema>
