'use client'

import type { FunctionComponent, PropsWithChildren } from 'react'
import styles from './DebounceResize.module.css'

export type DebounceResizeProps = PropsWithChildren

export const DebounceResize: FunctionComponent<DebounceResizeProps> = ({
	children,
}) => {
	return <div className={styles.wrapper}>{children}</div>
}
