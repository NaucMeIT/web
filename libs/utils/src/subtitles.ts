interface SubtitleCue {
  startTime: number
  endTime: number
  text: string
}

interface HighlightedCue extends SubtitleCue {
  highlightedWord: string
  position: number
}

class SubtitleParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SubtitleParseError'
  }
}

/**
 * Converts time in HH:MM:SS,mmm or HH:MM:SS.mmm format to milliseconds
 */
const timeToMs = (timeStr: string): number => {
  const parts = timeStr.replace(',', '.').split('.')
  if (parts.length === 0) {
    throw new SubtitleParseError(`Invalid time format: ${timeStr}`)
  }

  const [time = ''] = parts
  const ms = parts[1] || '0'

  const timeParts = time.split(':')
  if (timeParts.length !== 3) {
    throw new SubtitleParseError(`Invalid time format: ${timeStr}`)
  }

  const [hoursStr = '0', minutesStr = '0', secondsStr = '0'] = timeParts
  const hours = Number(hoursStr)
  const minutes = Number(minutesStr)
  const seconds = Number(secondsStr)

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    throw new SubtitleParseError(`Invalid time values: ${timeStr}`)
  }

  return (hours * 3600 + minutes * 60 + seconds) * 1000 + Number(ms)
}

/**
 * Converts milliseconds to VTT time format (HH:MM:SS.mmm)
 */
const msToVttTime = (ms: number): string => {
  const pad = (n: number, width: number) => String(n).padStart(width, '0')

  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const milliseconds = ms % 1000

  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`
}

/**
 * Validates and parses a time range line
 */
const parseTimeLine = (line: string): [number, number] => {
  const parts = line.split(' --> ')
  if (parts.length !== 2) {
    throw new SubtitleParseError(`Invalid time range format: ${line}`)
  }

  const [start, end] = parts
  if (!start || !end) {
    throw new SubtitleParseError(`Invalid time range values: ${line}`)
  }

  // Validate time format (HH:MM:SS,mmm or HH:MM:SS.mmm)
  const timeRegex = /^\d{2}:\d{2}:\d{2}[,.]\d{3}$/
  if (!timeRegex.test(start) || !timeRegex.test(end)) {
    throw new SubtitleParseError(`Invalid time format: ${line}`)
  }

  return [timeToMs(start), timeToMs(end)]
}

/**
 * Parses SRT format subtitles
 */
const parseSRT = (content: string): SubtitleCue[] => {
  // Split into blocks and normalize line endings
  const blocks = content
    .replace(/\r\n/g, '\n')
    .trim()
    .split('\n\n')
    .map((block) => block.trim())
    .filter((block) => block)

  return blocks.map((block) => {
    // Split into lines
    const lines = block.split('\n').map((line) => line.trim())

    // Find the time line (should contain ' --> ')
    const timeLineIndex = lines.findIndex((line) => line.includes(' --> '))
    if (timeLineIndex === -1) {
      throw new SubtitleParseError(`Missing time line in block: ${block}`)
    }

    // At this point we know the line exists because findIndex returned a valid index
    const timeLine = lines[timeLineIndex]!
    const textLines = lines.slice(timeLineIndex + 1)

    if (textLines.length === 0) {
      throw new SubtitleParseError(`Missing subtitle text in block: ${block}`)
    }

    const [startTime, endTime] = parseTimeLine(timeLine)

    return {
      startTime,
      endTime,
      text: textLines
        .filter((line) => line) // Filter empty lines
        .join(' ')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim(),
    }
  })
}

/**
 * Parses WebVTT format subtitles
 */
const parseVTT = (content: string): SubtitleCue[] => {
  const lines = content.trim().split('\n')
  const cues: SubtitleCue[] = []
  let currentCue: Partial<SubtitleCue> | null = null

  // Skip WEBVTT header if present
  const startIdx = lines[0]?.startsWith('WEBVTT') ? 1 : 0

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i]?.trim() ?? ''

    if (!line) continue

    if (line.includes('-->')) {
      const [startTime, endTime] = parseTimeLine(line)
      currentCue = {
        startTime,
        endTime,
      }
    } else if (currentCue && !line.startsWith('WEBVTT')) {
      currentCue.text = line.replace(/<[^>]*>/g, '').trim()
      if (
        typeof currentCue.startTime === 'number' &&
        typeof currentCue.endTime === 'number' &&
        typeof currentCue.text === 'string'
      ) {
        cues.push({
          startTime: currentCue.startTime,
          endTime: currentCue.endTime,
          text: currentCue.text,
        })
      }
      currentCue = null
    }
  }

  return cues
}

/**
 * Creates word-by-word highlighted cues from a subtitle cue
 */
const createHighlightedCues = (cue: SubtitleCue): HighlightedCue[] => {
  const words = cue.text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
  if (words.length === 0) return []

  const duration = cue.endTime - cue.startTime
  const timePerWord = duration / words.length

  return words.map((word, index) => ({
    startTime: cue.startTime + timePerWord * index,
    endTime: cue.startTime + timePerWord * (index + 1),
    text: words.join(' '),
    highlightedWord: word,
    position: index,
  }))
}

/**
 * Formats a highlighted cue into VTT format with c.highlight tags
 */
const formatHighlightedCue = (cue: HighlightedCue): string => {
  const words = cue.text.split(/\s+/)
  words[cue.position] = `<c.highlight>${cue.highlightedWord}</c>`
  return `${msToVttTime(cue.startTime)} --> ${msToVttTime(cue.endTime)}
${words.join(' ')}`
}

/**
 * Transforms subtitles into word-by-word highlighted VTT format
 * @param content - The subtitle content
 * @param format - The input format ('srt' | 'vtt')
 * @returns WebVTT formatted string with word-by-word highlights
 * @throws {SubtitleParseError} If the subtitle content is invalid
 */
export const transformToHighlightedVTT = (content: string, format: 'srt' | 'vtt'): string => {
  try {
    // Parse the input based on format
    const cues = format === 'srt' ? parseSRT(content) : parseVTT(content)

    // Create highlighted cues for each word
    const highlightedCues = cues.flatMap(createHighlightedCues)

    if (highlightedCues.length === 0) {
      throw new SubtitleParseError('No valid subtitle cues found')
    }

    // Format the output as VTT
    return `WEBVTT

${highlightedCues.map(formatHighlightedCue).join('\n\n')}`
  } catch (error) {
    if (error instanceof SubtitleParseError) {
      throw error
    }
    throw new SubtitleParseError(
      `Failed to parse ${format} subtitles: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
