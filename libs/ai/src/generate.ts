'use server'
import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { trim } from '@nmit-coursition/utils'
import { langfuse } from './langfuse'

const model = 'models/gemini-1.5-flash-latest'
const modelParameters = {
  temperature: 0.5,
  maxTokens: 8192,
  maxRetries: 3,
}

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

const defaultTrace = langfuse.trace({
  name: 'quiz',
})

export async function generateQuiz(
  content: string,
  {
    outputLang = 'English',
    amountQuestions = 5,
    amountAnswers = 4,
    allowMultiple = false,
  }: { outputLang?: string; amountQuestions?: number; amountAnswers?: number; allowMultiple?: boolean },
  trace = defaultTrace,
) {
  const schema = getQuizSchema(amountQuestions, amountAnswers)
  const system = trim`
    You are an expert in making interesting quizzes.
    You excel in generating multiple questions, each different from the others.
    You always use context for your questions.
    Output is always generated in ${outputLang} language no matter the input language of CONTEXT.
    Make sure you always generate the quiz in ${outputLang} language.
  `
  const prompt = trim`
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
  `
  trace.update({
    input: prompt,
  })
  const span = trace.span({
    name: 'generate',
    input: {
      content,
      outputLang,
      amountQuestions,
      amountAnswers,
      allowMultiple,
    },
  })
  const generation = span.generation({
    name: 'generate',
    model,
    modelParameters,
    input: [
      { type: 'system', text: system },
      { type: 'user', text: prompt },
    ],
  })
  generation.update({
    completionStartTime: new Date(),
  })
  span.update({
    metadata: {
      function: 'generateObject',
      model,
    },
  })
  const { object, usage } = await generateObject({
    model: google(model),
    schema: schema,
    system,
    prompt,
    ...modelParameters,
  })
  trace.update({
    output: object,
  })
  generation.end({
    output: object,
    usage,
  })
  span.end({
    output: object,
  })
  langfuse.shutdownAsync()

  return object
}
