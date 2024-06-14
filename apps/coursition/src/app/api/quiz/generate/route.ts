import { generateQuiz } from '@nmit-coursition/ai'
import { zfd } from '@nmit-coursition/utils'
import { z } from 'zod'

const formDataSchema = zfd.formData({
  content: zfd.text(),
  amountQuestions: zfd.numeric().optional(),
  amountAnswers: zfd.numeric().optional(),
  outputLang: zfd.text().optional(),
  allowMultiple: z.boolean().optional(),
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
