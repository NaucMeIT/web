import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Input, type InputProps } from '../../design-system/src/input'

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
} satisfies Meta<InputProps>

export default meta
type Story = StoryObj<InputProps>

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
