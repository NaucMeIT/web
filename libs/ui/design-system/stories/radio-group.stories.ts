import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '../../design-system/src/radio-group'

const meta = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    defaultValue: { control: 'text' },
    options: { control: 'object' },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', displayText: 'Option 1' },
      { value: 'option2', displayText: 'Option 2' },
      { value: 'option3', displayText: 'Option 3' },
    ],
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'option2',
    options: [
      { value: 'option1', displayText: 'Option 1' },
      { value: 'option2', displayText: 'Option 2' },
      { value: 'option3', displayText: 'Option 3' },
    ],
  },
}
