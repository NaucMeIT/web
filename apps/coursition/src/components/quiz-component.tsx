import { Button, Form, Toast } from '@douyinfe/semi-ui'

type Answer = {
  text: string
  isCorrect: boolean
}

interface Props {
  question: string
  answers: Answer[]
}

export function QuizComponent({ question, answers }: Props) {
  const isMultipleCorrect = answers.filter((answer) => answer.isCorrect).length > 1

  const handleSubmit = (values: { answers: string | string[] }) => {
    const selectedAnswers = Array.isArray(values.answers) ? values.answers : [values.answers]
    const correctAnswers = answers.filter((answer) => answer.isCorrect).map((answer) => answer.text)

    if (isMultipleCorrect) {
      const correctAnswersCount = correctAnswers.length
      const selectedAnswersCount = selectedAnswers.length

      if (
        correctAnswersCount === selectedAnswersCount &&
        correctAnswers.every((answer) => selectedAnswers.includes(answer))
      ) {
        Toast.success('Correct!')
      } else {
        Toast.error('Incorrect. Please try again.')
      }
    } else {
      if (selectedAnswers[0] === correctAnswers[0]) {
        Toast.success('Correct!')
      } else {
        Toast.error('Incorrect. Please try again.')
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>{question}</Form.Label>

      {isMultipleCorrect ? (
        <Form.CheckboxGroup
          field='answers'
          noLabel
          className='flex flex-col'
          rules={[{ required: true, message: 'Please select at least one answer' }]}
        >
          {answers.map((answer) => (
            <Form.Checkbox key={answer.text} value={answer.text}>
              {answer.text}
            </Form.Checkbox>
          ))}
        </Form.CheckboxGroup>
      ) : (
        <Form.RadioGroup
          field='answers'
          noLabel
          className='flex flex-col'
          rules={[{ required: true, message: 'Please select an answer' }]}
        >
          {answers.map((answer) => (
            <Form.Radio key={answer.text} value={answer.text}>
              {answer.text}
            </Form.Radio>
          ))}
        </Form.RadioGroup>
      )}

      <Button htmlType='submit' type='primary'>
        Submit
      </Button>
    </Form>
  )
}
