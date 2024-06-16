import {
  FileMetadata,
  FileMetadataResponse,
  ListFilesResponse,
  ListParams,
  UploadFileResponse,
  GoogleGenerativeAIError,
  GoogleGenerativeAIRequestInputError,
  GoogleGenerativeAIFetchError,
} from './google-types'
import { RequestOptions } from '@google/generative-ai'

const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com'
const DEFAULT_API_VERSION = 'v1beta'
const PACKAGE_VERSION = '__PACKAGE_VERSION__'
const PACKAGE_LOG_HEADER = 'genai-js'

function getClientHeaders(requestOptions: RequestOptions): string {
  const clientHeaders = []
  if (requestOptions?.apiClient) {
    clientHeaders.push(requestOptions.apiClient)
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`)
  return clientHeaders.join(' ')
}

enum FilesTask {
  UPLOAD = 'upload',
  LIST = 'list',
  GET = 'get',
  DELETE = 'delete',
}

const taskToMethod = {
  [FilesTask.UPLOAD]: 'POST',
  [FilesTask.LIST]: 'GET',
  [FilesTask.GET]: 'GET',
  [FilesTask.DELETE]: 'DELETE',
}

class FilesRequestUrl {
  private _url: URL

  constructor(
    public task: FilesTask,
    public apiKey: string,
    public requestOptions?: RequestOptions,
  ) {
    const apiVersion = this.requestOptions?.apiVersion || DEFAULT_API_VERSION
    const baseUrl = this.requestOptions?.baseUrl || DEFAULT_BASE_URL
    let initialUrl = baseUrl
    if (this.task === FilesTask.UPLOAD) {
      initialUrl += `/upload`
    }
    initialUrl += `/${apiVersion}/files`
    this._url = new URL(initialUrl)
  }

  appendPath(path: string): void {
    this._url.pathname = this._url.pathname + `/${path}`
  }

  appendParam(key: string, value: string): void {
    this._url.searchParams.append(key, value)
  }

  toString(): string {
    return this._url.toString()
  }
}

function getHeaders(url: FilesRequestUrl): Headers {
  const headers = new Headers()
  headers.append('x-goog-api-client', getClientHeaders(url.requestOptions as any))
  headers.append('x-goog-api-key', url.apiKey)
  return headers
}

async function makeFilesRequest(
  url: FilesRequestUrl,
  headers: Headers,
  body?: Blob,
  fetchFn: typeof fetch = fetch,
): Promise<Response> {
  const requestInit: RequestInit = {
    method: taskToMethod[url.task],
    headers,
  }

  if (body) {
    requestInit.body = body
  }

  const signal = getSignal(url.requestOptions)
  if (signal) {
    requestInit.signal = signal
  }

  try {
    console.log(url.toString())
    console.log(requestInit)
    const response = await fetchFn(url.toString(), requestInit)
    if (!response.ok) {
      let message = ''
      let errorDetails
      try {
        const json = await response.json()
        message = json.error.message
        if (json.error.details) {
          message += ` ${JSON.stringify(json.error.details)}`
          errorDetails = json.error.details
        }
      } catch (e) {
        // ignored
      }
      throw new GoogleGenerativeAIFetchError(
        `Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`,
        response.status,
        response.statusText,
        errorDetails,
      )
    } else {
      return response
    }
  } catch (e) {
    let err: any = e
    if (!(e instanceof GoogleGenerativeAIFetchError)) {
      err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${(e as any).message}`)
      err.stack = (e as any).stack
    }
    throw err
  }
}

/**
 * Get AbortSignal if timeout is specified
 */
function getSignal(requestOptions?: RequestOptions): AbortSignal | null | undefined {
  if (requestOptions?.timeout && requestOptions?.timeout >= 0) {
    const abortController = new AbortController()
    const signal = abortController.signal
    setTimeout(() => abortController.abort(), requestOptions.timeout)
    return signal
  }
}

/**
 * Class for managing GoogleAI file uploads.
 * @public
 */
export class GoogleAIFileManager {
  constructor(
    public apiKey: string,
    private _requestOptions?: RequestOptions,
  ) {}

  /**
   * Upload a file
   */
  async uploadFile(file: File, fileMetadata: FileMetadata): Promise<UploadFileResponse> {
    const url = new FilesRequestUrl(FilesTask.UPLOAD, this.apiKey, this._requestOptions)

    const uploadHeaders = getHeaders(url)
    const boundary = generateBoundary()
    uploadHeaders.append('X-Goog-Upload-Protocol', 'multipart')
    uploadHeaders.append('Content-Type', `multipart/related; boundary=${boundary}`)

    const uploadMetadata = getUploadMetadata(fileMetadata)

    // Multipart formatting code taken from @firebase/storage
    const metadataString = JSON.stringify({ file: uploadMetadata })
    const preBlobPart =
      '--' +
      boundary +
      '\r\n' +
      'Content-Type: application/json; charset=utf-8\r\n\r\n' +
      metadataString +
      '\r\n--' +
      boundary +
      '\r\n' +
      'Content-Type: ' +
      fileMetadata.mimeType +
      '\r\n\r\n'
    const postBlobPart = '\r\n--' + boundary + '--'
    const blob = new Blob([preBlobPart, file, postBlobPart])

    const response = await makeFilesRequest(url, uploadHeaders, blob)
    return response.json()
  }

  /**
   * List all uploaded files
   */
  async listFiles(listParams?: ListParams): Promise<ListFilesResponse> {
    const url = new FilesRequestUrl(FilesTask.LIST, this.apiKey, this._requestOptions)
    if (listParams?.pageSize) {
      url.appendParam('pageSize', listParams.pageSize.toString())
    }
    if (listParams?.pageToken) {
      url.appendParam('pageToken', listParams.pageToken)
    }
    const uploadHeaders = getHeaders(url)
    const response = await makeFilesRequest(url, uploadHeaders)
    return response.json()
  }

  /**
   * Get metadata for file with given ID
   */
  async getFile(fileId: string): Promise<FileMetadataResponse> {
    const url = new FilesRequestUrl(FilesTask.GET, this.apiKey, this._requestOptions)
    url.appendPath(parseFileId(fileId))
    const uploadHeaders = getHeaders(url)
    const response = await makeFilesRequest(url, uploadHeaders)
    return response.json()
  }

  /**
   * Delete file with given ID
   */
  async deleteFile(fileId: string): Promise<void> {
    const url = new FilesRequestUrl(FilesTask.DELETE, this.apiKey, this._requestOptions)
    url.appendPath(parseFileId(fileId))
    const uploadHeaders = getHeaders(url)
    await makeFilesRequest(url, uploadHeaders)
  }
}

/**
 * If fileId is prepended with "files/", remove prefix
 */
function parseFileId(fileId: string): string {
  if (fileId.startsWith('files/')) {
    return fileId.split('files/')[1]
  }
  if (!fileId) {
    throw new GoogleGenerativeAIError(
      `Invalid fileId ${fileId}. ` + `Must be in the format "files/filename" or "filename"`,
    )
  }

  return fileId
}

function generateBoundary(): string {
  let str = ''
  for (let i = 0; i < 2; i++) {
    str = str + Math.random().toString().slice(2)
  }
  return str
}

function getUploadMetadata(inputMetadata: FileMetadata): FileMetadata {
  if (!inputMetadata.mimeType) {
    throw new GoogleGenerativeAIRequestInputError('Must provide a mimeType.')
  }
  const uploadMetadata: FileMetadata = {
    mimeType: inputMetadata.mimeType,
    displayName: inputMetadata.displayName,
  }

  if (inputMetadata.name) {
    uploadMetadata.name = inputMetadata.name.includes('/') ? inputMetadata.name : `files/${inputMetadata.name}`
  }
  return uploadMetadata
}
