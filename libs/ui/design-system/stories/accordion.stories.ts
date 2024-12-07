import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Accordion } from '../../design-system/src/accordion'

const meta = {
  title: 'Primitives/Accordion',
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const OneItem: Story = {
  args: {
    items: [
      {
        title: 'Item 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
}

export const OneItemLongText: Story = {
  args: {
    items: [
      {
        title: 'Item 1',
        content:
          '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum pariatur ratione officiis. Tempore mollitia aliquam magni. Quae quisquam fugit accusamus tenetur consectetur culpa omnis, possimus sit excepturi minima reiciendis nobis.',
      },
    ],
  },
}

export const MultipleItems: Story = {
  args: {
    items: [
      {
        title: 'Item 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Item 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Item 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
}

export const MultipleItemsDifferentLength: Story = {
  args: {
    items: [
      {
        title: 'Item 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Item 2',
        content: 'Lorem ipsum dolor.',
      },
    ],
  },
}
