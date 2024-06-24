import { fromPromise, setup } from 'xstate'
import { getResult, parseFile, waitUntilJobIsDone } from './parse'
import { generateQuiz } from './generate'

const parseFileActor = async (document: File) => {
  const { id, status } = await parseFile(document)
  await waitUntilJobIsDone(id, status)
  const content = await getResult(id)
  return { type: 'DOCUMENT_PARSED', content }
}

const generateQuizActor = async (parsedContent: string) => {
  const quiz = await generateQuiz(parsedContent, {})
  return { type: 'QUIZ_GENERATED', quiz }
}

const documentQuizMachine = setup({
  types: {
    context: {} as {
      document: File | null
      parsedContent: string | null
      quiz: string | null
    },
    events: {} as
      | { type: 'UPLOAD_DOCUMENT'; document: File }
      | { type: 'DOCUMENT_PARSED'; content: string }
      | { type: 'QUIZ_GENERATED'; quiz: string },
  },
  actions: {
    logParsedContent: ({ context }) => {
      console.log(`Parsed content: ${context.parsedContent}`)
    },
    logGeneratedQuiz: ({ context }) => {
      console.log(`Generated quiz: ${context.quiz}`)
    },
  },
  actors: {
    parseDocument: fromPromise(({ input }: { input: { document: File } }) => parseFileActor(input.document)),
    generateQuiz: fromPromise(({ input }: { input: { parsedContent: string } }) =>
      generateQuizActor(input.parsedContent),
    ),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QQPYGMCuBbMA7ALgIoYCWAXgLICGaAFibmAHQkQA2YAxAKoAKAMgHkAggBEA+qMEBhbhQCiAOQAqAbQAMAXUSgADilgl8JFLh0gAHogCMANmtMAzM+cAmAJx3r69QA5HADQgAJ6I7gAsTOGOAOzh7uox7h7hAKyO1gC+mUGomDgExOTUdAzMulQAToa4UJxSsgoq4rzCAEoAyvKiGtpIIPqGxqbmVgi26u5M-m5+Cb624dZBoQgRUbHxickR6Vk5IHnYeESklDT0jEwwjJVUxrWchNwAkgBa4gDiSvJtwsrdXrmQZGExmfpjbypdRMWypWyuRx+cIxRypVwrMKRaJxBJJFJ7bIHXAoCBwcxHAqnYoXMrAgygkYQxAAWlsmIQbOyuXQx0KZxKl2YrA49KGYNGiHCGJCNmsMSY0J86ms8PCCOs7m5h15VKK51KVwq1QYUDFjPBoDGjl8MPsaRiMWsrgmtl8qQ5vgcdlsvtsjsmcS92spJ31grK1zwYDuDzN-RBw0tlkQvhdTGsaS9qWsvncSJiHtlCC9Gb9voD7jiSRDurDAtpVzQKCwug4+DA5qTkoQzvVUTdMVcqUL-uiHOsdiYw+VdhVviDRMyQA */
  id: 'documentQuizMachine',
  initial: 'idle',
  context: {
    document: null,
    parsedContent: null,
    quiz: null,
  },
  states: {
    idle: {
      on: {
        UPLOAD_DOCUMENT: {
          target: 'parsing',
          actions: ({ context, event }) => {
            context.document = event.document
          },
        },
      },
    },
    parsing: {
      invoke: {
        src: 'parseDocument',
        input: ({ context }) => ({ document: context.document }),
      },
      on: {
        DOCUMENT_PARSED: {
          target: 'generating',
          actions: ({ context, event }) => {
            context.parsedContent = event.content
          },
        },
      },
      exit: 'logParsedContent',
    },
    generating: {
      invoke: {
        src: 'generateQuiz',
        input: ({ context }) => ({ parsedContent: context.parsedContent }),
      },
      on: {
        QUIZ_GENERATED: {
          target: 'complete',
          actions: ({ context, event }) => {
            context.quiz = event.quiz
          },
        },
      },
      exit: 'logGeneratedQuiz',
    },
    complete: {
      type: 'final',
    },
  },
})

// Create and export the machine with provided services
export const createDocumentQuizMachine = () =>
  documentQuizMachine.provide({
    actions: {},
  })

export type DocumentQuizMachine = ReturnType<typeof createDocumentQuizMachine>
