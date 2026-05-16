import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

function parseCounterValue(value) {
  const stringValue = String(value ?? '');
  const match = stringValue.match(/(\d+)/);

  if (!match) {
    return {
      prefix: '',
      suffix: '',
      target: 0,
      padLength: 0,
      raw: stringValue,
    };
  }

  const digits = match[1];
  const index = match.index ?? 0;

  return {
    prefix: stringValue.slice(0, index),
    suffix: stringValue.slice(index + digits.length),
    target: Number.parseInt(digits, 10),
    padLength: digits.length,
    raw: stringValue,
  };
}

function AnimatedCounter({ value, className = '' }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.18, margin: '0px 0px -8% 0px' });
  const [displayValue, setDisplayValue] = useState(0);

  const parsedValue = useMemo(() => parseCounterValue(value), [value]);

  useEffect(() => {
    if (reduceMotion || parsedValue.padLength === 0 || !isInView) {
      return undefined;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 980;

    const tick = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(parsedValue.target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, parsedValue.padLength, parsedValue.target, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || parsedValue.padLength === 0 || isInView) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setDisplayValue(parsedValue.target);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [isInView, parsedValue.padLength, parsedValue.target, reduceMotion]);

  if (parsedValue.padLength === 0) {
    return (
      <span ref={ref} className={className}>
        {parsedValue.raw}
      </span>
    );
  }

  const resolvedValue = reduceMotion ? parsedValue.target : displayValue;

  const formattedValue = `${parsedValue.prefix}${resolvedValue
    .toString()
    .padStart(parsedValue.padLength, '0')}${parsedValue.suffix}`;

  return (
    <span ref={ref} className={className}>
      {formattedValue}
    </span>
  );
}

export default memo(AnimatedCounter);
