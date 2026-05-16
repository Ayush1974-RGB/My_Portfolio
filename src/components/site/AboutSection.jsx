import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import TextScrubBlock from './TextScrubBlock';
import { staggerList, listItem } from '../../animations/variants';

function AboutSection({ about }) {
  return (
    <section id="about" className="deferred-section section-space relative overflow-hidden">
      <div className="section-shell relative">
        <SectionHeading
          label={about.label}
          title={about.title}
          description={about.introduction}
          centered
        />

        <div className="mt-12 sm:mt-16">
          <Reveal>
            <div className="surface-panel about-panel relative overflow-hidden rounded-[2rem] p-5 sm:rounded-[2.3rem] sm:p-9 lg:p-11">
              <Motion.div
                aria-hidden="true"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="about-grid-sweep"
              />

              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <div className="editorial-line mb-7 sm:mb-8" />
                  <p className="max-w-[24rem] text-balance font-editorial text-[1.55rem] italic leading-[1.1] text-foreground sm:text-[2.15rem]">
                    {about.mantra}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2.5 sm:mt-8">
                    {about.facts.map((fact) => (
                      <span
                        key={fact.label}
                        className="rounded-full border border-border bg-background/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted"
                      >
                        {fact.label}: {fact.value}
                      </span>
                    ))}
                  </div>

                  <TextScrubBlock
                    items={about.paragraphs}
                    className="mt-8 grid max-w-[33rem] gap-6 sm:mt-10 sm:gap-7"
                    itemClassName="text-[1rem] leading-[1.82] sm:text-[1.04rem]"
                  />
                </div>

                <Motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  className="about-blueprint-shell rounded-[1.75rem] border border-border bg-background/72 p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow !mb-0">System Blueprint</span>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground/[0.12]">
                      {about.watermark}
                    </span>
                  </div>

                  <div className="about-blueprint-diagram mt-6">
                    <span className="about-blueprint-ring about-blueprint-ring--outer" />
                    <span className="about-blueprint-ring about-blueprint-ring--inner" />
                    <span className="about-blueprint-axis about-blueprint-axis--horizontal" />
                    <span className="about-blueprint-axis about-blueprint-axis--vertical" />
                    <span className="about-blueprint-node about-blueprint-node--core" />
                    <span className="about-blueprint-node about-blueprint-node--edge" />
                  </div>

                  <div className="mt-6 grid gap-3">
                    {about.strengths.map((strength, index) => (
                      <div
                        key={strength.title}
                        className="rounded-[1.2rem] border border-border bg-background/80 px-4 py-3"
                      >
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                          Layer 0{index + 1}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-foreground">{strength.title}</p>
                      </div>
                    ))}
                  </div>
                </Motion.div>
              </div>

              <Motion.div
                variants={staggerList({ staggerChildren: 0.08, delayChildren: 0.1 })}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="about-strengths-grid mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-5 xl:grid-cols-3"
              >
                {about.strengths.map((strength, index) => (
                  <Motion.article
                    key={strength.title}
                    variants={listItem()}
                    whileHover={{ y: -4, scale: 1.006 }}
                    className={`about-strength-card rounded-[1.45rem] border p-5 sm:rounded-[1.6rem] sm:p-6 ${
                      index === 1
                        ? 'border-accent/28 bg-accent/[0.08] text-foreground shadow-[0_18px_42px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)]'
                        : 'border-border bg-background/70'
                    } ${index === 0 ? 'xl:translate-y-2' : index === 2 ? 'xl:translate-y-4' : ''}`}
                  >
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                      0{index + 1}
                    </span>
                    <h3
                      className={`mt-4 text-[1.02rem] font-bold tracking-[-0.03em] ${
                        index === 1 ? 'text-accent' : 'text-foreground'
                      }`}
                    >
                      {strength.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-foreground-muted">
                      {strength.description}
                    </p>
                  </Motion.article>
                ))}
              </Motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);
