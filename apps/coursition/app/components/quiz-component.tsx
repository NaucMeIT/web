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

  async function submitAction(formData: FormData) {
    const selectedAnswers = Array.from(formData.getAll('answer'))

    const correctAnswers = answers.filter((answer) => answer.isCorrect).map((answer) => answer.text)

    if (isMultipleCorrect) {
      const correctAnswersCount = correctAnswers.length
      const selectedAnswersCount = selectedAnswers.length

      if (
        correctAnswersCount === selectedAnswersCount &&
        correctAnswers.every((answer) => selectedAnswers.includes(answer))
      ) {
        alert('Correct!')
      } else {
        alert('Incorrect!')
      }
    } else {
      if (correctAnswers.includes(selectedAnswers[0] as string)) {
        alert('Correct!')
      } else {
        alert('Incorrect!')
      }
    }
  }

  return (
    <div className='relative flex justify-between gap-4 min-w-56'>
      <div className='flex flex-col gap-1'>
        <h3>{question}</h3>

        {isMultipleCorrect && (
          <div className='absolute top-16'>
            <p>Select all that apply.</p>
          </div>
        )}

        <form action={submitAction} className='flex flex-col space-y-3'>
          {isMultipleCorrect ? (
            <div className='grid grid-cols-1 gap-2'>
              {answers.map(({ text }) => (
                <div className='flex items-center gap-2' key={text.replaceAll(' ', '')}>
                  <input type='checkbox' name='answer' value={text} id={text.replaceAll(' ', '')} />
                  <label htmlFor={text.replaceAll(' ', '')}>{text}</label>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {answers.map(({ text }) => (
                <div className='flex items-center gap-2' key={text.replaceAll(' ', '')}>
                  <input type='radio' name='answer' value={text} id={text.replaceAll(' ', '')} required />
                  <label htmlFor={text.replaceAll(' ', '')}>{text}</label>
                </div>
              ))}
            </div>
          )}
          <button type='submit' className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
