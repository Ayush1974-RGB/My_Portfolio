import { memo, useMemo, useRef } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import StickySplitSection from './StickySplitSection';

function ExperienceSection({ experience }) {
  const timelineRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const signalStats = useMemo(() => {
    if (experience.signalStats?.length) {
      return experience.signalStats;
    }

    return [
      {
        label: 'Credentials',
        value: experience.credentials.length,
        valueClassName: 'text-foreground',
      },
      {
        label: 'Timeline Signals',
        value: experience.timeline.length,
        valueClassName: 'text-accent',
      },
    ];
  }, [experience.credentials.length, experience.signalStats, experience.timeline.length]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.82', 'end 0.22'],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.34,
  });

  const cardVariants = prefersReducedMotion
    ? {
        inactive: { opacity: 1, scale: 1, y: 0 },
        active: { opacity: 1, scale: 1, y: 0 },
      }
    : {
        inactive: {
          opacity: 0.4,
          scale: 0.985,
          y: 12,
          borderColor: 'rgba(15, 23, 42, 0.08)',
          boxShadow: '0 10px 28px rgba(15, 23, 42, 0.04)',
          transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
        },
        active: {
          opacity: 1,
          scale: 1,
          y: 0,
          borderColor: 'rgba(11, 58, 164, 0.2)',
          boxShadow:
            '0 24px 54px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(11, 58, 164, 0.12)',
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const dotVariants = prefersReducedMotion
    ? {
        inactive: { scale: 1, opacity: 1 },
        active: { scale: 1, opacity: 1 },
      }
    : {
        inactive: {
          scale: 0.92,
          opacity: 0.72,
          boxShadow: '0 0 0 1px rgba(11, 58, 164, 0.12)',
          transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
        },
        active: {
          scale: 1.14,
          opacity: 1,
          boxShadow: '0 0 0 4px rgba(11, 58, 164, 0.08), 0 0 20px rgba(11, 58, 164, 0.24)',
          transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const pointVariants = prefersReducedMotion
    ? {
        inactive: { opacity: 1, y: 0 },
        active: { opacity: 1, y: 0 },
      }
    : {
        inactive: { opacity: 0.52, y: 8 },
        active: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.32,
            staggerChildren: 0.06,
            delayChildren: 0.04,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <section id="experience" className="section-space">
      <div className="section-shell">
        <StickySplitSection
          columnsClassName="xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]"
          stickyTopClassName="xl:top-28"
          leftContent={
            <div className="space-y-5 sm:space-y-6 lg:pr-6">
              <SectionHeading
                label={experience.label}
                title={experience.title}
                description={experience.introduction}
              />

              <Reveal delay={0.08}>
                <div className="surface-panel-strong interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.1rem] sm:p-7">
                  <span className="eyebrow">Signals beyond projects</span>
                  <h3 className="mt-5 max-w-[15ch] text-[1.6rem] font-bold leading-[1] tracking-[-0.04em] text-foreground sm:text-[1.85rem]">
                    {experience.sidebarTitle ?? 'Experience and credentials shaping my direction.'}
                  </h3>
                  <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-[1.78] text-foreground-muted">
                    {experience.sidebarDescription ??
                      'The timeline on the right captures applied work, while these supporting signals show where I am contributing and building technical depth.'}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {signalStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="experience-signal-card rounded-[1.45rem] border border-border bg-background/72 p-4"
                      >
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                          {stat.label}
                        </span>
                        <div className="experience-count-shell mt-3">
                          <span aria-hidden="true" className="experience-signal-pulse" />
                          <AnimatedCounter
                            value={stat.value.toString().padStart(2, '0')}
                            className={`experience-count-value text-2xl font-bold tracking-[-0.05em] ${stat.valueClassName}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="surface-panel-strong interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.1rem] sm:p-7">
                  <span className="eyebrow">Credentials</span>
                  <h3 className="mt-5 max-w-[15ch] text-[1.65rem] font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[1.95rem]">
                    Certifications and focused technical learning.
                  </h3>
                  <p className="mt-5 max-w-[22rem] font-editorial text-[1.35rem] italic leading-[1.08] text-foreground-muted sm:text-[1.7rem]">
                    Signals of curiosity across AI, privacy, data protection, and modern engineering workflows.
                  </p>
                  <div className="mt-6 space-y-3">
                    {experience.credentials.map((credential) => (
                      <div
                        key={credential}
                        className="rounded-[1.3rem] border border-border bg-background/68 px-4 py-3 text-sm font-medium text-foreground"
                      >
                        {credential}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="surface-panel interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.1rem] sm:p-7">
                  <span className="eyebrow">Communities</span>
                  <h3 className="mt-5 max-w-[15ch] text-[1.55rem] font-bold leading-[1] tracking-[-0.04em] text-foreground sm:text-[1.8rem]">
                    Technical groups where I build, contribute, and keep learning.
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {experience.associations.map((association) => (
                      <span
                        key={association}
                        className="rounded-full border border-border bg-background/68 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted"
                      >
                        {association}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          }
          rightContent={
            <div ref={timelineRef} className="relative pl-5 sm:pl-9 md:pl-10">
              <div className="pointer-events-none absolute bottom-0 left-[0.32rem] top-2 w-px bg-slate-200/90 sm:left-3" />
              <Motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-[0.28rem] top-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#0B3AA4] via-[#3D70E4] to-[#7AA2FF] shadow-[0_0_18px_rgba(11,58,164,0.18)] sm:left-[0.69rem]"
                style={{ scaleY: prefersReducedMotion ? 1 : lineProgress }}
              />

              <div className="space-y-6 sm:space-y-8">
                {experience.timeline.map((entry) => (
                  <Motion.article
                    key={`${entry.title}-${entry.org}`}
                    initial="inactive"
                    whileInView="active"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={cardVariants}
                    className="relative"
                  >
                    <Motion.span
                      variants={dotVariants}
                      aria-hidden="true"
                      className="absolute left-[0.32rem] top-7 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[5px] border-background bg-[#0B3AA4] sm:left-3"
                    />

                    <Motion.div className="surface-panel interactive-outline rounded-[1.7rem] border border-border p-5 sm:rounded-[1.95rem] sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3 sm:items-center">
                        <span className="eyebrow">{entry.type}</span>
                        <span className="text-sm font-medium text-foreground-muted">{entry.period}</span>
                      </div>

                      <h3 className="mt-4 max-w-[17ch] text-[1.55rem] font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[1.95rem]">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-base font-medium text-accent">{entry.org}</p>
                      <p className="mt-1 text-sm text-foreground-muted">{entry.location}</p>

                      <p className="mt-6 max-w-[30rem] text-[0.98rem] leading-[1.8] text-foreground-muted">
                        {entry.summary}
                      </p>

                      <Motion.ul
                        variants={pointVariants}
                        className="mt-7 space-y-3"
                      >
                        {entry.points.map((point) => (
                          <Motion.li
                            key={point}
                            variants={prefersReducedMotion ? undefined : { inactive: { opacity: 0.56, y: 6 }, active: { opacity: 1, y: 0 } }}
                            className="flex items-start gap-3 text-sm leading-6 text-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{point}</span>
                          </Motion.li>
                        ))}
                      </Motion.ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Motion.div>
                  </Motion.article>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}

export default memo(ExperienceSection);
