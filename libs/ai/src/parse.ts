'use server'
const parseApi = 'https://api.cloud.llamaindex.ai/api/parsing/'

export async function parseFile(file: Blob) {
  const body = new FormData()
  body.append('file', file)

  const uploadResponse = await fetch(`${parseApi}upload`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      contentType: 'multipart/form-data',
      Authorization: `Bearer ${process.env['LLAMA_CLOUD_API_KEY']}`,
    },
    body,
  })

  if (!uploadResponse.ok) {
    throw new Error('Upload failed: ' + uploadResponse.statusText)
  }

  const { id, status } = await uploadResponse.json()

  return { id, status }
}

export async function waitUntilJobIsDone(id: string, status: string) {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  let currentStatus = status

  while (currentStatus !== 'SUCCESS') {
    const statusResponse = await fetch(`${parseApi}job/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env['LLAMA_CLOUD_API_KEY']}`,
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

export async function getResult(id: string): Promise<string> {
  const resultResponse = await fetch(`${parseApi}job/${id}/result/markdown`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env['LLAMA_CLOUD_API_KEY']}`,
    },
  })

  if (!resultResponse.ok) {
    throw new Error('Fetching result failed: ' + resultResponse.statusText + ' id: ' + id)
  }

  const { markdown } = await resultResponse.json()

  return markdown
}
