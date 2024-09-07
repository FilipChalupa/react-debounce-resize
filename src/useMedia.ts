import { useCallback, useSyncExternalStore } from 'react'

export const useMedia = (query: string, initialValue: boolean) => {
	const subscribe = useCallback(
		(onStoreChange: () => void) => {
			const media = window.matchMedia(query)
			media.addEventListener('change', onStoreChange)
			return () => {
				media.removeEventListener('change', onStoreChange)
			}
		},
		[query],
	)
	const getSnapshot = useCallback(
		() => window.matchMedia(query).matches,
		[query],
	)
	const getServerSnapshot = useCallback(() => initialValue, [initialValue])
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
