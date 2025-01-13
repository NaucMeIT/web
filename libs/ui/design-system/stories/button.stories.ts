import { Button } from '@douyinfe/semi-ui'
import { type ButtonProps } from '@douyinfe/semi-ui/lib/es/button'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonProps> = {
  title: 'Button',
  component: Button as any,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    type: { control: 'radio', options: ['primary', 'secondary', 'tertiary', 'warning', 'danger'] },
    theme: { control: 'radio', options: ['light', 'solid', 'borderless', 'outline'] },
    size: { control: 'radio', options: ['large', 'default', 'small'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Button',
    type: 'primary',
    theme: 'solid',
    size: 'default',
    disabled: false,
    loading: false,
  },
}
