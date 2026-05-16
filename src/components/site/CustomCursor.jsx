import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const INTERACTION_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)';
const CURSOR_WRAP_SELECTOR = '[data-cursor-wrap="true"]';
const BASE_CURSOR_SIZE = 36;

const CURSOR_VARIANTS = {
  default: {
    ringScale: 1,
    glowScale: 1,
    ringOpacity: 0.88,
    glowOpacity: 0.12,
    coreScale: 1,
  },
  interactive: {
    ringScale: 1.28,
    glowScale: 1.18,
    ringOpacity: 0.98,
    glowOpacity: 0.16,
    coreScale: 0.92,
  },
  panel: {
    ringScale: 1.42,
    glowScale: 1.26,
    ringOpacity: 0.94,
    glowOpacity: 0.14,
    coreScale: 0.86,
  },
  wrap: {
    ringScale: 1.02,
    glowScale: 1.24,
    ringOpacity: 0.96,
    glowOpacity: 0.18,
    coreScale: 0.74,
  },
};

function getCursorVariant(target) {
  if (!(target instanceof Element)) {
    return 'default';
  }

  if (
    target.closest(
      'a, button, .project-details-trigger, input:not([type="hidden"]), textarea, select, summary, [data-cursor="interactive"]'
    )
  ) {
    return 'interactive';
  }

  if (target.closest('.project-card-shell, .interactive-outline, [role="button"]')) {
    return 'panel';
  }

  return 'default';
}

function getDistanceToRect(pointerX, pointerY, rect) {
  const dx = pointerX < rect.left ? rect.left - pointerX : pointerX > rect.right ? pointerX - rect.right : 0;
  const dy = pointerY < rect.top ? rect.top - pointerY : pointerY > rect.bottom ? pointerY - rect.bottom : 0;

  return Math.hypot(dx, dy);
}

function getWrapSnapshot(pointerX, pointerY) {
  if (typeof document === 'undefined') {
    return null;
  }

  const elements = document.querySelectorAll(CURSOR_WRAP_SELECTOR);
  let bestMatch = null;

  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    const rect = element.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }

    const proximity = Number(element.dataset.cursorProximity || 104);
    const distance = getDistanceToRect(pointerX, pointerY, rect);

    if (distance > proximity) {
      return;
    }

    const computedStyle = window.getComputedStyle(element);
    const padding = Number(
      element.dataset.cursorPadding || (rect.width <= 52 && rect.height <= 52 ? 7 : 10)
    );
    const radius = Number.parseFloat(computedStyle.borderTopLeftRadius) || Math.min(rect.width, rect.height) / 2;
    const progress = 1 - distance / proximity;
    const candidate = {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
      radius,
      padding,
      progress,
      distance,
    };

    if (!bestMatch || candidate.distance < bestMatch.distance) {
      bestMatch = candidate;
    }
  });

  return bestMatch;
}

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(INTERACTION_QUERY);
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveDataEnabled = Boolean(connection?.saveData);
    const lowBandwidth = typeof connection?.effectiveType === 'string' && /2g/.test(connection.effectiveType);
    const deviceMemory = navigator.deviceMemory ?? 4;
    const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
    const updateEnabled = () =>
      setEnabled(
        mediaQuery.matches &&
          !prefersReducedMotion &&
          !saveDataEnabled &&
          !lowBandwidth &&
          hardwareConcurrency >= 6 &&
          deviceMemory >= 4
      );

    updateEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabled);
      return () => mediaQuery.removeEventListener('change', updateEnabled);
    }

    mediaQuery.addListener(updateEnabled);
    return () => mediaQuery.removeListener(updateEnabled);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const root = document.documentElement;

    if (enabled) {
      root.classList.add('has-custom-cursor');
    } else {
      root.classList.remove('has-custom-cursor');
    }

    return () => root.classList.remove('has-custom-cursor');
  }, [enabled]);

  return enabled ? <CursorLayer /> : null;
}

function CursorLayer() {
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState('default');
  const [pressed, setPressed] = useState(false);
  const [wrapActive, setWrapActive] = useState(false);
  const variantRef = useRef('default');
  const visibleRef = useRef(false);
  const wrapActiveRef = useRef(false);

  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const glowXTarget = useMotionValue(-120);
  const glowYTarget = useMotionValue(-120);
  const ringWidthTarget = useMotionValue(BASE_CURSOR_SIZE);
  const ringHeightTarget = useMotionValue(BASE_CURSOR_SIZE);
  const ringRadiusTarget = useMotionValue(999);

  const glowX = useSpring(glowXTarget, { stiffness: 440, damping: 36, mass: 0.2 });
  const glowY = useSpring(glowYTarget, { stiffness: 440, damping: 36, mass: 0.2 });
  const ringWidth = useSpring(ringWidthTarget, { stiffness: 460, damping: 36, mass: 0.14 });
  const ringHeight = useSpring(ringHeightTarget, { stiffness: 460, damping: 36, mass: 0.14 });
  const ringRadius = useSpring(ringRadiusTarget, { stiffness: 420, damping: 32, mass: 0.18 });

  useEffect(() => {
    const updateGeometry = (pointerX, pointerY) => {
      const wrapSnapshot = getWrapSnapshot(pointerX, pointerY);
      const nextWrapActive = Boolean(wrapSnapshot);

      if (nextWrapActive !== wrapActiveRef.current) {
        wrapActiveRef.current = nextWrapActive;
        setWrapActive(nextWrapActive);
      }

      if (wrapSnapshot) {
        const wrappedX = pointerX + (wrapSnapshot.centerX - pointerX) * wrapSnapshot.progress;
        const wrappedY = pointerY + (wrapSnapshot.centerY - pointerY) * wrapSnapshot.progress;
        const wrappedWidth =
          BASE_CURSOR_SIZE +
          (wrapSnapshot.width + wrapSnapshot.padding * 2 - BASE_CURSOR_SIZE) * wrapSnapshot.progress;
        const wrappedHeight =
          BASE_CURSOR_SIZE +
          (wrapSnapshot.height + wrapSnapshot.padding * 2 - BASE_CURSOR_SIZE) * wrapSnapshot.progress;
        const wrappedRadius =
          999 + (wrapSnapshot.radius + wrapSnapshot.padding - 999) * Math.min(wrapSnapshot.progress * 1.08, 1);

        cursorX.set(wrappedX);
        cursorY.set(wrappedY);
        glowXTarget.set(pointerX + (wrapSnapshot.centerX - pointerX) * Math.min(wrapSnapshot.progress * 0.38, 0.38));
        glowYTarget.set(pointerY + (wrapSnapshot.centerY - pointerY) * Math.min(wrapSnapshot.progress * 0.38, 0.38));
        ringWidthTarget.set(wrappedWidth);
        ringHeightTarget.set(wrappedHeight);
        ringRadiusTarget.set(wrappedRadius);
      } else {
        cursorX.set(pointerX);
        cursorY.set(pointerY);
        glowXTarget.set(pointerX);
        glowYTarget.set(pointerY);
        ringWidthTarget.set(BASE_CURSOR_SIZE);
        ringHeightTarget.set(BASE_CURSOR_SIZE);
        ringRadiusTarget.set(999);
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const updateVariant = (target) => {
      const nextVariant = getCursorVariant(target);

      if (variantRef.current !== nextVariant) {
        variantRef.current = nextVariant;
        setVariant(nextVariant);
      }
    };

    const handlePointerMove = (event) => {
      updateGeometry(event.clientX, event.clientY);
      updateVariant(event.target);
    };

    const handlePointerDown = (event) => {
      setPressed(true);
      updateVariant(event.target);
    };

    const handlePointerUp = () => setPressed(false);

    const handlePointerLeave = () => {
      visibleRef.current = false;
      wrapActiveRef.current = false;
      setVisible(false);
      setPressed(false);
      setWrapActive(false);
      variantRef.current = 'default';
      setVariant('default');
      ringWidthTarget.set(BASE_CURSOR_SIZE);
      ringHeightTarget.set(BASE_CURSOR_SIZE);
      ringRadiusTarget.set(999);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('blur', handlePointerLeave);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('blur', handlePointerLeave);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [cursorX, cursorY, glowXTarget, glowYTarget, ringHeightTarget, ringRadiusTarget, ringWidthTarget]);

  const activeVariant =
    CURSOR_VARIANTS[wrapActive ? 'wrap' : variant] ?? CURSOR_VARIANTS.default;
  const ringScale = pressed ? activeVariant.ringScale * 0.92 : activeVariant.ringScale;
  const glowScale = pressed ? activeVariant.glowScale * 0.94 : activeVariant.glowScale;
  const coreScale = pressed ? activeVariant.coreScale * 0.84 : activeVariant.coreScale;

  return (
    <>
      <Motion.div
        aria-hidden="true"
        className="custom-cursor-glow pointer-events-none fixed left-0 top-0 z-[120] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x: glowX, y: glowY }}
        animate={{
          opacity: visible ? activeVariant.glowOpacity : 0,
          scale: visible ? glowScale : 0.72,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />

      <Motion.div
        aria-hidden="true"
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[121] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          width: ringWidth,
          height: ringHeight,
          borderRadius: ringRadius,
        }}
        animate={{
          opacity: visible ? activeVariant.ringOpacity : 0,
          scale: visible ? ringScale : 0.82,
        }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      >
        <Motion.span
          className="custom-cursor-core h-2 w-2 rounded-full"
          animate={{
            scale: visible ? coreScale : 0.7,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.08, ease: 'easeOut' }}
        />
      </Motion.div>
    </>
  );
}
