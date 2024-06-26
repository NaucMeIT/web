'use client'

import { getTranscript } from '@nmit-coursition/ai'
import { Effect } from 'effect'
import React, { useState } from 'react'

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])

  const startRecording = Effect.tryPromise({
    try: async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = (event) => {
        setAudioChunks((chunks) => [...chunks, event.data])
      }

      mediaRecorder.start(5000) // Collect data every 5 seconds
      setRecorder(mediaRecorder)
      setIsRecording(true)
    },
    catch: (error) => new Error(`Error starting recording: ${error}`),
  })

  const stopRecording = Effect.sync(() => {
    if (recorder) {
      recorder.stop()
      for (const track of recorder.stream.getTracks()) {
        track.stop()
      }
      setRecorder(null)
      setIsRecording(false)
    }
  })

  const sendAudioChunk = (audioBlob: File): Effect.Effect<string, Error, never> =>
    Effect.tryPromise({
      try: async () => {
        const formData = new FormData()
        formData.append('audio', audioBlob, 'audio.webm')

        const { result } = await getTranscript(audioBlob)

        setTranscription((prev) => `${prev} ${result.response.text()}`)
        return result.response.text()
      },
      catch: (error) => new Error(`Error sending audio chunk: ${error}`),
    })

  const handleStartRecording = () => {
    Effect.runPromise(startRecording)
  }

  const handleStopRecording = () => {
    Effect.runPromise(stopRecording)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRecording) {
      interval = setInterval(() => {
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
          // Convert blob to file
          const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' })
          Effect.runPromise(sendAudioChunk(file))
          setAudioChunks([])
        }
      }, 5000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording, audioChunks])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Audio Recorder</h1>
      <div className='space-x-4 mb-4'>
        <button
          type='button'
          onClick={handleStartRecording}
          disabled={isRecording}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
        >
          Record
        </button>
        <button
          type='button'
          onClick={handleStopRecording}
          disabled={!isRecording}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
        >
          Stop Recording
        </button>
      </div>
      <div className='mt-4'>
        <h2 className='text-xl font-semibold mb-2'>Transcription:</h2>
        <p className='bg-gray-100 p-4 rounded'>{transcription}</p>
      </div>
    </div>
  )
}

export default AudioRecorder
