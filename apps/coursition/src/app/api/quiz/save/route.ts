import { getTranscript } from '@nmit-coursition/ai'

export async function POST(request: Request) {
  const formData = await request.formData()
  const fileUrl = formData.get('url') as File

  try {
    const status = await getTranscript(fileUrl)
    console.log(status)

    return new Response(JSON.stringify(status), {
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
