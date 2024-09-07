'use client'

import {
	ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
	type FunctionComponent,
	type PropsWithChildren,
} from 'react'
import styles from './DebounceResize.module.css'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

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
	debounceMilliseconds = 300,
	debounceIfReducedMotionPreferredToo = false,
	unmountContentWhileResizing = false,
	disableCrossFade = false,
	fallback,
}) => {
	const prefersReducedMotion = usePrefersReducedMotion()
	const [isResizing, setIsResizing] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const firstChangeRef = useRef(true)
	const handleChange = useMemo(() => {
		let timer: ReturnType<typeof setTimeout> | null = null

		return () => {
			if (firstChangeRef.current === true) {
				firstChangeRef.current = false
				return
			}
			if (
				(prefersReducedMotion && !debounceIfReducedMotionPreferredToo) ||
				debounceMilliseconds === 0
			) {
				return
			}
			setIsResizing(true)
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				setIsResizing(false)
			}, debounceMilliseconds)
		}
	}, [
		debounceMilliseconds,
		debounceIfReducedMotionPreferredToo,
		prefersReducedMotion,
	])

	useEffect(() => {
		const element = ref.current
		if (!element) {
			return
		}
		const observer = new ResizeObserver(handleChange)
		observer.observe(element)
		return () => {
			observer.unobserve(element)
		}
	}, [handleChange])

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
