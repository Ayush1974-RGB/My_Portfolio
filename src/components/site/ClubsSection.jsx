import { memo, useMemo } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import StickySplitSection from './StickySplitSection';

const ROLE_TONES = [
  {
    shell: 'from-accent/[0.12] via-accent/[0.03] to-transparent',
    pill: 'border-accent/24 bg-accent/[0.08] text-accent',
    dot: 'bg-accent',
  },
  {
    shell: 'from-[#7AA2FF]/[0.14] via-[#7AA2FF]/[0.04] to-transparent',
    pill: 'border-[#7AA2FF]/25 bg-[#7AA2FF]/[0.08] text-[#1D4ED8] dark:text-[#8EB4FF]',
    dot: 'bg-[#3D70E4]',
  },
  {
    shell: 'from-foreground/[0.09] via-foreground/[0.03] to-transparent',
    pill: 'border-foreground/12 bg-foreground/[0.05] text-foreground',
    dot: 'bg-foreground',
  },
  {
    shell: 'from-slate-400/[0.14] via-slate-300/[0.05] to-transparent',
    pill: 'border-slate-400/20 bg-slate-300/[0.08] text-slate-700 dark:text-slate-200',
    dot: 'bg-slate-500',
  },
];

function ClubsSection({ clubs }) {
  const prefersReducedMotion = useReducedMotion();
  const stats = useMemo(() => clubs.stats ?? [], [clubs.stats]);
  const focusAreas = useMemo(() => clubs.focusAreas ?? [], [clubs.focusAreas]);

  return (
    <section id="clubs" className="section-space">
      <div className="section-shell">
        <StickySplitSection
          columnsClassName="xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]"
          stickyTopClassName="xl:top-28"
          leftContent={
            <div className="space-y-4 sm:space-y-5 lg:pr-5">
              <SectionHeading
                label={clubs.label}
                title={clubs.title}
                description={clubs.introduction}
                titleClassName="max-w-[12ch] text-[clamp(2.4rem,6vw,4.6rem)]"
                descriptionClassName="max-w-[26rem]"
              />

              <div className="relative grid gap-4 sm:gap-5">
                <div className="surface-panel-strong interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.1rem] sm:p-7 xl:mr-10 xl:px-8 xl:pt-10 xl:pb-8">
                  <span className="eyebrow">Overview</span>
                  <h3 className="mt-6 max-w-[15ch] text-[1.6rem] font-bold leading-[1] tracking-[-0.04em] text-foreground sm:text-[1.9rem] xl:mt-8">
                    {clubs.overviewTitle}
                  </h3>
                  <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-[1.78] text-foreground-muted">
                    {clubs.overviewDescription}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[1.4rem] border border-border bg-background/72 p-4"
                      >
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                          {stat.label}
                        </span>
                        <p className={`mt-3 text-2xl font-bold tracking-[-0.05em] ${stat.valueClassName ?? 'text-foreground'}`}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-panel interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.1rem] sm:p-7 xl:relative xl:-mt-24 xl:ml-14 xl:w-[calc(100%-3.5rem)] xl:justify-self-end">
                  <span className="eyebrow">What These Roles Sharpen</span>
                  <h3 className="mt-5 max-w-[16ch] text-[1.55rem] font-bold leading-[1] tracking-[-0.04em] text-foreground sm:text-[1.8rem]">
                    Community work that strengthens how I operate on teams.
                  </h3>
                  <div className="mt-6 space-y-3">
                    {focusAreas.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-[1.2rem] border border-border bg-background/68 px-4 py-3"
                      >
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                        <p className="text-sm leading-6 text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
          rightContent={
            <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
              {clubs.roles.map((role, index) => {
                const tone = ROLE_TONES[index % ROLE_TONES.length];

                return (
                  <Motion.article
                    key={`${role.title}-${role.org}`}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 22, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                    className="group relative overflow-hidden rounded-[1.9rem] border border-border bg-background/88 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)] sm:p-6"
                  >
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.shell} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full border border-border/60 bg-background/40 blur-3xl"
                    />

                    <div className="relative">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <span className={`rounded-full border px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.18em] ${tone.pill}`}>
                          {role.eyebrow}
                        </span>
                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                          {role.period}
                        </span>
                      </div>

                      <h3 className="mt-5 max-w-[14ch] text-[1.5rem] font-bold leading-[0.96] tracking-[-0.04em] text-foreground sm:text-[1.72rem]">
                        {role.title}
                      </h3>
                      <p className="mt-2 text-base font-medium text-accent">{role.org}</p>
                      <p className="mt-1 text-sm text-foreground-muted">{role.location}</p>

                      <p className="mt-5 text-[0.98rem] leading-[1.75] text-foreground-muted">
                        {role.summary}
                      </p>

                      <div className="mt-6 space-y-3">
                        {role.points.map((point) => (
                          <div key={point} className="flex items-start gap-3">
                            <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                            <p className="text-sm leading-6 text-foreground">{point}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-background/74 px-3 py-1.5 text-xs font-medium text-foreground-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Motion.article>
                );
              })}
            </div>
          }
        />
      </div>
    </section>
  );
}

export default memo(ClubsSection);
