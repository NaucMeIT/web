import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../src/checkbox'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    id: 'test',
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    id: 'test',
    label: 'Checkbox',
    subtext: 'This is explanation subtext.',
  },
}

export const Disabled: Story = {
  args: {
    id: 'test',
    label: 'Disabled Checkbox',
    disabled: true,
  },
}
