import { type RsbuildPlugin } from '@rsbuild/core'
import { withZephyr } from 'zephyr-webpack-plugin'

export const zephyrRsbuildPlugin = (): RsbuildPlugin => ({
  name: 'zephyr-rsbuild-plugin',
  setup: (api) => {
    api.modifyRspackConfig(async (config, utils) => {
      //@ts-expect-error
      const zephyrConfig = await withZephyr()(config)
      //@ts-expect-error
      utils.mergeConfig(config, zephyrConfig)
    })
  },
})
