import * as React from "react";
import { useDebounce } from "./use-debounce";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const;

interface MobileState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isTouch: boolean;
  viewport: {
    width: number;
    height: number;
  };
}

export function useIsMobile() {
  const [state, setState] = React.useState<MobileState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isPortrait: false,
    isTouch: false,
    viewport: {
      width: 0,
      height: 0
    }
  });

  React.useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;
      setState({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
        isDesktop: width >= BREAKPOINTS.desktop,
        isPortrait: window.matchMedia("(orientation: portrait)").matches,
        isTouch: 'ontouchstart' in window,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    };

    const debouncedUpdate = useDebounce(updateState, 250);

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', updateState);
    updateState();

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', updateState);
    };
  }, []);

  return state;
}

// Type exports
export type { MobileState };
export { BREAKPOINTS };