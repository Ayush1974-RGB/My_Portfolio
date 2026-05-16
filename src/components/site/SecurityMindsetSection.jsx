import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import ScrollScene from './ScrollScene';
import SectionHeading from './SectionHeading';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem } from './motion';

function SecurityMindsetSection({ securityFocus }) {
  return (
    <section id="security" className="section-space relative overflow-hidden">
      <div className="section-shell relative">
        <div className="security-grid-glow pointer-events-none absolute inset-x-0 top-10 h-[24rem]" />

        <ScrollScene intensity="subtle">
          <div className="security-shell surface-panel-strong relative overflow-hidden rounded-[2.5rem] p-7 sm:p-9 lg:p-11">
            <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="absolute right-10 top-10 h-28 w-28 rounded-full border border-accent/18" />
            <div className="absolute right-14 top-14 h-20 w-20 rounded-full border border-border" />

            <SectionHeading
              label={securityFocus.label}
              title={securityFocus.title}
              description={securityFocus.introduction}
            />

            <div className="mt-10 flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
              {securityFocus.items.map((item, index) => (
                <div key={item.title} className="inline-flex items-center gap-3 rounded-full border border-border bg-background/72 px-3 py-1.5">
                  <span>{item.title}</span>
                  {index < securityFocus.items.length - 1 ? (
                    <span className="h-px w-6 bg-gradient-to-r from-accent/60 to-transparent" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>

            <StaggerGroup className="mt-16 grid gap-5 lg:grid-cols-2" stagger={0.08}>
              {securityFocus.items.map((item, index) => (
                <Motion.div key={item.title} variants={createStaggerItem(18, 0.46)} className="h-full">
                  <Motion.article
                    whileHover={{ y: -4, scale: 1.006 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className={`security-card interactive-outline relative h-full overflow-hidden rounded-[1.8rem] p-5 sm:p-6 ${
                      index === 0 ? 'lg:translate-y-3' : index === 3 ? 'lg:translate-y-4' : ''
                    } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1`}
                  >
                    <span aria-hidden="true" className="security-card-scan" />
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 text-[2.3rem] font-bold tracking-[-0.12em] text-foreground/[0.08]"
                    >
                      0{index + 1}
                    </span>

                    <div className="relative z-10">
                      <span className="eyebrow">{item.eyebrow}</span>
                      <h3 className="mt-5 max-w-[15ch] text-[1.8rem] font-bold leading-[0.92] tracking-[-0.055em] text-foreground sm:text-[2rem]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-[28rem] text-sm leading-7 text-foreground-muted sm:text-[1rem]">
                        {item.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        <span>Trust boundary {index + 1}</span>
                      </div>
                    </div>
                  </Motion.article>
                </Motion.div>
              ))}
            </StaggerGroup>
          </div>
        </ScrollScene>
      </div>
    </section>
  );
}

export default memo(SecurityMindsetSection);
