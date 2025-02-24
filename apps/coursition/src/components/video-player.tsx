import { languages } from '@nmit-coursition/utils'
import { transformToHighlightedVTT } from '@nmit-coursition/utils'
import { MediaPlayer, type MediaPlayerInstance, MediaProvider, Track } from '@vidstack/react'
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default'
import { useEffect, useRef, useState } from 'react'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import './video-player.css'

interface VideoPlayerProps {
  source: string
  subtitles?: string
  subtitlesLang?: keyof typeof languages
  className?: string
  aspectRatio?: string
}

export function VideoPlayer({ source, subtitles, subtitlesLang = 'en-gb', className, aspectRatio }: VideoPlayerProps) {
  const player = useRef<MediaPlayerInstance>(null)
  const [highlightedSubtitles, setHighlightedSubtitles] = useState<string | undefined>()

  useEffect(() => {
    if (!player.current) return
    player.current.startLoading()
  }, [source])

  useEffect(() => {
    if (!subtitles) return

    fetch(subtitles)
      .then((response) => response.text())
      .then((content) => {
        const highlighted = transformToHighlightedVTT(content, 'vtt')
        const blob = new Blob([highlighted], { type: 'text/vtt' })
        const url = URL.createObjectURL(blob)
        setHighlightedSubtitles(url)

        return () => URL.revokeObjectURL(url)
      })
      .catch((error) => {
        console.error('Failed to transform subtitles:', error)
        setHighlightedSubtitles(subtitles)
      })
  }, [subtitles])

  useEffect(() => {
    if (!player.current) return
    const textTracks = player.current.textTracks
    if (textTracks[0]) {
      textTracks[0].mode = 'showing'
    }
  }, [highlightedSubtitles])

  return (
    <MediaPlayer
      ref={player}
      src={{ src: source, type: 'video/mp4' }}
      load='visible'
      className={`h-full w-full ${className || ''}`}
      aspectRatio={aspectRatio}
    >
      <MediaProvider>
        {highlightedSubtitles && (
          <Track
            src={highlightedSubtitles}
            kind='subtitles'
            label={languages[subtitlesLang]}
            lang={subtitlesLang}
            default
          />
        )}
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails='' />
    </MediaPlayer>
  )
}
