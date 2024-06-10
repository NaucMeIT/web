import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { trim } from '@nmit-coursition/utils'

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

export async function generateQuiz(
  content: string,
  {
    outputLang = 'English',
    amountQuestions = 5,
    amountAnswers = 4,
    allowMultiple = false,
  }: { outputLang?: string; amountQuestions?: number; amountAnswers?: number; allowMultiple?: boolean },
) {
  const schema = getQuizSchema(amountQuestions, amountAnswers)
  const { object } = await generateObject({
    model: google('models/gemini-1.5-flash-latest'),
    schema: schema,
    system: trim`
      You are an expert in making interesting quizzes.
      You excel in generating multiple questions, each different from the others.
      You always use context for your questions.
      Output is always generated in ${outputLang} language.
    `,
    prompt: trim`
      Generate a quiz with ${amountQuestions} questions each having ${amountAnswers} answers.
      ${allowMultiple ? 'Multiple correct answers are allowed.' : 'Only one correct answer is allowed.'}
      ---
      # CONTEXT:
      ${content}
    `,
  })

  return object
}
