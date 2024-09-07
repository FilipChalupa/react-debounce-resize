import { useCallback, useSyncExternalStore } from 'react'

const getSnapshotTrue = () => true

const getMedia = () => window.matchMedia('(prefers-reduced-motion: reduce)')

export const usePrefersReducedMotion = () => {
	const subscribe = useCallback((onStoreChange: () => void) => {
		const media = getMedia()
		media.addEventListener('change', onStoreChange)
		return () => {
			media.removeEventListener('change', onStoreChange)
		}
	}, [])
	const getSnapshot = useCallback(() => getMedia().matches, [])
	return useSyncExternalStore(subscribe, getSnapshot, getSnapshotTrue)
}
