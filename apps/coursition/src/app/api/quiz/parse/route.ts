import { getResult, uploadFile, waitUntilJobIsDone } from '@nmit-coursition/ai'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  try {
    const { id, status } = await uploadFile(file)
    console.log(id, status)

    const finalStatus = await waitUntilJobIsDone(id, status)
    console.log('Final status:', finalStatus)

    const markdown = await getResult(id)

    return new Response(JSON.stringify(markdown), {
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
