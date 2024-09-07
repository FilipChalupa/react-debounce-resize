import { useMedia } from './useMedia'

export const usePrefersReducedMotion = () =>
	useMedia('(prefers-reduced-motion: reduce)', true)
