import { join } from 'path'
import { mkdir } from 'fs/promises'

interface DownloadMediaResult {
  path: string
}

/**
 * Downloads media from a public URL using yt-dlp
 * @param url The URL to download from
 * @returns Promise containing the path to the downloaded file
 */
export async function downloadPublicMedia(url: string): Promise<DownloadMediaResult> {
  const timestamp = Date.now()
  const outputPath = join(process.cwd(), 'tmp')
  const outputFile = join(outputPath, `${timestamp}.mp3`)

  try {
    await mkdir(outputPath, { recursive: true })
    const proc = Bun.spawn([
      'yt-dlp',
      '-x', // Extract audio
      '--audio-format',
      'mp3',
      '-o',
      outputFile,
      url,
    ])

    const exitCode = await proc.exited

    if (exitCode !== 0) {
      throw new Error(`yt-dlp process failed with exit code ${exitCode}`)
    }

    return { path: outputFile }
  } catch (error) {
    throw new Error(`Failed to download media: ${error}`)
  }
}
