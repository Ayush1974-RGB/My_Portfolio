import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const INTERACTION_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1024px)';

function getDistanceToRect(pointerX, pointerY, bounds) {
  const dx =
    pointerX < bounds.left ? bounds.left - pointerX : pointerX > bounds.right ? pointerX - bounds.right : 0;
  const dy =
    pointerY < bounds.top ? bounds.top - pointerY : pointerY > bounds.bottom ? pointerY - bounds.bottom : 0;

  return Math.hypot(dx, dy);
}

export default function Magnetic({
  children,
  className = '',
  strength = 7,
  proximity = false,
  proximityRadius = 118,
  proximityStrength,
}) {
  const elementRef = useRef(null);
  const hoverRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.48 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, { stiffness: 200, damping: 22, mass: 0.42 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(INTERACTION_QUERY);
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();

    mediaQuery.addEventListener('change', updateEnabled);
    return () => mediaQuery.removeEventListener('change', updateEnabled);
  }, []);

  const isInteractive = enabled && !prefersReducedMotion;

  const resetPosition = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [scale, x, y]);

  const setPressScale = () => {
    scale.set(isInteractive ? 0.996 : 0.99);
  };

  const setRestingScale = () => {
    scale.set(isInteractive ? 1.008 : 1);
  };

  const setMagneticOffset = useCallback((clientX, clientY, intensity) => {
    if (!elementRef.current) {
      return;
    }

    const bounds = elementRef.current.getBoundingClientRect();
    const offsetX = clientX - (bounds.left + bounds.width / 2);
    const offsetY = clientY - (bounds.top + bounds.height / 2);
    const maxShiftX = Math.max(bounds.width * 0.14, 10);
    const maxShiftY = Math.max(bounds.height * 0.14, 10);
    const nextX = Math.max(-maxShiftX, Math.min(maxShiftX, (offsetX / bounds.width) * intensity * 2.4));
    const nextY = Math.max(-maxShiftY, Math.min(maxShiftY, (offsetY / bounds.height) * intensity * 2.4));

    x.set(nextX);
    y.set(nextY);
  }, [x, y]);

  const handleMouseMove = (event) => {
    if (!isInteractive || !elementRef.current) {
      return;
    }

    setMagneticOffset(event.clientX, event.clientY, strength + 4);
    scale.set(1.014);
  };

  useEffect(() => {
    if (!isInteractive || !proximity) {
      resetPosition();
      return undefined;
    }

    const handlePointerMove = (event) => {
      if (hoverRef.current || !elementRef.current) {
        return;
      }

      const bounds = elementRef.current.getBoundingClientRect();
      const distance = getDistanceToRect(event.clientX, event.clientY, bounds);

      if (distance > proximityRadius) {
        resetPosition();
        return;
      }

      const intensity = 1 - distance / proximityRadius;
      const appliedStrength = (proximityStrength ?? strength * 1.45) * (0.32 + intensity);

      setMagneticOffset(event.clientX, event.clientY, appliedStrength);
      scale.set(1 + intensity * 0.028);
    };

    const handleWindowLeave = () => {
      if (!hoverRef.current) {
        resetPosition();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', handleWindowLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', handleWindowLeave);
    };
  }, [isInteractive, proximity, proximityRadius, proximityStrength, resetPosition, scale, setMagneticOffset, strength]);

  return (
    <Motion.div
      ref={elementRef}
      className={`magnetic-shell ${className}`.trim()}
      style={isInteractive ? { x: springX, y: springY, scale: springScale } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        hoverRef.current = true;
        if (isInteractive) {
          scale.set(1.014);
        }
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        resetPosition();
      }}
      onPointerDownCapture={setPressScale}
      onPointerUpCapture={setRestingScale}
      onPointerCancel={resetPosition}
      onFocusCapture={resetPosition}
      onBlurCapture={resetPosition}
    >
      {children}
    </Motion.div>
  );
}
