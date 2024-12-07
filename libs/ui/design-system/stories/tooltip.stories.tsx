import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'
import { Button } from '../src/button'
import { Tooltip } from '../src/tooltip'

const meta = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    trigger: { control: 'text' },
    content: { control: 'text' },
  },
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: 'Hover me',
    content: 'This is a tooltip',
  },
}

export const LongContent: Story = {
  args: {
    trigger: 'Hover for details',
    content:
      'This is a very long tooltip that demonstrates how the tooltip handles multiple lines of text and wrapping.',
  },
}

export const WithCustomTrigger: Story = {
  args: {
    trigger: <Button>Custom button</Button>,
    content: 'Tooltip for a custom button',
  },
}
