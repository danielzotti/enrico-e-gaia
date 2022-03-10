import { useEffect, useState } from 'react';

export interface WindowInfo {
  width?: number;
  height?: number;
  isHorizontal: boolean;
  isMobile: boolean;
}

const getWindowInfo = (mobileSize: number) => {
  const isHorizontal = window.innerWidth > window.innerHeight;
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    isHorizontal,
    isMobile: mobileSize > width
  };
};

export const useWindowSize = (mobileSize = 500) => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowInfo, setWindowInfo] = useState<WindowInfo>(getWindowInfo(mobileSize));
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowInfo(getWindowInfo(mobileSize));
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileSize]); // Empty array ensures that effect is only run on mount
  return windowInfo;
};
