import { useEffect, useState } from 'react';

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const checkTouch = () => {
      const isTouch =
        () => !!(
          navigator.maxTouchPoints ||
          navigator.msMaxTouchPoints ||
          (window.matchMedia && window.matchMedia('(pointer:coarse)').matches)
        );

      setIsTouchDevice(isTouch());
    };

    checkTouch();
    window.addEventListener('orientationchange', checkTouch);
    return () => window.removeEventListener('orientationchange', checkTouch);
  }, []);

  return isTouchDevice;
}
