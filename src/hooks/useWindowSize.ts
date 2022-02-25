import { useEffect, useState } from 'react';

export interface WindowInfo {
  width?: number;
  height?: number;
  isHorizontal: boolean;
}

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowInfo, setWindowInfo] = useState<WindowInfo>({
    width: undefined,
    height: undefined,
    isHorizontal: true
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      console.log('resize');
      // Set window width/height to state
      setWindowInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        isHorizontal: window.innerWidth > window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowInfo;
};
