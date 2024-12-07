import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Input } from '../src/input'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    labelText: { control: 'text' },
    subText: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    disabled: { control: 'boolean' },
    alt: { control: 'boolean' },
    autocomplete: { control: 'text' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    labelText: 'Username',
    type: 'text',
  },
}

export const WithSubtext: Story = {
  args: {
    labelText: 'Email',
    subText: 'We will never share your email',
    type: 'email',
  },
}

export const Password: Story = {
  args: {
    labelText: 'Password',
    type: 'password',
    subText: 'Must be at least 8 characters',
  },
}

export const Disabled: Story = {
  args: {
    labelText: 'Disabled Input',
    type: 'text',
    disabled: true,
  },
}

export const NumberInput: Story = {
  args: {
    labelText: 'Age',
    type: 'number' as any,
  },
}
