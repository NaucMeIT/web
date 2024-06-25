import { fromPromise, setup } from 'xstate'
import { generateQuiz } from './generate'
import { getResult, parseFile, waitUntilJobIsDone } from './parse'

const documentQuizMachine = setup({
  types: {
    context: {} as {
      document: File | null
      jobId: string | null
      jobStatus: string | null
      parsedContent: string | null
      quiz: string | null
    },
    events: {} as
      | { type: 'UPLOAD_DOCUMENT'; document: File }
      | { type: 'PARSE_STARTED'; id: string; status: string }
      | { type: 'JOB_COMPLETED' }
      | { type: 'DOCUMENT_PARSED'; content: string }
      | { type: 'GENERATE_QUIZ' }
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
    parseFile: fromPromise(({ input }: { input: { document: File } }) => parseFile(input.document)),
    waitForJob: fromPromise(({ input }: { input: { id: string; status: string } }) =>
      waitUntilJobIsDone(input.id, input.status),
    ),
    getParseResult: fromPromise(({ input }: { input: { id: string } }) => getResult(input.id)),
    generateQuiz: fromPromise(({ input }: { input: { parsedContent: string } }) =>
      generateQuiz(input.parsedContent, {}),
    ),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QQPYGMCuBbMA7ALgIoYCWAXgLICGaAFibmAHQkQA2YAxAKoAKAMgHkAggBEA+qMEBhbhQCiAOQAqAbQAMAXUSgADilgl8JFLh0gAHogCMAFgDsTAJwunANgBMTgBwf7Htyd7ABoQAE9EDwBmAFZnazc3b291JyiPbzd7bwBfHNDUTBwCYnJqOgZmXSoAJ0NcKE5URiZYfCp8ZkLsPCJSShp6Fuq6higNbSQQfUNjU3MrBGso9WsmdIyfbydbD3UYqNCIhG81hMT7a29dt2sYmKc8gvQekv7yoara+qgmDF02CgqBAxpxeMIAEoAZXk4ihykhynkogm5hmRhMZimixi9icTGuUXs6lsuwOHg81iOkVsUXiiWSqXSmXsMSeIG6xT6ZUGlSYIx+TAA7lQMQ1OAApQQAIXE0kEFAE8iRKK0aIMGPm2MQOzihPsKyc6gC3iitmpCACbmcMVNtnctNsBzcUXZnN6pQGFWG3zGTAAZmB8N6oOIanAMGx8JwpLIFCpxODocjUVN0XMsaBFstvHE8XdvMTbNYSVcLR5afSkik0hksrl8hyXlzPR8+TBGDUOqDmsw2h0us2Pe9eS0O2Au8YGqm9BqMwtIqcmG4mdcrvYnZ4QuFELa1jF1IertZ3BvPG6h28ed7mOPJ37dOGRqCAOJKeQQ4RI8SEbgASQALRnaY50xBdLT8dZcyJLcAnuO4LXsLImHUU0okyJwYlpLDbAvIph2vT4mDvbsGmIvAJ1Ixpf0A8Q30UD8vxTNU01ArUs0QNwYmtCknDuW0V2ufZENJFDi38LDS0Lew8kbXAUAgOBzHdK8vU+dVZjA7UEAAWjcC09Lw15uTUvlWA4DTNUzSxEF2csHiYJ07QdM0DhkxsVJMtsfVGBpLPnbTYnUJgkPUKIjSJElyRiC07mtVlD1QuwmQeNwjJbEcb35X0yP+QFgTGfytI4hBwu8EKV3CsKi2i8tROsCsXEuKIuISNkPMvLzRy+XzfhFMUoCK9ibIQVk6ViYt1AZA9Lm3Y4K1sJgGoPcTbEPFcMnSgjTJ8wVA2DIZQ3DWBI3wIbrOzBrrQcPiT1sF1YhindLXqjwD2sDcS1zJyttU7zbwo+8-NYzThpxJwLS4xxUKiCb7QPRJ2uefC-u68jOyo-kn1qQqQas8CSzmxAkMcW1YYwrC4d+rqspIqdfjp3HZ1Bi7bLCph7j2XFdicAIghExa3sPM1SU+g1qdbNG0BQLAASDMBzvAwklu4ikvGSbjEMSdZYZaoXDVtWSciAA */
  id: 'documentQuizMachine',
  initial: 'idle',
  context: {
    document: null,
    jobId: null,
    jobStatus: null,
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
      initial: 'uploading',
      states: {
        uploading: {
          invoke: {
            src: 'parseFile',
            // biome-ignore lint/style/noNonNullAssertion: Stately enforces correct context types
            input: ({ context }) => ({ document: context.document! }),
          },
          on: {
            PARSE_STARTED: {
              target: 'waiting',
              actions: ({ context, event }) => {
                context.jobId = event.id
                context.jobStatus = event.status
              },
            },
          },
        },
        waiting: {
          invoke: {
            src: 'waitForJob',
            // biome-ignore lint/style/noNonNullAssertion: Stately enforces correct context types
            input: ({ context }) => ({ id: context.jobId!, status: context.jobStatus! }),
          },
          on: {
            JOB_COMPLETED: {
              target: 'fetching_result',
            },
          },
        },
        fetching_result: {
          invoke: {
            src: 'getParseResult',
            // biome-ignore lint/style/noNonNullAssertion: Stately enforces correct context types
            input: ({ context }) => ({ id: context.jobId! }),
          },
          on: {
            DOCUMENT_PARSED: {
              target: '#documentQuizMachine.generating',
              actions: ({ context, event }) => {
                context.parsedContent = event.content
              },
            },
          },
        },
      },
      onDone: {
        actions: 'logParsedContent',
      },
    },
    generating: {
      initial: 'preparing',
      states: {
        preparing: {
          on: {
            GENERATE_QUIZ: 'generating',
          },
        },
        generating: {
          invoke: {
            src: 'generateQuiz',
            // biome-ignore lint/style/noNonNullAssertion: Stately enforces correct context types
            input: ({ context }) => ({ parsedContent: context.parsedContent! }),
          },
          on: {
            QUIZ_GENERATED: {
              target: '#documentQuizMachine.complete',
              actions: ({ context, event }) => {
                context.quiz = event.quiz
              },
            },
          },
        },
      },
      onDone: {
        actions: 'logGeneratedQuiz',
      },
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
