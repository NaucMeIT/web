import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Actions } from '../../design-system/src/actions-wrapper'

const meta = {
  title: 'Primitives/Wrapper',
  component: Actions.Wrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Actions.Wrapper>

export default meta
type Story = StoryObj<typeof meta>

export const BasicCopy: Story = {
  args: {
    position: 'top-right',
    children: (
      <>
        <Actions.Content>
          <div>Example with copy button</div>
        </Actions.Content>
        <Actions.Copy />
      </>
    ),
  },
}

export const BasicDownload: Story = {
  args: {
    position: 'top-left',
    children: (
      <>
        <Actions.Content>
          <div>Content with download action in top-left</div>
        </Actions.Content>
        <Actions.Download filename='example' format='txt' />
      </>
    ),
  },
}

// Examples with multiple actions
export const MultipleActions: Story = {
  args: {
    position: 'bottom-right',
    children: (
      <>
        <Actions.Content>
          <div>Content with multiple actions in bottom-right</div>
        </Actions.Content>
        <Actions.Copy />
        <Actions.Download filename='example' format='txt' />
      </>
    ),
  },
}

// Example with callbacks
export const WithCallbacks: Story = {
  args: {
    position: 'top-right',
    children: (
      <>
        <Actions.Content>
          <div className='p-4 border rounded bg-white'>Content with action callbacks</div>
        </Actions.Content>
        <Actions.Copy
          onSuccess={() => console.log('Content copied!')}
          onError={(error) => console.error('Copy failed:', error)}
        />
      </>
    ),
  },
}

// Example with DefaultActionBar
export const DefaultActionBar: Story = {
  args: {
    position: 'top-left',
    children: (
      <>
        <Actions.Content>
          <p>Content with default action bar</p>
        </Actions.Content>
        <Actions.Copy />
        <Actions.Download
          filename='example'
          format='txt'
          onSuccess={() => console.log('Content downloaded!')}
          onError={() => console.error('Download failed!')}
        />
      </>
    ),
  },
}
