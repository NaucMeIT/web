import { languages } from '@nmit-coursition/utils/languages'
import { transformToHighlightedVTT } from '@nmit-coursition/utils/subtitles'
import { MediaPlayer, type MediaPlayerInstance, MediaProvider, type MediaSrc, Track } from '@vidstack/react'
import {
  DefaultMenuCheckbox,
  DefaultMenuItem,
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'
import { useEffect, useRef, useState } from 'react'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import './video-player.css'

export type { MediaSrc } from '@vidstack/react'

interface VideoPlayerProps {
  source: MediaSrc
  subtitles?: string
  subtitlesLang?: keyof typeof languages
  aspectRatio?: string
}

function HighlightSettings({
  highlightEnabled,
  handleHighlightToggle,
}: { highlightEnabled: boolean; handleHighlightToggle: (checked: boolean) => void }) {
  return (
    <DefaultMenuItem label='Short popup style'>
      <DefaultMenuCheckbox
        label='Short popup style'
        checked={highlightEnabled}
        onChange={(checked, trigger) => trigger?.isTrusted && handleHighlightToggle(checked)}
      />
    </DefaultMenuItem>
  )
}

export function VideoPlayer({ source, subtitles, subtitlesLang = 'en-gb', aspectRatio }: VideoPlayerProps) {
  const player = useRef<MediaPlayerInstance>(null)
  const [highlightingEnabled, setHighlightingEnabled] = useState(false)
  const [highlightedSubtitles, setHighlightedSubtitles] = useState<string>()

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
      })
  }, [subtitles])

  useEffect(() => {
    if (!player.current) return
    const textTracks = player.current.textTracks
    if (textTracks[0]) {
      textTracks[0].mode = 'showing'
    }
  }, [highlightingEnabled])

  return (
    <MediaPlayer ref={player} src={source} load='visible' className='h-full w-full' aspectRatio={aspectRatio}>
      <MediaProvider>
        <Track
          src={highlightingEnabled ? highlightedSubtitles : subtitles}
          kind='subtitles'
          label={languages[subtitlesLang]}
          lang={subtitlesLang}
          default
        />
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        menuGroup='bottom'
        slots={{
          captionsMenuItemsStart: (
            <HighlightSettings highlightEnabled={highlightingEnabled} handleHighlightToggle={setHighlightingEnabled} />
          ),
        }}
      ></DefaultVideoLayout>
    </MediaPlayer>
  )
}
