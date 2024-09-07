'use client'

import {
	ReactNode,
	useRef,
	type FunctionComponent,
	type PropsWithChildren,
} from 'react'
import styles from './DebounceResize.module.css'
import { useDebounceResize } from './useDebounceResize'

const clsx = (...classes: (string | false)[]) =>
	classes.filter((c) => typeof c === 'string').join(' ')

export type DebounceResizeProps = PropsWithChildren<{
	fallback?: ReactNode
	debounceMilliseconds?: number
	debounceIfReducedMotionPreferredToo?: boolean
	unmountContentWhileResizing?: boolean
	disableCrossFade?: boolean
}>

export const DebounceResize: FunctionComponent<DebounceResizeProps> = ({
	children,
	debounceMilliseconds,
	debounceIfReducedMotionPreferredToo,
	unmountContentWhileResizing = false,
	disableCrossFade = false,
	fallback,
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const { isResizing } = useDebounceResize(ref, {
		debounceMilliseconds,
		debounceIfReducedMotionPreferredToo,
	})

	return (
		<div
			className={clsx(
				styles.wrapper,
				isResizing && styles.is_resizing,
				unmountContentWhileResizing &&
					styles.is_unmountContentWhileResizingEnabled,
				disableCrossFade && styles.is_crossFadeDisabled,
			)}
			ref={ref}
		>
			<div className={styles.content}>
				{(!isResizing || !unmountContentWhileResizing) && children}
			</div>
			{fallback && <div className={styles.fallback}>{fallback}</div>}
		</div>
	)
}
