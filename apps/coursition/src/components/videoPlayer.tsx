import { languages } from '@nmit-coursition/utils'
import { MediaPlayer, type MediaPlayerInstance, MediaProvider, Track } from '@vidstack/react'
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default'
import { useEffect, useRef } from 'react'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

interface VideoPlayerProps {
  source: string
  subtitles?: string
  subtitlesLang?: keyof typeof languages
}

export function VideoPlayer({ source, subtitles, subtitlesLang = 'en-gb' }: VideoPlayerProps) {
  const player = useRef<MediaPlayerInstance>(null)

  useEffect(() => {
    if (!player.current) return
    player.current.startLoading()
  }, [source])

  return (
    <MediaPlayer ref={player} src={{ src: source, type: 'video/mp4' }} className='w-full aspect-video' load='visible'>
      <MediaProvider>
        {subtitles && (
          <Track src={subtitles} kind='subtitles' label={languages[subtitlesLang]} lang={subtitlesLang} default />
        )}
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails='' />
    </MediaPlayer>
  )
}
