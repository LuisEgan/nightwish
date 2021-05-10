import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { WINDOW_BREAKPOINTS } from "./constants";

export interface IWindowSize {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean | undefined;
  isLandscape: boolean | undefined;
}
export const useWindowSize = (): IWindowSize => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
    isMobile: undefined,
    isLandscape: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: isMobile || window.innerWidth < WINDOW_BREAKPOINTS.md,
        isLandscape:
          +window.screen.orientation.angle === 90 ||
          +window.screen.orientation.angle === -90,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
