import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlock } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from '@blocknote/react'
import { createFileRoute } from '@tanstack/react-router'
import { MdQuiz } from 'react-icons/md'
import { Quiz } from '../components/quiz-block'
import '@blocknote/mantine/style.css'
import '@blocknote/core/fonts/inter.css'

export const Route = createFileRoute('/editor')({
  component: Editor,
  ssr: false,
})

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    quiz: Quiz,
  },
})

const insertQuiz = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Quiz',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'quiz',
    })
  },
  aliases: ['quiz', 'question', 'test', 'multiple choice', 'single choice'],
  group: 'Others',
  icon: <MdQuiz className='text-blue-500' />,
})

function Editor() {
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: 'paragraph',
        content: 'Welcome to this demo!',
      },
      {
        type: 'quiz',
        props: {
          question: 'What is the capital of France?',
          answer1: 'Paris',
          answer2: 'London',
          answer3: 'Berlin',
          answer4: 'Madrid',
          correctAnswer: '1',
        },
      },
      {
        type: 'paragraph',
        content: "Press the '/' key to open the Slash Menu and add another",
      },
      {
        type: 'paragraph',
      },
    ],
  })

  return (
    <BlockNoteView editor={editor} slashMenu={false} theme='light'>
      <SuggestionMenuController
        triggerCharacter={'/'}
        getItems={async (query) =>
          // Gets all default slash menu items and `insertAlert` item.
          filterSuggestionItems([...getDefaultReactSlashMenuItems(editor), insertQuiz(editor)], query)
        }
      />
    </BlockNoteView>
  )
}
