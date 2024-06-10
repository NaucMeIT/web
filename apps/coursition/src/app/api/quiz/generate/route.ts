import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { zfd } from '@nmit-coursition/utils'

const getQuizSchema = (amountQuestions: number, amountAnswers: number) => {
  const answerSchema = z.object({
    text: z.string(),
    isCorrect: z.boolean(),
  })

  const taskSchema = z.object({
    question: z.string(),
    answers: z.array(answerSchema).length(amountAnswers),
  })

  const quizSchema = z.object({
    chapterName: z.string(),
    tasks: z.array(taskSchema).length(amountQuestions),
  })
  return quizSchema
}

async function generateQuiz(
  content: string,
  {
    outputLang = 'English',
    amountQuestions = 5,
    amountAnswers = 4,
    allowMultiple = false,
  }: { outputLang: string; amountQuestions: number; amountAnswers: number; allowMultiple: boolean },
) {
  const schema = getQuizSchema(amountQuestions, amountAnswers)
  const { object } = await generateObject({
    model: google('models/gemini-1.5-flash-latest'),
    schema: schema,
    prompt: `You are expert in making interesting quizzes. You excel in generating multiple question each different from other. You always use CONTEXT for your questions. Output is always generated in ${outputLang} language. Generate a quiz with ${amountQuestions} questions each having ${amountAnswers} answers. ${allowMultiple ? 'Multiple correct answers are allowed.' : ''} The quiz should be based on the following CONTEXT.
---
# CONTEXT:
${content}
`,
  })

  return object
}

const formDataSchema = zfd.formData({
  content: zfd.text(),
  amountQuestions: zfd.numeric().optional().default(5),
  amountAnswers: zfd.numeric().optional().default(4),
  outputLang: zfd.text().optional().default('English'),
  allowMultiple: zfd.checkbox().optional().default(''),
})

export async function POST(request: Request) {
  try {
    const { content, amountQuestions, amountAnswers, outputLang, allowMultiple } = formDataSchema.parse(
      await request.formData(),
    )
    const quiz = await generateQuiz(content, {
      amountQuestions,
      amountAnswers,
      outputLang,
      allowMultiple,
    })

    return new Response(JSON.stringify(quiz), {
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
