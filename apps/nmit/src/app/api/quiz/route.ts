interface Answer {
  text: string
  isCorrect: boolean
}

interface Task {
  question: string
  answers: Answer[]
}

interface Quiz {
  chapterName: string
  tasks: Task[]
}

const LLAMA_CLOUD_API_KEY = 'llx-YzRf0CmlTDoOu03F7b3HBKCD6eBMsndBMJgJ8eU2eABB1Ka5'
const parseApi = 'https://api.cloud.llamaindex.ai/api/parsing/'

async function parseFile(file: Blob) {
  const body = new FormData()
  body.append('file', file)

  const uploadResponse = await fetch(`${parseApi}upload`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      contentType: 'multipart/form-data',
      Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
    },
    body,
  })

  if (!uploadResponse.ok) {
    throw new Error('Upload failed: ' + uploadResponse.statusText)
  }

  const { id, status } = await uploadResponse.json()

  return { id, status }
}

async function waitUntilJobIsDone(id: string, status: string) {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  let currentStatus = status

  while (currentStatus !== 'SUCCESS') {
    const statusResponse = await fetch(`${parseApi}job/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
      },
    })

    if (!statusResponse.ok) {
      throw new Error('Status check failed: ' + statusResponse.statusText)
    }

    const statusJson = await statusResponse.json()
    currentStatus = statusJson.status

    if (currentStatus !== 'SUCCESS') {
      await delay(500)
    }
  }

  return currentStatus
}

async function getResult(id: string): Promise<string> {
  const resultResponse = await fetch(`${parseApi}job/${id}/result/markdown`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
    },
  })

  if (!resultResponse.ok) {
    throw new Error('Fetching result failed: ' + resultResponse.statusText + ' id: ' + id)
  }

  const { markdown } = await resultResponse.json()

  return markdown
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as Blob

  try {
    const { id, status } = await parseFile(file)
    console.log(id, status)

    const finalStatus = await waitUntilJobIsDone(id, status)
    console.log('Final status:', finalStatus)

    const markdown = await getResult(id)

    return new Response(markdown, {
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
