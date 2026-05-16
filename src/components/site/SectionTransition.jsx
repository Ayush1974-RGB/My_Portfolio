import { memo } from 'react';
import Reveal from './Reveal';

function SectionTransition({ step, title, variant = 'signal' }) {
  return (
    <div className="section-shell py-5 sm:py-6 lg:py-8">
      <Reveal className={`section-transition-shell section-transition-shell--${variant} mx-auto max-w-4xl text-center`}>
        <div className="section-transition-topology" aria-hidden="true">
          <span className="section-transition-node" />
          <span className="section-transition-line" />
          <span className="section-transition-node section-transition-node--trailing" />
        </div>
        <div className="section-transition-slits" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="section-transition-step">{step}</span>
        <p className="max-w-2xl text-sm leading-7 text-foreground-muted sm:text-[0.98rem]">
          {title}
        </p>
      </Reveal>
    </div>
  );
}

export default memo(SectionTransition);
