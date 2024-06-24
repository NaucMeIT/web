import { fromPromise, setup } from 'xstate'
import { getResult, parseFile, waitUntilJobIsDone } from './parse'
import { generateQuiz } from './generate'

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
  /** @xstate-layout N4IgpgJg5mDOIC5QQPYGMCuBbMA7ALgIoYCWAXgLICGaAFibmAHQkQA2YAxAKoAKAMgHkAggBEA+qMEBhbhQCiAOQAqAbQAMAXUSgADilgl8JFLh0gAHogCMANmtMAzM+cBOdQBYAHK9cAaEABPRFcPJg9HAHYAVmt1dUcAJi9rSOtXAF8MgNRMHAJicmo6BmYMXTYUKggGKE5eYQAlAGV5cWblJuV5UQ1tJBB9Q2NTcysEaNsvJnVIxNckjw9Iry9EgOCEUPCo2PiklLTM7JBc7DwiUkoaekYmAHcqI1rOAClBACFxaUEKAXlur0tOYhs9RgNxq5omFrB5ol5bPN1LZoolbP4gjZUjN4vFIo5otFZvjHFkcuhzgUrsVbswAGZgfAlXBQcQAJzgGDY+E4UlkChU4gaLR6fRBBjBZghNiiDjmrkS1gRCsSyK8GxCYQiMTiCWSqXSZNOFPylyKN1KTBgjDZVGMLM4hG4AEkAFriADiSnkjWEgLFA1BIyloHGSusiSYhMVRPU8KWEY1Wy1u11BwNxxOuBQEDg5jOpsK12ZYHFwxMIcsiAAtLYk7Wcbim83IkaCxcizTLawOGXJWNEB51piENZsbG8QSiZF8R42yaO9SLXdypVqrU+8GBwhHF51Ex7HCVej4YSk9s7LZbHN7JETwT53lF+aSw8nvaoJuK9uYmEUolUQAxxrCiVZzxhK9rzRVJ70fSkzWLWkmAZJlblZDlYC5fAv3BUMsQ8WwmFcKZIncDwFkVawkxSJhLyvBYiQia9bDgwsl1fa0wFtD8cMrMN4WmTxUkVBECR8DxqIcOj0QJTxHCmRJWOfRDLTQFAsAqRlS0DCUt2lBBVXUaZ5II1FVl8KF1RHMdCIA3ESQiSZZiyLIgA */
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
          target: 'uploading',
          actions: ({ context, event }) => {
            context.document = event.document
          },
        },
      },
    },
    uploading: {
      invoke: {
        src: 'parseFile',
        input: ({ context }) => ({ document: context.document }),
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
        input: ({ context }) => ({ id: context.jobId, status: context.jobStatus }),
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
        input: ({ context }) => ({ id: context.jobId }),
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

export const createDocumentQuizMachine = () =>
  documentQuizMachine.provide({
    actions: {},
  })

export type DocumentQuizMachine = ReturnType<typeof createDocumentQuizMachine>
