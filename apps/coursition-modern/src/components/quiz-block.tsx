import { createReactBlockSpec } from '@blocknote/react'
import { IconSetting } from '@douyinfe/semi-icons'
import { Button, Form, Modal } from '@douyinfe/semi-ui'
import { QuizComponent } from './quiz-component'

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
      isCorrect1: {
        default: true,
      },
      isCorrect2: {
        default: false,
      },
      isCorrect3: {
        default: false,
      },
      isCorrect4: {
        default: false,
      },
    },
    content: 'none',
  },
  {
    render: (props) => {
      const [modal, contextHolder] = Modal.useModal()
      let manageModal: { destroy: () => void }
      const openModal = () => {
        manageModal = modal.info(config)
      }
      const config = {
        title: 'Edit Quiz',
        footer: null,
        content: (
          <Form
            className='p-2'
            initValues={{
              question: props.block.props.question,
              answer1: props.block.props.answer1,
              answer2: props.block.props.answer2,
              answer3: props.block.props.answer3,
              answer4: props.block.props.answer4,
              isCorrect1: props.block.props.isCorrect1,
              isCorrect2: props.block.props.isCorrect2,
              isCorrect3: props.block.props.isCorrect3,
              isCorrect4: props.block.props.isCorrect4,
            }}
            onSubmit={(values) => {
              props.editor.updateBlock(props.block, {
                type: 'quiz',
                props: values,
              })
              manageModal.destroy()
            }}
          >
            <Form.Input
              field='question'
              label='Question'
              rules={[{ required: true, message: 'Question is required' }]}
            />

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className='flex gap-2 mb-2'>
                <Form.Input field={`answer${num}`} label={`Answer ${num}`} className='flex-1' />
                <Form.Checkbox field={`isCorrect${num}`} noLabel>
                  Correct
                </Form.Checkbox>
              </div>
            ))}

            <Button htmlType='submit' type='primary'>
              Save Changes
            </Button>
          </Form>
        ),
      }
      return (
        <div className='flex items-start p-4 rounded-lg'>
          <div>
            <QuizComponent
              question={props.block.props.question}
              answers={[
                { text: props.block.props.answer1, isCorrect: props.block.props.isCorrect1 },
                { text: props.block.props.answer2, isCorrect: props.block.props.isCorrect2 },
                { text: props.block.props.answer3, isCorrect: props.block.props.isCorrect3 },
                { text: props.block.props.answer4, isCorrect: props.block.props.isCorrect4 },
              ]}
            />
          </div>
          <Button icon={<IconSetting />} theme='borderless' onClick={openModal} aria-label='Open Quiz configuration' />
          {contextHolder}
        </div>
      )
    },
  },
)
