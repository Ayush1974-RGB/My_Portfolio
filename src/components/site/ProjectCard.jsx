import { memo, useCallback, useMemo } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import ProjectThumbnail from './ProjectThumbnail';
import { MOTION_EASE } from './motion';

function ProjectCard({
  project,
  onViewDetails,
  compact = false,
  animated = true,
  active = false,
  detailsTargetId,
}) {
  const prefersReducedMotion = useReducedMotion();
  const statusLabel = useMemo(() => (project.liveUrl ? 'Live Demo' : 'Case Study'), [project.liveUrl]);
  const signalLabel = useMemo(
    () => project.stack.slice(0, 2).join(' / ') || project.role,
    [project.role, project.stack]
  );
  const outcomeLabel = useMemo(
    () => project.outcome ?? project.caseStudy?.impact ?? project.detail,
    [project.caseStudy, project.detail, project.outcome]
  );

  const handleOpenDetails = useCallback(() => {
    onViewDetails(project);
  }, [onViewDetails, project]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOpenDetails();
      }
    },
    [handleOpenDetails]
  );

  const handleLinkClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const revealProps = !animated || prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18, margin: '0px 0px -8% 0px' },
        transition: { duration: 0.55, ease: MOTION_EASE },
      };

  return (
    <Motion.article
      {...revealProps}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.02,
              y: -5,
              boxShadow: '0 24px 70px rgba(15, 23, 42, 0.12), 0 6px 18px rgba(15, 23, 42, 0.05)',
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
      className={`project-card-shell group relative isolate flex h-full cursor-pointer flex-col rounded-[1.85rem] border bg-white/58 text-left shadow-[0_16px_44px_rgba(15,23,42,0.08),0_2px_10px_rgba(15,23,42,0.03)] backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color] duration-300 supports-[backdrop-filter]:bg-white/50 ${
        active ? 'border-[#0B3AA4]/42 ring-1 ring-[#0B3AA4]/18' : 'border-white/70'
      } ${
        compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-6'
      }`}
      onClick={handleOpenDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.name}`}
      aria-controls={detailsTargetId}
      aria-pressed={active}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#0B3AA4]/12" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-gradient-to-br from-white/78 via-white/42 to-[#0B3AA4]/[0.05]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3 sm:items-center">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Project {project.index}
          </span>
          <span className="inline-flex items-center rounded-full border border-[#0B3AA4]/14 bg-white/78 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#0B3AA4] transition-all duration-300 group-hover:border-[#0B3AA4]/28 group-hover:bg-[#0B3AA4]/8">
            {statusLabel}
          </span>
        </div>

        <div className={`mt-3 flex min-w-0 items-center gap-3 ${compact ? 'sm:mt-3.5' : 'sm:mt-5'}`}>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#0B3AA4] shadow-[0_0_16px_rgba(11,58,164,0.24)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#0B3AA4]/30 via-slate-300/70 to-transparent" />
          <span className="truncate text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-slate-600">
            {signalLabel}
          </span>
        </div>

        <ProjectThumbnail
          project={project}
          compact
          className={`relative z-10 w-full rounded-[1.45rem] sm:rounded-[1.7rem] ${
            compact ? 'mt-3.5 aspect-[16/9]' : 'mt-5 aspect-[4/3]'
          }`}
        />

        <div className={`flex flex-1 flex-col ${compact ? 'mt-4' : 'mt-6'}`}>
          <h3
            className={`max-w-[16ch] font-bold leading-[0.95] tracking-[-0.045em] text-slate-950 ${
              compact ? 'text-[1.18rem] sm:text-[1.38rem]' : 'text-[1.34rem] sm:text-[1.72rem]'
            }`}
          >
            {project.name}
          </h3>

          <p
            className={`max-w-[38ch] text-slate-600 ${
              compact ? 'mt-2 text-[0.9rem] leading-[1.56]' : 'mt-3 text-[0.96rem] leading-[1.72]'
            }`}
          >
            {project.summary ?? project.description}
          </p>

          {outcomeLabel ? (
            <div
              className={`rounded-[1.2rem] border border-[#0B3AA4]/12 bg-[#0B3AA4]/[0.05] ${
                compact ? 'mt-3 px-3 py-2' : 'mt-4 px-3.5 py-3'
              }`}
            >
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#0B3AA4]">
                Outcome
              </p>
              <p className={`text-slate-800 ${compact ? 'mt-1.5 text-[0.88rem] leading-5' : 'mt-2 text-sm leading-6'}`}>
                {outcomeLabel}
              </p>
            </div>
          ) : null}

          <div className={`flex flex-wrap ${compact ? 'mt-3.5 gap-2' : 'mt-5 gap-2.5'}`}>
            {project.stack.slice(0, 3).map((item) => (
              <span
                key={item}
                className={`rounded-full border border-slate-200/80 bg-slate-950/[0.03] font-semibold uppercase tracking-[0.14em] text-slate-600 ${
                  compact ? 'px-2.5 py-1 text-[0.6rem]' : 'px-2.5 py-1.5 text-[0.64rem]'
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className={`flex flex-wrap items-center gap-2.5 ${compact ? 'mt-3.5' : 'mt-5'}`}>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                onKeyDown={(event) => event.stopPropagation()}
                aria-label={`Open GitHub repository for ${project.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/74 text-[1rem] text-slate-700 transition-all duration-300 hover:border-[#0B3AA4]/30 hover:bg-[#0B3AA4]/8 hover:text-[#0B3AA4]"
              >
                <SiGithub />
              </a>
            ) : null}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                onKeyDown={(event) => event.stopPropagation()}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200/80 bg-white/74 px-3.5 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-[#0B3AA4]/30 hover:bg-[#0B3AA4]/8 hover:text-[#0B3AA4]"
              >
                <span>Website</span>
                <FiExternalLink className="text-[0.95rem]" />
              </a>
            ) : null}
          </div>

          <div
            className={`mt-auto flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-4 ${
              compact ? 'pt-4 sm:pt-5' : 'pt-6 sm:pt-7'
            }`}
          >
            <div className="min-w-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Role
              </p>
              <p className="mt-2 max-w-[24ch] text-sm leading-6 text-slate-800">{project.role}</p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#0B3AA4]/16 bg-white/76 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#0B3AA4] transition-all duration-300 ease-out group-hover:translate-x-[2px] group-hover:border-[#0B3AA4] group-hover:bg-[#0B3AA4] group-hover:text-white">
              <span>Open Case Study</span>
              <FiArrowUpRight className="text-[0.86rem]" />
            </span>
          </div>
        </div>
      </div>
    </Motion.article>
  );
}

export default memo(ProjectCard);
