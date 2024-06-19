export interface ErrorDetails {
  '@type'?: string
  reason?: string
  domain?: string
  metadata?: Record<string, unknown>
  [key: string]: unknown
}

/**
 * Params to pass to {@link GoogleAIFileManager.listFiles}
 * @public
 */
export interface ListParams {
  pageSize?: number
  pageToken?: string
}

/**
 * Metadata to provide alongside a file upload
 * @public
 */
export interface FileMetadata {
  name?: string
  displayName?: string
  mimeType: string
}

/**
 * File metadata response from server.
 * @public
 */
export interface FileMetadataResponse {
  name: string
  displayName?: string
  mimeType: string
  sizeBytes: string
  createTime: string
  updateTime: string
  expirationTime: string
  sha256Hash: string
  uri: string
  state: FileState
  /**
   * Error populated if file processing has failed.
   */
  error?: RpcStatus
  /**
   * Video metadata populated after processing is complete.
   */
  videoMetadata?: VideoMetadata
}

/**
 * Response from calling {@link GoogleAIFileManager.listFiles}
 * @public
 */
export interface ListFilesResponse {
  files: FileMetadataResponse[]
  nextPageToken?: string
}

/**
 * Response from calling {@link GoogleAIFileManager.uploadFile}
 * @public
 */
export interface UploadFileResponse {
  file: FileMetadataResponse
}

/**
 * Processing state of the `File`.
 * @public
 */
export enum FileState {
  // The default value. This value is used if the state is omitted.
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  // File is being processed and cannot be used for inference yet.
  PROCESSING = 'PROCESSING',
  // File is processed and available for inference.
  ACTIVE = 'ACTIVE',
  // File failed processing.
  FAILED = 'FAILED',
}

/**
 * Standard RPC error status object.
 * @public
 */
export interface RpcStatus {
  /**
   * Error status code
   */
  code: number
  /**
   * A developer-facing error message.
   */
  message: string
  /**
   * A list of messages that carry the error details.
   */
  details?: ErrorDetails[]
}

/**
 * Metadata populated when video has been processed.
 * @public
 */
export interface VideoMetadata {
  /**
   * The video duration in
   * protobuf {@link https://cloud.google.com/ruby/docs/reference/google-cloud-workflows-v1/latest/Google-Protobuf-Duration#json-mapping | Duration} format.
   */
  videoDuration: string
}

/**
 * Basic error type for this SDK.
 * @public
 */
export class GoogleGenerativeAIError extends Error {
  constructor(message: string) {
    super(`[GoogleGenerativeAI Error]: ${message}`)
  }
}

/**
 * Errors in the contents of a response from the model. This includes parsing
 * errors, or responses including a safety block reason.
 * @public
 */
export class GoogleGenerativeAIResponseError<T> extends GoogleGenerativeAIError {
  constructor(
    message: string,
    public response?: T,
  ) {
    super(message)
  }
}

/**
 * Error class covering HTTP errors when calling the server. Includes HTTP
 * status, statusText, and optional details, if provided in the server response.
 * @public
 */
export class GoogleGenerativeAIFetchError extends GoogleGenerativeAIError {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string,
    public errorDetails?: ErrorDetails[],
  ) {
    super(message)
  }
}

/**
 * Errors in the contents of a request originating from user input.
 * @public
 */
export class GoogleGenerativeAIRequestInputError extends GoogleGenerativeAIError {}
