import { getTranscript } from '@nmit-coursition/ai'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  try {
    const transcript = await getTranscript(file)
    console.log(transcript)

    return new Response(JSON.stringify(transcript), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
