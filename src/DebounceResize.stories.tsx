import type { Meta, StoryObj } from '@storybook/react'
import { DebounceResize } from './DebounceResize'
import './DebounceResize.stories.css'

const meta = {
	title: 'Debounce resize',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof DebounceResize>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
	render: () => <div className="wrapper">@TODO</div>,
}
