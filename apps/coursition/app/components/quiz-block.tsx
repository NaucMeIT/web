import { createReactBlockSpec } from '@blocknote/react'
import { Menu } from '@mantine/core'
import { MdSettings } from 'react-icons/md'
import { QuizComponent } from './quiz-component'

const quizType = {
  title: 'Multiple Choice',
  value: 'multipleChoice',
  icon: MdSettings,
  color: 'text-blue-500',
  backgroundColor: 'bg-blue-100',
}

export const Quiz = createReactBlockSpec(
  {
    type: 'quiz',
    propSchema: {
      question: {
        default: '',
      },
      answer1: {
        default: '',
      },
      answer2: {
        default: '',
      },
      answer3: {
        default: '',
      },
      answer4: {
        default: '',
      },
      correctAnswer: {
        default: '1',
      },
    },
    content: 'none',
  },
  {
    render: (props) => {
      const Icon = quizType.icon
      return (
        <div className={`flex items-start p-4 rounded-lg ${quizType.backgroundColor}`}>
          <Menu withinPortal={false}>
            <Menu.Target>
              <div
                className='flex items-center justify-center w-8 h-8 rounded-full bg-white cursor-pointer mr-4'
                contentEditable={false}
              >
                <Icon className={`${quizType.color}`} size={20} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label className='px-2 py-1 text-sm font-semibold'>Quiz Configuration</Menu.Label>
              <Menu.Divider />
              <div className='px-2 py-1'>
                <label className='block text-sm font-medium'>Question</label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                  value={props.block.props.question}
                  onChange={(e) =>
                    props.editor.updateBlock(props.block, {
                      type: 'quiz',
                      props: { question: e.target.value },
                    })
                  }
                />
              </div>
              <div className='px-2 py-1'>
                <label className='block text-sm font-medium'>Answer 1</label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                  value={props.block.props.answer1}
                  onChange={(e) =>
                    props.editor.updateBlock(props.block, {
                      type: 'quiz',
                      props: { answer1: e.target.value },
                    })
                  }
                />
              </div>
              <div className='px-2 py-1'>
                <label className='block text-sm font-medium'>Answer 2</label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                  value={props.block.props.answer2}
                  onChange={(e) =>
                    props.editor.updateBlock(props.block, {
                      type: 'quiz',
                      props: { answer2: e.target.value },
                    })
                  }
                />
              </div>
              <div className='px-2 py-1'>
                <label className='block text-sm font-medium'>Answer 3</label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                  value={props.block.props.answer3}
                  onChange={(e) =>
                    props.editor.updateBlock(props.block, {
                      type: 'quiz',
                      props: { answer3: e.target.value },
                    })
                  }
                />
              </div>
              <div className='px-2 py-1'>
                <label className='block text-sm font-medium'>Answer 4</label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                  value={props.block.props.answer4}
                  onChange={(e) =>
                    props.editor.updateBlock(props.block, {
                      type: 'quiz',
                      props: { answer4: e.target.value },
                    })
                  }
                />
              </div>
              <div className='px-2 py-1'>
                <label className='block text-sm font-medium'>Correct Answer(s)</label>
                <input
                  type='text'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                  value={props.block.props.correctAnswer}
                  onChange={(e) =>
                    props.editor.updateBlock(props.block, {
                      type: 'quiz',
                      props: { correctAnswer: e.target.value },
                    })
                  }
                />
              </div>
            </Menu.Dropdown>
          </Menu>
          <div>
            <QuizComponent
              question={props.block.props.question}
              answers={[
                { text: props.block.props.answer1, isCorrect: props.block.props.correctAnswer.includes('1') },
                { text: props.block.props.answer2, isCorrect: props.block.props.correctAnswer.includes('2') },
                { text: props.block.props.answer3, isCorrect: props.block.props.correctAnswer.includes('3') },
                { text: props.block.props.answer4, isCorrect: props.block.props.correctAnswer.includes('4') },
              ]}
            />
          </div>
        </div>
      )
    },
  },
)
