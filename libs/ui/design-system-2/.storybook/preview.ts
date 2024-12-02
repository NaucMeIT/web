import type { Preview } from '@storybook/react'

import '../src/nmit-colors.css'
import '../src/main.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'Dark', value: 'var(--color-fuchsia-950)' },
        { name: 'Light', value: 'var(--color-amber-50)' },
      ],
      default: 'Dark',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story, context) => {
      const bgNameDefault = context.parameters.backgrounds.values[0].value
      const bgNameCurrent = context.globals.backgrounds?.value
      if (!bgNameCurrent || bgNameDefault === bgNameCurrent) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return story()
    },
  ],
}

export default preview
