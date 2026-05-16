export const MOTION_EASE = [0.22, 1, 0.36, 1];
export const MOTION_DURATION = 0.58;
export const MOTION_DISTANCE = 28;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeDuration(duration = MOTION_DURATION) {
  return clamp(duration, 0.5, 0.7);
}

function normalizeDistance(distance = MOTION_DISTANCE) {
  return clamp(distance, 20, 40);
}

export function fadeUp({
  distance = MOTION_DISTANCE,
  duration = MOTION_DURATION,
  delay = 0,
  blur = 0,
} = {}) {
  const resolvedDistance = normalizeDistance(distance);
  const resolvedDuration = normalizeDuration(duration);

  return {
    hidden: {
      opacity: 0,
      y: resolvedDistance,
      ...(blur ? { filter: `blur(${blur}px)` } : {}),
    },
    show: {
      opacity: 1,
      y: 0,
      ...(blur ? { filter: 'blur(0px)' } : {}),
      transition: {
        duration: resolvedDuration,
        delay,
        ease: MOTION_EASE,
      },
    },
    exit: {
      opacity: 0,
      y: Math.max(12, resolvedDistance * 0.45),
      transition: {
        duration: clamp(resolvedDuration * 0.62, 0.28, 0.42),
        ease: MOTION_EASE,
      },
    },
  };
}

export function fadeIn({ duration = MOTION_DURATION, delay = 0 } = {}) {
  const resolvedDuration = normalizeDuration(duration);

  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: resolvedDuration,
        delay,
        ease: MOTION_EASE,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: clamp(resolvedDuration * 0.58, 0.24, 0.4),
        ease: MOTION_EASE,
      },
    },
  };
}

export function staggerContainer({
  staggerChildren = 0.08,
  delayChildren = 0,
  delay = 0,
} = {}) {
  return {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function scaleSoft({
  scale = 1.024,
  duration = 0.34,
  y = -6,
  borderGlow = false,
} = {}) {
  return {
    rest: {
      scale: 1,
      y: 0,
      filter: 'brightness(1)',
    },
    hover: {
      scale,
      y,
      filter: borderGlow ? 'brightness(1.015)' : 'brightness(1)',
      transition: {
        duration: clamp(duration, 0.24, 0.4),
        ease: MOTION_EASE,
      },
    },
    tap: {
      scale: 0.992,
      y: Math.min(0, y * 0.22),
      transition: {
        duration: 0.18,
        ease: MOTION_EASE,
      },
    },
  };
}

// Button spring animation with ripple effect
export function buttonSpring({ duration = 0.28 } = {}) {
  return {
    rest: {
      scale: 1,
      boxShadow: '0 0 0 0px rgba(11, 58, 164, 0)',
    },
    hover: {
      scale: 1.008,
      transition: {
        duration: clamp(duration, 0.2, 0.35),
        ease: MOTION_EASE,
      },
    },
    tap: {
      scale: 0.96,
      boxShadow: '0 0 0 8px rgba(11, 58, 164, 0.1)',
      transition: {
        duration: 0.14,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };
}

// Scroll-triggered reveal animation
export function scrollReveal({
  distance = 24,
  duration = 0.56,
  delay = 0,
} = {}) {
  const resolvedDistance = normalizeDistance(distance);
  const resolvedDuration = normalizeDuration(duration);

  return {
    hidden: {
      opacity: 0,
      y: resolvedDistance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: resolvedDuration,
        delay,
        ease: MOTION_EASE,
      },
    },
  };
}

// Staggered list container for staggering children
export function staggerList({
  staggerChildren = 0.06,
  delayChildren = 0,
  duration = 0.48,
} = {}) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: clamp(staggerChildren, 0.04, 0.12),
        delayChildren,
        duration,
      },
    },
  };
}

// Individual list item animation
export function listItem({ duration = 0.48 } = {}) {
  const resolvedDuration = normalizeDuration(duration);

  return {
    hidden: {
      opacity: 0,
      x: -16,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: resolvedDuration,
        ease: MOTION_EASE,
      },
    },
  };
}

// Card hover with depth
export function cardDepth({
  scale = 1.032,
  y = -8,
  duration = 0.36,
  shadowIntensity = 1,
} = {}) {
  return {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    hover: {
      scale,
      y,
      boxShadow: `0 12px 32px rgba(0, 0, 0, ${0.12 * shadowIntensity})`,
      transition: {
        duration: clamp(duration, 0.24, 0.44),
        ease: MOTION_EASE,
      },
    },
  };
}

// Gradient shift animation (for hover effects)
export function gradientShift({ duration = 0.48 } = {}) {
  return {
    rest: {
      backgroundPosition: '0% center',
    },
    hover: {
      backgroundPosition: '100% center',
      transition: {
        duration: clamp(duration, 0.32, 0.58),
        ease: MOTION_EASE,
      },
    },
  };
}

// Skeleton loader shimmer animation
export function shimmer() {
  return {
    animate: {
      backgroundPosition: ['200% center', '-200% center'],
      transition: {
        duration: 2,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };
}

// Floating animation for elements
export function float({
  distance = 8,
  duration = 3,
  delay = 0,
} = {}) {
  return {
    animate: {
      y: [0, -distance, 0],
      transition: {
        duration: clamp(duration, 2, 4),
        ease: 'easeInOut',
        repeat: Infinity,
        delay,
      },
    },
  };
}
