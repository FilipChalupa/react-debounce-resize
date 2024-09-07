# React debounce resize [![npm](https://img.shields.io/npm/v/react-debounce-resize.svg)](https://www.npmjs.com/package/react-debounce-resize) ![npm type definitions](https://img.shields.io/npm/types/react-debounce-resize.svg)

![screencast](https://raw.githubusercontent.com/FilipChalupa/react-debounce-resize/HEAD/screencast.gif)

Debounce element resize by showing pending state. Try interactive [Storybook demo](https://filipchalupa.cz/react-debounce-resize/).

## Installation

```bash
npm install react-debounce-resize
```

## How to use

```jsx
import { SwipeAction } from 'react-debounce-resize'
import 'react-debounce-resize/dist/index.css'

const App = () => {
	return (
		<DebounceResize fallback="Redrawing…">
			Your content here. E.g. a chart which is computationally intensive when
			resized.
		</DebounceResize>
	)
}
```

### Props

| Prop                                  | Type        | Default | Description                                               |
| ------------------------------------- | ----------- | ------- | --------------------------------------------------------- |
| `fallback`                            | `ReactNode` |         | Fallback content shown while resizing is happening.       |
| `debounceMilliseconds`                | `number`    | `300`   | How long to wait before assuming resize has ended.        |
| `debounceIfReducedMotionPreferredToo` | `boolean`   | `false` | Apply debounce even if user agent prefers reduced motion. |
| `unmountContentWhileResizing`         | `boolean`   | `false` | Remove main from DOM while resizing.                      |
| `disableCrossFade`                    | `boolean`   | `false` | Disable fade in and out of main and fallback content.     |

### Other exported helpers

- `useMedia`: Can be used to detect media query changes.
- `usePrefersReducedMotion`: Can be used to detect if user prefers reduced motion.
- `useDebounceResize`: Handles the logic of `<DebounceResize>` without visual effects.
