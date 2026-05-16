import { motion as Motion } from 'framer-motion';
import Magnetic from './Magnetic';
import ProjectThumbnail from './ProjectThumbnail';
import { MOTION_EASE } from './motion';

const CASE_STUDY_SECTIONS = [
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'impact', label: 'Impact' },
];

const PROJECT_TONE_LABELS = {
  vector: 'Editorial stack',
  signal: 'Signal scan',
  radar: 'Orbit view',
  protocol: 'Protocol flow',
  ledger: 'Structured read',
};

const detailPanelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.24,
      ease: MOTION_EASE,
    },
  },
};

export default function ProjectDetailsPanel({
  project,
  tone = 'vector',
  scrollable = false,
  id = 'project-case-study',
  className = '',
  style,
}) {
  if (!project) {
    return null;
  }

  return (
    <Motion.article
      id={id}
      variants={detailPanelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      data-project-tone={tone}
      className={`project-detail-shell surface-panel-strong relative rounded-[1.55rem] p-4 sm:rounded-[2.2rem] sm:p-7 lg:p-8 ${
        scrollable ? 'project-detail-scroll lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-4' : ''
      } ${className}`}
      style={{ willChange: 'opacity, transform', ...style }}
    >
      <span aria-hidden="true" className="project-modal-watermark hidden lg:block">
        {project.index}
      </span>

      <div className="project-tone-ribbon" aria-hidden="true">
        <span className="project-tone-ribbon__line" />
        <span className="project-tone-ribbon__label">{PROJECT_TONE_LABELS[tone] ?? PROJECT_TONE_LABELS.vector}</span>
      </div>

      <div className="relative z-10 space-y-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.02fr)_minmax(15.5rem,0.98fr)] md:items-start xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
          <div className="min-w-0">
            <span className="eyebrow">Project {project.index}</span>
            <h3 className="mt-4 max-w-[14ch] text-balance text-[1.85rem] font-bold leading-[0.94] tracking-[-0.065em] text-foreground sm:mt-5 sm:text-[2.6rem] xl:text-[3rem]">
              {project.name}
            </h3>
            <p className="mt-4 max-w-[38rem] text-[0.96rem] leading-7 text-foreground sm:mt-5 sm:text-[1.04rem] sm:leading-8">
              {project.description}
            </p>

            {project.detail ? (
              <p className="mt-4 max-w-[36rem] text-[0.94rem] leading-7 text-foreground-muted sm:mt-5 sm:text-[0.96rem]">
                {project.detail}
              </p>
            ) : null}

            <div className="project-modal-trace mt-6">
              <span aria-hidden="true" className="project-signal-dot" />
              <span aria-hidden="true" className="project-signal-line" />
              <span className="project-modal-caption">
                {project.role} / {project.stack.slice(0, 2).join(' / ')}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <ProjectThumbnail
              project={project}
              tone={tone}
              className="aspect-[16/10] rounded-[1.6rem]"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="project-detail-panel rounded-[1.4rem] p-4">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Role
                </span>
                <p className="mt-3 text-sm leading-6 text-foreground sm:text-[0.98rem]">
                  {project.role}
                </p>
              </div>

              <div className="project-detail-panel rounded-[1.4rem] p-4">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Availability
                </span>
                <p className="mt-3 text-sm leading-6 text-foreground sm:text-[0.98rem]">
                  {project.availability}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <div className="project-detail-panel rounded-[1.5rem] p-5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Summary
              </span>
              <p className="mt-4 text-base leading-7 text-foreground">
                {project.summary ?? project.outcome ?? project.description}
              </p>
            </div>

            <div className="project-detail-panel rounded-[1.5rem] p-5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Outcome
              </span>
              <p className="mt-4 text-base leading-7 text-foreground">
                {project.outcome ?? project.caseStudy?.impact ?? project.detail}
              </p>
            </div>

            <div className="project-detail-panel rounded-[1.5rem] p-5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Tech Stack
              </span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="project-stack-tag rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.02em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {CASE_STUDY_SECTIONS.map((section) => (
              <div key={section.key} className="project-detail-panel rounded-[1.5rem] p-5 sm:p-6">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  {section.label}
                </span>
                <p className="mt-4 text-base leading-7 text-foreground">
                  {project.caseStudy?.[section.key] ?? project.caseStudy?.approach}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.liveUrl ? (
            <Magnetic>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="button-primary w-full sm:w-auto"
              >
                Live Demo <span aria-hidden="true">/</span>
              </a>
            </Magnetic>
          ) : (
            <button
              type="button"
              disabled
              className="project-action project-action--disabled inline-flex items-center justify-center gap-2"
            >
              <span>Live Demo</span>
              <span aria-hidden="true" className="text-[0.72rem] tracking-[0.18em]">/</span>
            </button>
          )}

          <Magnetic strength={8}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="button-secondary w-full sm:w-auto"
            >
              GitHub <span aria-hidden="true">/</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </Motion.article>
  );
}
