import * as React from "react"
import { useDebounce } from "./use-debounce"

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const

interface MobileState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isPortrait: boolean
  isTouch: boolean
  viewport: {
    width: number
    height: number
  }
}

export function useIsMobile() {
  const [state, setState] = React.useState<MobileState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isPortrait: false,
    isTouch: false,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  })

  const debouncedWidth = useDebounce(state.viewport.width, 100)

  React.useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setState({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
        isDesktop: width >= BREAKPOINTS.desktop,
        isPortrait: height > width,
        isTouch: 'ontouchstart' in window,
        viewport: { width, height }
      })
    }

    updateState()
    window.addEventListener('resize', updateState)
    window.addEventListener('orientationchange', updateState)

    return () => {
      window.removeEventListener('resize', updateState)
      window.removeEventListener('orientationchange', updateState)
    }
  }, [])

  return state
}