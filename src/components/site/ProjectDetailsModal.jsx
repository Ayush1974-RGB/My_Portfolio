import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
      className={`project-detail-shell surface-panel-strong relative rounded-[1.45rem] p-3 sm:rounded-[1.9rem] sm:p-5 md:rounded-[2.2rem] md:p-8 ${
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

      <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-[minmax(0,1.02fr)_minmax(14rem,0.98fr)] md:items-start lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)]">
          <div className="min-w-0">
            <span className="eyebrow">Project {project.index}</span>
            <h3
              id={titleId}
              className="mt-3 sm:mt-4 max-w-full text-[1.5rem] sm:text-[1.85rem] md:text-[2.45rem] lg:text-[3rem] font-bold leading-[0.94] tracking-[-0.065em] text-foreground"
            >
              {project.name}
            </h3>
            <p className="mt-3 sm:mt-4 text-[0.875rem] sm:text-[0.95rem] md:text-[1.02rem] leading-6 sm:leading-7 md:leading-8 text-foreground">
              {project.description}
            </p>

            {project.detail ? (
              <p className="mt-3 sm:mt-4 text-[0.8rem] sm:text-[0.92rem] md:text-[0.96rem] leading-6 sm:leading-7 text-foreground-muted">
                {project.detail}
              </p>
            ) : null}

            <div className="project-modal-trace mt-4 sm:mt-5 md:mt-6">
              <span aria-hidden="true" className="project-signal-dot" />
              <span aria-hidden="true" className="project-signal-line" />
              <span className="project-modal-caption text-[0.7rem] sm:text-[0.75rem]">
                {project.role} / {project.stack.slice(0, 2).join(' / ')}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            <ProjectThumbnail
              project={project}
              tone={tone}
              className="aspect-[16/10] rounded-[1rem] sm:rounded-[1.45rem] md:rounded-[1.6rem]"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="project-detail-panel rounded-[1rem] sm:rounded-[1.3rem] p-3 sm:p-4">
                <span className="text-[0.6rem] sm:text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Role
                </span>
                <p className="mt-2 sm:mt-3 text-[0.75rem] sm:text-sm md:text-[0.98rem] leading-5 sm:leading-6 text-foreground">
                  {project.role}
                </p>
              </div>

              <div className="project-detail-panel rounded-[1rem] sm:rounded-[1.3rem] p-3 sm:p-4">
                <span className="text-[0.6rem] sm:text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Availability
                </span>
                <p className="mt-2 sm:mt-3 text-[0.75rem] sm:text-sm md:text-[0.98rem] leading-5 sm:leading-6 text-foreground">
                  {project.availability}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3 sm:gap-4">
            <div className="project-detail-panel rounded-[1rem] sm:rounded-[1.35rem] p-4 sm:p-5 md:p-6">
              <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Summary
              </span>
              <p className="mt-3 sm:mt-4 text-[0.85rem] sm:text-[0.98rem] md:text-base leading-6 sm:leading-7 text-foreground">
                {project.summary ?? project.outcome ?? project.description}
              </p>
            </div>

            <div className="project-detail-panel rounded-[1rem] sm:rounded-[1.35rem] p-4 sm:p-5 md:p-6">
              <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Outcome
              </span>
              <p className="mt-3 sm:mt-4 text-[0.85rem] sm:text-[0.98rem] md:text-base leading-6 sm:leading-7 text-foreground">
                {project.outcome ?? project.caseStudy?.impact ?? project.detail}
              </p>
            </div>

            <div className="project-detail-panel rounded-[1rem] sm:rounded-[1.35rem] p-4 sm:p-5 md:p-6">
              <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                Tech Stack
              </span>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="project-stack-tag rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[0.7rem] sm:text-xs font-medium tracking-[0.02em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {CASE_STUDY_SECTIONS.map((section) => (
              <div key={section.key} className="project-detail-panel rounded-[1rem] sm:rounded-[1.35rem] p-4 sm:p-5 md:p-6">
                <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  {section.label}
                </span>
                <p className="mt-3 sm:mt-4 text-[0.85rem] sm:text-[0.98rem] md:text-base leading-6 sm:leading-7 text-foreground">
                  {project.caseStudy?.[section.key] ?? project.caseStudy?.approach}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          {project.liveUrl ? (
            <Magnetic>
              <Motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.008, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="button-primary w-full py-2.5 sm:py-3 text-sm sm:text-base"
              >
                Live Demo <span aria-hidden="true">/</span>
              </Motion.a>
            </Magnetic>
          ) : (
            <button
              type="button"
              disabled
              className="project-action project-action--disabled w-full py-2.5 sm:py-3 text-sm sm:text-base inline-flex items-center justify-center gap-2"
            >
              <span>Live Demo</span>
              <span aria-hidden="true" className="text-[0.72rem] tracking-[0.18em]">/</span>
            </button>
          )}

          <Magnetic strength={8}>
            <Motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.006, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="button-secondary w-full py-2.5 sm:py-3 text-sm sm:text-base"
            >
              GitHub <span aria-hidden="true">/</span>
            </Motion.a>
          </Magnetic>
        </div>
      </div>
    </Motion.article>
  );
}

export default function ProjectDetailsModal({ project, onClose, tone = 'vector' }) {
  const reduceMotion = useReducedMotion();
  const [dragDelta, setDragDelta] = useState(0);
  const startYRef = useRef(0);
  const modalRef = useRef(null);

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

  const handleDragEnd = (event, info) => {
    // Swipe down to close on mobile
    if (info.offset.y > 60 && info.velocity.y > 100) {
      onClose?.();
    }
  };

  if (!project) {
    return null;
  }

  return (
    <Motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-[90] flex items-end justify-center bg-background/58 px-2 py-3 sm:items-center sm:px-4 sm:py-4 lg:px-5 lg:py-5"
      onClick={() => onClose?.()}
    >
      <Motion.div
        ref={modalRef}
        variants={panelVariants}
        transition={reduceMotion ? { duration: 0 } : undefined}
        drag="y"
        dragElastic={{ top: 0.2, bottom: 0 }}
        dragConstraints={{ top: 0, bottom: 300 }}
        onDrag={(event, info) => setDragDelta(info.offset.y)}
        onDragEnd={handleDragEnd}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-case-study-title"
        className="relative flex h-[min(95dvh,90vh,54rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.2rem] sm:rounded-[1.6rem] md:rounded-[2rem] border border-border/80 bg-background/78 p-2 sm:p-3 md:p-4 shadow-[var(--theme-shadow-lg)] backdrop-blur-xl cursor-grab active:cursor-grabbing"
      >
        <button
          type="button"
          onClick={() => onClose?.()}
          aria-label="Close project details"
          className="project-modal-close absolute right-2 top-2 sm:right-3 sm:top-3 z-20 inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-border bg-background/84 text-lg sm:text-base md:text-xl text-foreground transition-colors hover:bg-background hover:border-accent/50"
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
