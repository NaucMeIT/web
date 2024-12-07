import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'
import { Tabs } from '../../design-system/src/tabs'

const meta = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    values: { control: 'object' },
    content: { control: 'object' },
    trigger: { control: 'object' },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    values: [
      {
        value: 'tab1',
        displayText: 'Tab 1',
        children: <div>Content for Tab 1</div>,
      },
      {
        value: 'tab2',
        displayText: 'Tab 2',
        children: <div>Content for Tab 2</div>,
      },
      {
        value: 'tab3',
        displayText: 'Tab 3',
        children: <div>Content for Tab 3</div>,
      },
    ],
  },
}

export const WithCustomContent: Story = {
  args: {
    values: [
      {
        value: 'profile',
        displayText: 'Profile',
        children: (
          <div>
            <h2>User Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: john@example.com</p>
          </div>
        ),
      },
      {
        value: 'settings',
        displayText: 'Settings',
        children: (
          <div>
            <h2>Account Settings</h2>
            <p>Notifications: Enabled</p>
            <p>Privacy: Strict</p>
          </div>
        ),
      },
    ],
  },
}
