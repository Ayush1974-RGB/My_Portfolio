import { memo } from 'react';
import Reveal from './Reveal';
import TextReveal from './TextReveal';

function SectionHeading({
  label,
  title,
  description,
  centered = false,
  containerClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  return (
    <div className={`${centered ? 'mx-auto max-w-[43rem] text-center' : 'max-w-[43rem]'} ${containerClassName}`.trim()}>
      <Reveal distance={20} duration={0.58}>
        <div className={`section-kicker ${centered ? 'justify-center' : ''}`}>
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        split="words"
        delayChildren={0.06}
        stagger={0.045}
        className={`mt-5 max-w-[16ch] text-balance text-[clamp(2.05rem,8vw,5.35rem)] font-bold leading-[0.94] tracking-[-0.06em] text-foreground sm:mt-6 ${
          centered ? 'mx-auto' : ''
        } ${titleClassName}`.trim()}
      />

      {description ? (
        <Reveal delay={0.12} distance={20} duration={0.58}>
          <p
            className={`mt-6 max-w-[30rem] text-[0.98rem] leading-[1.8] text-foreground-muted sm:mt-7 sm:text-[1.06rem] ${
              centered ? 'mx-auto' : ''
            } ${descriptionClassName}`.trim()}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export default memo(SectionHeading);
