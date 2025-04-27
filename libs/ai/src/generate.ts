import { createOpenAI } from '@ai-sdk/openai'
import { secretsEffect } from '@nmit-coursition/env/secrets'
import { trim } from '@nmit-coursition/utils/string'
import { generateObject } from 'ai'
import { Effect } from 'effect'
import { Redacted } from 'effect'
import { z } from 'zod'

const secretsEnv = await Effect.runPromise(secretsEffect)

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

const openai = createOpenAI({
  apiKey: Redacted.value(secretsEnv.OPENAI_API_KEY),
  compatibility: 'strict',
})

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
    model: openai('gpt-4o-mini'),
    schema: schema,
    mode: 'tool',
    system: trim`
      You are an expert in making interesting quizzes.
      You excel in generating multiple questions, each different from the others.
      You always use context for your questions.
      Output is always generated in ${outputLang} language no matter the input language of CONTEXT.
      Make sure you always generate the quiz in ${outputLang} language.
    `,
    prompt: trim`
      Generate a quiz with ${amountQuestions} questions each having ${amountAnswers} answers.
      ${
        allowMultiple
          ? 'Multiple correct answers are allowed. Make sure at least one of the answers is correct.'
          : 'Make sure that only one correct answer is allowed. Make sure only one of the answers is correct.'
      }
      Take a deep breath and reason step by step to generate the quiz based on the following CONTEXT.
      ---
      # CONTEXT:
      ${content}
    `,
  })

  return object
}
