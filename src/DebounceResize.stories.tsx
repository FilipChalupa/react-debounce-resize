import type { Meta, StoryObj } from '@storybook/react'
import { CSSProperties, FunctionComponent, useState } from 'react'
import { DebounceResize } from './DebounceResize'
import './DebounceResize.stories.css'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

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
	render: () => <Render />,
}

const Render: FunctionComponent = () => {
	const [width, setWidth] = useState(300)
	const [height, setHeight] = useState(300)
	const prefersReducedMotion = usePrefersReducedMotion()

	return (
		<div
			className="wrapper"
			style={
				{ '--width': `${width}px`, '--height': `${height}px` } as CSSProperties
			}
		>
			<div className="input">
				Width: <b>{width}</b>px
				<input
					type="range"
					value={width}
					min={80}
					max={600}
					onChange={(event) => {
						setWidth(event.target.valueAsNumber)
					}}
				/>
				Height: <b>{height}</b>px
				<input
					type="range"
					value={height}
					min={80}
					max={600}
					onChange={(event) => {
						setHeight(event.target.valueAsNumber)
					}}
				/>
			</div>
			{prefersReducedMotion && (
				<p className="warning">
					⚠️ Your user agent is set to prefer reduced motion.{' '}
					<code>&lt;DebounceResize&gt;</code> won't debounce assuming there is
					no reason to.
				</p>
			)}
			<div className="main">
				<DebounceResize fallback={<div className="fallback" />}>
					<div className="content">
						<div className="in">
							<span className="emoji">🥷📦</span>
							<br />
							I'm Mr. Content, look at me!
							<br />I don't like being resized
							<br />
							so I will better hide.
						</div>
					</div>
				</DebounceResize>
			</div>
		</div>
	)
}
