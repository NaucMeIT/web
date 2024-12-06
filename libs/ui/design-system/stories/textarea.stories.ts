import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '../../design-system/src/textarea'

interface TextareaProps {
  id: string
  placeholder: string
  subtext?: string
  label: string
  disabled?: boolean
}

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    subtext: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<TextareaProps>

export default meta
type Story = StoryObj<TextareaProps>

export const Default: Story = {
  args: {
    id: 'default-textarea',
    label: 'Description',
    placeholder: 'Enter your description',
  },
}

export const WithSubtext: Story = {
  args: {
    id: 'subtext-textarea',
    label: 'Feedback',
    placeholder: 'Share your thoughts',
    subtext: 'Your feedback helps us improve',
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled-textarea',
    label: 'Disabled Textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
}

export const LongLabel: Story = {
  args: {
    id: 'long-label-textarea',
    label: 'This is a very long label that demonstrates text wrapping and responsiveness',
    placeholder: 'Enter your text here',
  },
}
