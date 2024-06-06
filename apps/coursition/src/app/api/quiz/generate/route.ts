import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'

const answerSchema = z.object({
  text: z.string(),
  isCorrect: z.boolean(),
})

const taskSchema = z.object({
  question: z.string(),
  answers: z.array(answerSchema),
})

const quizSchema = z.object({
  chapterName: z.string(),
  tasks: z.array(taskSchema),
})

async function generateQuiz(content: string) {
  return generateObject({
    model: google('models/gemini-1.5-flash-latest'),
    schema: quizSchema,
    prompt: `You are expert in making interesting quizzes. You excel in generating multiple question each different from other. You always use CONTEXT for your questions.
---
${content}
`,
  })
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const content = formData.get('content') as string

  try {
    const { object } = await generateQuiz(content)

    return new Response(JSON.stringify(object), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
