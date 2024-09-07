'use server'
const parseApi = 'https://api.cloud.llamaindex.ai/api/parsing/'

export async function uploadFile(
  file: File,
  config?: {
    precisionMode?: boolean
    contentDescription?: string
    inputLang?: string
    apiKey?: string
  },
) {
  const body = new FormData()
  body.append('file', file)
  config?.precisionMode && body.append('gpt4o_mode', 'true')
  config?.contentDescription && body.append('parsing_instruction', config?.contentDescription)
  config?.inputLang && body.append('input_lang', config?.inputLang)

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
    throw new Error(`Upload failed: ${uploadResponse.statusText}`)
  }

  // TODO: add response validation
  const { id, status } = await uploadResponse.json() as { id: string; status: string }

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
      throw new Error(`Status check failed: ${statusResponse.statusText}`)
    }

    const statusJson = await statusResponse.json()
    // TODO: add response validation
    // @ts-expect-error
    currentStatus = statusJson.status

    if (currentStatus !== 'SUCCESS') {
      await delay(500)
    }
  }

  return currentStatus
}

export async function getResult(id: string) {
  const resultResponse = await fetch(`${parseApi}job/${id}/result/markdown`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env['LLAMA_CLOUD_API_KEY']}`,
    },
  })

  if (!resultResponse.ok) {
    throw new Error(`Fetching result failed: ${resultResponse.statusText} id: ${id}`)
  }

  // TODO: add response validation
  // @ts-expect-error
  const { markdown, job_metadata } = await resultResponse.json()
  return { markdown, credits: job_metadata.job_credits_usage }
}
