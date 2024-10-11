const { buildConfig } = require('../../libs/ui/utils/src/tailwind.config')
const { colors } = require('../../libs/ui/design-system/src/nmit-colors')

module.exports = {
  ...buildConfig(__dirname),
  theme: {
    extend: {
      colors: {
        ...buildConfig(__dirname).theme.extend.colors,
        ...colors,
      },
    },
  },
}
