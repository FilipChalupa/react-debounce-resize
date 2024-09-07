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

const min = 80
const max = 600

const random = () => Math.floor(Math.random() * (max - min + 1)) + min
const interpolate = (initial: number, target: number, progress: number) =>
	Math.floor(progress * (target - initial)) + initial

const Render: FunctionComponent = () => {
	const [width, setWidth] = useState(300)
	const [height, setHeight] = useState(300)
	const prefersReducedMotion = usePrefersReducedMotion()
	const [isAnimating, setIsAnimating] = useState(false)

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
					disabled={isAnimating}
					value={width}
					min={min}
					max={max}
					onChange={(event) => {
						setWidth(event.target.valueAsNumber)
					}}
				/>
				Height: <b>{height}</b>px
				<input
					type="range"
					disabled={isAnimating}
					value={height}
					min={min}
					max={max}
					onChange={(event) => {
						setHeight(event.target.valueAsNumber)
					}}
				/>
				<button
					type="button"
					disabled={isAnimating}
					className="random"
					onClick={() => {
						setIsAnimating(true)
						const targetWidth = random()
						const targetHeight = random()
						const countMax = 60
						let count = countMax
						const loop = () => {
							count--
							const progress = 1 - count / countMax
							setWidth(interpolate(width, targetWidth, progress))
							setHeight(interpolate(height, targetHeight, progress))
							if (count > 0) {
								setTimeout(loop, 1000 / 60)
							} else {
								setIsAnimating(false)
							}
						}
						loop()
					}}
				>
					Animate random dimensions
				</button>
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
