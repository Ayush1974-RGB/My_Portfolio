import { memo, useRef } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

function ScrubParagraph({ progress, start, end, text, className, theme }) {
  const inactiveColor =
    theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(75, 85, 99, 0.6)';
  const activeColor =
    theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.96)';
  const opacityTransform = useTransform(
    progress,
    [Math.max(0, start - 0.08), start, end],
    [0.42, 0.72, 1]
  );
  const y = useTransform(progress, [Math.max(0, start - 0.08), end], [18, 0]);
  const colorTransform = useTransform(progress, [start, end], [inactiveColor, activeColor]);
  const opacity = theme === 'dark' ? 1 : opacityTransform;
  const color = theme === 'dark' ? 'rgba(255, 255, 255, 1)' : colorTransform;

  return (
    <Motion.p className={className} style={{ opacity, y, color }}>
      {text}
    </Motion.p>
  );
}

function TextScrubBlock({ items, className = '', itemClassName = '' }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 28%'],
  });

  return (
    <div ref={ref} className={className}>
      {items.map((item, index) => {
        const total = Math.max(items.length - 1, 1);
        const start = total === 0 ? 0 : index * (0.68 / total);
        const end = Math.min(1, start + 0.34);

        if (reduceMotion) {
          return (
            <p key={item} className={itemClassName}>
              {item}
            </p>
          );
        }

        return (
          <ScrubParagraph
            key={item}
            progress={scrollYProgress}
            start={start}
            end={end}
            text={item}
            className={itemClassName}
            theme={theme}
          />
        );
      })}
    </div>
  );
}

export default memo(TextScrubBlock);
