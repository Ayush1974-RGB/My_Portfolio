import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import Reveal from './Reveal';
import StaggerGroup from './StaggerGroup';
import TextReveal from './TextReveal';
import { createStaggerItem } from './motion';

function KeyHighlightsSection({ keyHighlights }) {
  return (
    <section id="highlights" className="deferred-section section-space pt-12 sm:pt-14 lg:pt-16">
      <div className="section-shell">
        <Reveal
          className="max-w-[44rem]"
          staggerChildren={0.08}
          delayChildren={0.04}
          distance={18}
          duration={0.46}
        >
          <Reveal.Item>
            <span className="eyebrow">{keyHighlights.label}</span>
          </Reveal.Item>

          <Reveal.Item>
            <TextReveal
              as="h2"
              text={keyHighlights.title}
              split="words"
              stagger={0.045}
              className="mt-6 max-w-[16ch] text-balance text-[clamp(2.15rem,8vw,4.3rem)] font-bold leading-[0.94] tracking-[-0.06em] text-foreground sm:mt-7"
            />
          </Reveal.Item>

          <Reveal.Item>
            <p className="mt-7 max-w-[31rem] text-[1rem] leading-[1.82] text-foreground-muted sm:text-[1.05rem]">
              {keyHighlights.description}
            </p>
          </Reveal.Item>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted sm:mt-9">
          <span className="rounded-full border border-border bg-background/72 px-3 py-1.5">Fast read</span>
          <span className="h-px w-12 bg-gradient-to-r from-accent/50 to-transparent" aria-hidden="true" />
          <span>Signals that explain the work before the projects even open.</span>
        </div>

        <StaggerGroup className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4" stagger={0.07}>
          {keyHighlights.items.map((item, index) => (
            <Motion.div key={item.label} variants={createStaggerItem(18, 0.46)} className="h-full">
              <Motion.article
                whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={`key-highlight-card key-highlight-card--stacked interactive-outline h-full rounded-[1.9rem] px-5 py-6 ${
                  index === 0
                    ? 'xl:translate-y-1 xl:-rotate-[0.6deg]'
                    : index === 1
                      ? 'xl:-translate-y-2 xl:rotate-[0.45deg]'
                      : index === 2
                        ? 'xl:translate-y-2 xl:-rotate-[0.4deg]'
                        : 'xl:translate-y-0.5 xl:rotate-[0.65deg]'
                }`}
              >
                <div className="key-highlight-beam" aria-hidden="true" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
                  Signal 0{index + 1}
                </span>
                <AnimatedCounter
                  value={item.value}
                  className="mt-4 block text-[2.3rem] font-bold leading-none tracking-[-0.06em] text-foreground sm:text-[2.7rem]"
                />
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  {item.label}
                </p>
                <p className="mt-5 max-w-[22rem] text-sm leading-6 text-foreground-muted">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[0.72rem] font-medium text-foreground-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>Readable in one glance</span>
                </div>
              </Motion.article>
            </Motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export default memo(KeyHighlightsSection);
