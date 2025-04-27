import { describe, expect, it } from 'bun:test'
import { transformToHighlightedVTT } from './subtitles'

describe('transformToHighlightedVTT', () => {
  describe('SRT format', () => {
    it('should transform a simple SRT subtitle into word-by-word VTT', () => {
      const input = `1
00:00:01,000 --> 00:00:04,000
Hello world`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:02.500
<c.highlight>Hello</c> world

00:00:02.500 --> 00:00:04.000
Hello <c.highlight>world</c>`

      expect(transformToHighlightedVTT(input, 'srt')).toBe(expected)
    })

    it('should handle multiple subtitle blocks', () => {
      const input = `1
00:00:01,000 --> 00:00:02,000
First line

2
00:00:02,000 --> 00:00:03,000
Second line`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:01.500
<c.highlight>First</c> line

00:00:01.500 --> 00:00:02.000
First <c.highlight>line</c>

00:00:02.000 --> 00:00:02.500
<c.highlight>Second</c> line

00:00:02.500 --> 00:00:03.000
Second <c.highlight>line</c>`

      expect(transformToHighlightedVTT(input, 'srt')).toBe(expected)
    })

    it('should handle empty lines and whitespace', () => {
      const input = `
1
00:00:01,000 --> 00:00:02,000
  Hello   world  

2
00:00:02,000 --> 00:00:03,000
Test`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:01.500
<c.highlight>Hello</c> world

00:00:01.500 --> 00:00:02.000
Hello <c.highlight>world</c>

00:00:02.000 --> 00:00:03.000
<c.highlight>Test</c>`

      expect(transformToHighlightedVTT(input, 'srt')).toBe(expected)
    })

    it('should throw error for invalid time format', () => {
      const input = `1
00:00:01 --> 00:00:02
Hello world`

      expect(() => transformToHighlightedVTT(input, 'srt')).toThrow('Invalid time format')
    })
  })

  describe('VTT format', () => {
    it('should transform a simple VTT subtitle into word-by-word VTT', () => {
      const input = `WEBVTT

00:00:01.000 --> 00:00:04.000
Hello world`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:02.500
<c.highlight>Hello</c> world

00:00:02.500 --> 00:00:04.000
Hello <c.highlight>world</c>`

      expect(transformToHighlightedVTT(input, 'vtt')).toBe(expected)
    })

    it('should handle VTT without WEBVTT header', () => {
      const input = `00:00:01.000 --> 00:00:02.000
Hello world`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:01.500
<c.highlight>Hello</c> world

00:00:01.500 --> 00:00:02.000
Hello <c.highlight>world</c>`

      expect(transformToHighlightedVTT(input, 'vtt')).toBe(expected)
    })

    it('should handle existing style tags', () => {
      const input = `WEBVTT

00:00:01.000 --> 00:00:02.000
<v Speaker1>Hello world</v>`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:01.500
<c.highlight>Hello</c> world

00:00:01.500 --> 00:00:02.000
Hello <c.highlight>world</c>`

      expect(transformToHighlightedVTT(input, 'vtt')).toBe(expected)
    })
  })

  describe('Error handling', () => {
    it('should throw error for empty content', () => {
      expect(() => transformToHighlightedVTT('', 'srt')).toThrow('No valid subtitle cues found')
      expect(() => transformToHighlightedVTT('', 'vtt')).toThrow('No valid subtitle cues found')
    })

    it('should throw error for content with no valid cues', () => {
      expect(() => transformToHighlightedVTT('Invalid content', 'srt')).toThrow('Missing time line')
      expect(() => transformToHighlightedVTT('WEBVTT\n\nInvalid content', 'vtt')).toThrow(
        'No valid subtitle cues found',
      )
    })

    it('should throw error for invalid time values', () => {
      const input = `1
00:xx:01,000 --> 00:00:02,000
Hello world`

      expect(() => transformToHighlightedVTT(input, 'srt')).toThrow('Invalid time format')
    })
  })

  describe('Edge cases', () => {
    it('should handle single-word subtitles', () => {
      const input = `1
00:00:01,000 --> 00:00:02,000
Hello`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:02.000
<c.highlight>Hello</c>`

      expect(transformToHighlightedVTT(input, 'srt')).toBe(expected)
    })

    it('should handle multi-line text', () => {
      const input = `1
00:00:01,000 --> 00:00:03,000
First line
Second line`

      const expected = `WEBVTT

00:00:01.000 --> 00:00:01.500
<c.highlight>First</c> line Second line

00:00:01.500 --> 00:00:02.000
First <c.highlight>line</c> Second line

00:00:02.000 --> 00:00:02.500
First line <c.highlight>Second</c> line

00:00:02.500 --> 00:00:03.000
First line Second <c.highlight>line</c>`

      expect(transformToHighlightedVTT(input, 'srt')).toBe(expected)
    })

    it('should handle milliseconds correctly', () => {
      const input = `1
00:00:01,500 --> 00:00:02,500
Hello world`

      const expected = `WEBVTT

00:00:01.500 --> 00:00:02.000
<c.highlight>Hello</c> world

00:00:02.000 --> 00:00:02.500
Hello <c.highlight>world</c>`

      expect(transformToHighlightedVTT(input, 'srt')).toBe(expected)
    })
  })

  describe('VTT Transformation', () => {
    describe('Input Validation', () => {
      it('should throw error for invalid time format', () => {
        const invalidInput = `WEBVTT

00:00:07.359 --> 00:00:07.670.5714285714284
Invalid time format`

        expect(() => transformToHighlightedVTT(invalidInput, 'vtt')).toThrow('Invalid time format')
      })

      it('should throw error for empty content', () => {
        expect(() => transformToHighlightedVTT('', 'vtt')).toThrow('No valid subtitle cues found')
      })
    })

    describe('Time Format Handling', () => {
      it('should correctly handle milliseconds', () => {
        const input = `WEBVTT

00:00:07.359 --> 00:00:09.540
test word`

        const output = transformToHighlightedVTT(input, 'vtt')
        const lines = output.split('\n')

        // Find the first timestamp line
        const timestampLine = lines.find((line) => line.includes('-->'))
        expect(timestampLine).toBeDefined()

        // Verify timestamp format
        const timeRegex = /^\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}$/
        expect(timestampLine).toMatch(timeRegex)
      })

      it('should evenly distribute time for word-by-word highlighting', () => {
        const input = `WEBVTT

00:00:00.000 --> 00:00:02.000
test word example`

        const output = transformToHighlightedVTT(input, 'vtt')
        const lines = output.split('\n').filter((line) => line.includes('-->'))

        expect(lines.length).toBe(3) // One line per word

        // Each word should get ~666.667ms (2000ms / 3 words)
        // Due to rounding, we accept both .666 and .667 as valid values
        expect(lines[0]).toMatch(/00:00:00\.000 --> 00:00:00\.66[67]/)
        expect(lines[1]).toMatch(/00:00:00\.66[67] --> 00:00:01\.33[34]/)
        expect(lines[2]).toMatch(/00:00:01\.33[34] --> 00:00:02\.000/)
      })
    })

    describe('Highlighting', () => {
      it('should correctly highlight each word', () => {
        const input = `WEBVTT

00:00:00.000 --> 00:00:02.000
test word`

        const output = transformToHighlightedVTT(input, 'vtt')

        expect(output).toContain('<c.highlight>test</c> word')
        expect(output).toContain('test <c.highlight>word</c>')
      })

      it('should preserve original text while highlighting', () => {
        const input = `WEBVTT

00:00:00.000 --> 00:00:02.000
Complex sentence with multiple words`

        const output = transformToHighlightedVTT(input, 'vtt')

        // Each line should contain all words, with only one highlighted
        const textLines = output
          .split('\n')
          .filter((line) => !line.includes('-->') && line.trim() !== '' && line !== 'WEBVTT')

        textLines.forEach((line) => {
          expect(line.replace(/<[^>]*>/g, '')).toBe('Complex sentence with multiple words')
          expect(line.match(/<c\.highlight>/g)?.length).toBe(1)
          expect(line.match(/<\/c>/g)?.length).toBe(1)
        })
      })
    })
  })
})
