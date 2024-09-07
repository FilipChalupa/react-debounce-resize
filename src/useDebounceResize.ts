import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Options = {
	debounceMilliseconds?: number
	debounceIfReducedMotionPreferredToo?: boolean
}

export const useDebounceResize = (
	ref: RefObject<HTMLElement>,
	{
		debounceMilliseconds = 300,
		debounceIfReducedMotionPreferredToo = false,
	}: Options = {},
) => {
	const prefersReducedMotion = usePrefersReducedMotion()
	const [isResizing, setIsResizing] = useState(false)

	const lastDimensionsRef = useRef<null | { width: number; height: number }>(
		null,
	)
	const handleChange = useMemo(() => {
		let timer: ReturnType<typeof setTimeout> | null = null

		return () => {
			const element = ref.current
			if (!element) {
				return
			}
			const lastDimensions = lastDimensionsRef.current
			const currentDimensions = {
				width: element.offsetWidth,
				height: element.offsetHeight,
			}
			lastDimensionsRef.current = currentDimensions

			// Don't debounce on first render or if the dimensions haven't changed
			if (
				lastDimensions === null ||
				(currentDimensions.width === lastDimensions.width &&
					currentDimensions.height === lastDimensions.height)
			) {
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

	return useMemo(() => ({ isResizing }), [isResizing])
}
