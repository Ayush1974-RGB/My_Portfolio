import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const THEME_KEY = 'portfolio-theme';
const THEME_TRANSITION_CLASS = 'theme-transitioning';
const THEME_TRANSITION_DURATION = 420;
const THEME_TRANSITION_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const THEME_VIEW_TRANSITION_CLASS = 'theme-view-transitioning';
const THEME_COLOR_META_SELECTOR = 'meta[name="theme-color"][data-dynamic-theme-color]';
const THEME_COLOR_BY_THEME = {
  light: '#F8FAFC',
  dark: '#020617',
};
let themeTransitionTimeoutId = null;

function getStoredTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY);
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
}

function getPreferredTheme() {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

function syncThemeColorMeta(theme) {
  if (typeof document === 'undefined') {
    return;
  }

  let metaTag = document.querySelector(THEME_COLOR_META_SELECTOR);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'theme-color');
    metaTag.setAttribute('data-dynamic-theme-color', 'true');
    document.head.append(metaTag);
  }

  metaTag.setAttribute('content', THEME_COLOR_BY_THEME[theme] ?? THEME_COLOR_BY_THEME.light);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  syncThemeColorMeta(theme);
}

function supportsViewTransition() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return false;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  return typeof document.startViewTransition === 'function';
}

function getThemeTransitionOrigin(event) {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }

  const target = event?.currentTarget;

  if (!(target instanceof HTMLElement)) {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  }

  const bounds = target.getBoundingClientRect();

  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  };
}

function animateThemeReveal(origin) {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const revealRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  root.animate(
    {
      clipPath: [
        `circle(1.5rem at ${x}px ${y}px)`,
        `circle(${revealRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: THEME_TRANSITION_DURATION,
      easing: THEME_TRANSITION_EASE,
      pseudoElement: '::view-transition-new(root)',
    }
  );
}

function beginThemeTransition() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const root = document.documentElement;
  root.classList.add(THEME_TRANSITION_CLASS);
  root.getBoundingClientRect();

  if (themeTransitionTimeoutId) {
    window.clearTimeout(themeTransitionTimeoutId);
  }

  themeTransitionTimeoutId = window.setTimeout(() => {
    root.classList.remove(THEME_TRANSITION_CLASS);
    themeTransitionTimeoutId = null;
  }, THEME_TRANSITION_DURATION + 80);
}

export function initializeTheme() {
  if (typeof document === 'undefined') {
    return;
  }

  applyTheme(getPreferredTheme());
}

export function useTheme() {
  const [theme, setTheme] = useState(getPreferredTheme);
  const [hasManualPreference, setHasManualPreference] = useState(() => getStoredTheme() !== null);
  const hasMountedRef = useRef(false);
  const previousThemeRef = useRef(theme);
  const transitionModeRef = useRef('none');

  useLayoutEffect(() => {
    const themeChanged = hasMountedRef.current && previousThemeRef.current !== theme;

    if (themeChanged && transitionModeRef.current !== 'view') {
      beginThemeTransition();
    }

    applyTheme(theme);
    previousThemeRef.current = theme;
    hasMountedRef.current = true;
    transitionModeRef.current = 'none';

    if (hasManualPreference) {
      window.localStorage.setItem(THEME_KEY, theme);
    } else {
      window.localStorage.removeItem(THEME_KEY);
    }
  }, [theme, hasManualPreference]);

  useEffect(
    () => () => {
      if (themeTransitionTimeoutId && typeof window !== 'undefined') {
        window.clearTimeout(themeTransitionTimeoutId);
        themeTransitionTimeoutId = null;
      }
    },
    []
  );

  useEffect(() => {
    if (hasManualPreference || typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [hasManualPreference]);

  const toggleTheme = useCallback((event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const transitionOrigin = getThemeTransitionOrigin(event);

    const commitThemeChange = (mode) => {
      transitionModeRef.current = mode;

      flushSync(() => {
        setHasManualPreference(true);
        setTheme(nextTheme);
      });

      applyTheme(nextTheme);
    };

    if (supportsViewTransition()) {
      const root = document.documentElement;
      root.classList.add(THEME_VIEW_TRANSITION_CLASS);

      const viewTransition = document.startViewTransition(() => {
        commitThemeChange('view');
      });

      viewTransition.ready
        .then(() => {
          animateThemeReveal(transitionOrigin);
        })
        .catch(() => {});

      viewTransition.finished.finally(() => {
        root.classList.remove(THEME_VIEW_TRANSITION_CLASS);
      });

      return;
    }

    commitThemeChange('css');
  }, [theme]);

  return useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
    }),
    [theme, toggleTheme]
  );
}
