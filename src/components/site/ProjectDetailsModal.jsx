import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
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

const overlayVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  show: {
    opacity: 1,
    backdropFilter: 'blur(12px)',
    transition: {
      duration: 0.24,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.2,
      ease: MOTION_EASE,
    },
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: MOTION_EASE,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.985,
    transition: {
      duration: 0.2,
      ease: MOTION_EASE,
    },
  },
};

const detailPanelVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.18,
      ease: MOTION_EASE,
    },
  },
};

function ProjectDetailsPanel({
  project,
  tone = 'vector',
  scrollable = false,
  titleId = 'project-case-study-title',
  className = '',
  style,
}) {
  if (!project) {
    return null;
  }

  return (
    <Motion.article
      variants={detailPanelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      data-project-tone={tone}
      className={`project-detail-shell surface-panel-strong relative rounded-[1.45rem] p-4 sm:rounded-[1.9rem] sm:p-6 lg:rounded-[2.2rem] lg:p-8 ${
        scrollable ? 'project-detail-scroll min-h-0 overflow-y-auto pr-1 sm:pr-2' : ''
      } ${className}`}
      style={{ willChange: 'opacity, transform', ...style }}
    >
      <span aria-hidden="true" className="project-modal-watermark hidden lg:block">
        {project.index}
      </span>

      <div className="project-tone-ribbon" aria-hidden="true">
        <span className="project-tone-ribbon__line" />
        <span className="project-tone-ribbon__label">
          {PROJECT_TONE_LABELS[tone] ?? PROJECT_TONE_LABELS.vector}
        </span>
      </div>

      <div className="relative z-10 space-y-6 sm:space-y-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.02fr)_minmax(15.5rem,0.98fr)] md:items-start xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
          <div className="min-w-0">
            <span className="eyebrow">Project {project.index}</span>
            <h3
              id={titleId}
              className="mt-4 max-w-[14ch] text-balance text-[1.85rem] font-bold leading-[0.94] tracking-[-0.065em] text-foreground sm:mt-5 sm:text-[2.45rem] xl:text-[3rem]"
            >
              {project.name}
            </h3>
            <p className="mt-4 max-w-[38rem] text-[0.95rem] leading-7 text-foreground sm:mt-5 sm:text-[1.02rem] sm:leading-8">
              {project.description}
            </p>

            {project.detail ? (
              <p className="mt-4 max-w-[36rem] text-[0.92rem] leading-7 text-foreground-muted sm:mt-5 sm:text-[0.96rem]">
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
              className="aspect-[16/10] rounded-[1.45rem] sm:rounded-[1.6rem]"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="project-detail-panel rounded-[1.3rem] p-4">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Role
                </span>
                <p className="mt-3 text-sm leading-6 text-foreground sm:text-[0.98rem]">
                  {project.role}
                </p>
              </div>

              <div className="project-detail-panel rounded-[1.3rem] p-4">
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
            <div className="project-detail-panel rounded-[1.35rem] p-5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Summary
              </span>
              <p className="mt-4 text-[0.98rem] leading-7 text-foreground sm:text-base">
                {project.summary ?? project.outcome ?? project.description}
              </p>
            </div>

            <div className="project-detail-panel rounded-[1.35rem] p-5">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Outcome
              </span>
              <p className="mt-4 text-[0.98rem] leading-7 text-foreground sm:text-base">
                {project.outcome ?? project.caseStudy?.impact ?? project.detail}
              </p>
            </div>

            <div className="project-detail-panel rounded-[1.35rem] p-5">
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
              <div key={section.key} className="project-detail-panel rounded-[1.35rem] p-5 sm:p-6">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  {section.label}
                </span>
                <p className="mt-4 text-[0.98rem] leading-7 text-foreground sm:text-base">
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

export default function ProjectDetailsModal({ project, onClose, tone = 'vector' }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) {
    return null;
  }

  return (
    <Motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-[90] flex items-end justify-center bg-background/58 px-2 py-2 sm:items-center sm:px-4 sm:py-4 lg:px-5 lg:py-5"
      onClick={() => onClose?.()}
    >
      <Motion.div
        variants={panelVariants}
        transition={reduceMotion ? { duration: 0 } : undefined}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-case-study-title"
        className="relative flex h-[min(92dvh,58rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.6rem] border border-border/80 bg-background/78 p-2 shadow-[var(--theme-shadow-lg)] backdrop-blur-xl sm:rounded-[2rem] sm:p-3 lg:p-4"
      >
        <button
          type="button"
          onClick={() => onClose?.()}
          aria-label="Close project details"
          className="project-modal-close absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/84 text-base text-foreground sm:h-11 sm:w-11"
        >
          &times;
        </button>

        <div className="min-h-0 flex-1">
          <ProjectDetailsPanel
            project={project}
            tone={tone}
            scrollable
            titleId="project-case-study-title"
            className="h-full"
          />
        </div>
      </Motion.div>
    </Motion.div>
  );
}
