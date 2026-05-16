import { lazy, memo, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion as Motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import ScrollScene from './ScrollScene';
import SectionHeading from './SectionHeading';
import { MOTION_EASE } from './motion';

const ProjectDetailsModal = lazy(() => import('./ProjectDetailsModal'));

const projectGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

const projectCardRevealVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: 'blur(10px)',
    clipPath: 'inset(14% 0 18% 0 round 1.9rem)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    clipPath: 'inset(0% 0 0% 0 round 1.9rem)',
    transition: {
      duration: 0.52,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 14,
    scale: 0.992,
    clipPath: 'inset(8% 0 14% 0 round 1.9rem)',
    transition: {
      duration: 0.24,
      ease: MOTION_EASE,
    },
  },
};

function ProjectAtlasCard({ projects, liveProjects }) {
  return (
    <Reveal delay={0.08}>
      <div className="surface-panel-strong interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.2rem] sm:p-7">
        <span className="eyebrow">Project atlas</span>
        <h3 className="mt-5 max-w-[15ch] text-[1.65rem] font-bold leading-[1] tracking-[-0.045em] text-foreground sm:text-[1.9rem]">

          A closer look at the engineering decisions behind each build.
        </h3>
        <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-[1.78] text-foreground-muted">

          Each project opens into a deeper breakdown of the problem, the build, and the outcome without crowding the homepage.
        </p>

        <div className="mt-6 grid gap-3 min-[460px]:grid-cols-2">
          <div className="rounded-[1.35rem] border border-border bg-background/72 px-4 py-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Total Projects
            </p>
            <p className="mt-3 text-3xl font-bold tracking-[-0.06em] text-foreground">
              {projects.items.length.toString().padStart(2, '0')}
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-border bg-background/72 px-4 py-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Live Demos
            </p>
            <p className="mt-3 text-3xl font-bold tracking-[-0.06em] text-accent">
              {liveProjects.toString().padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function MobileProjectsGrid({ projects, onViewDetails }) {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.14 });
  const liveProjects = useMemo(
    () => projects.items.filter((project) => project.liveUrl).length,
    [projects.items]
  );

  return (
    <div className="xl:hidden">
      <div className="grid gap-6">
        <SectionHeading
          label={projects.label}
          title={projects.title}
          description={projects.subtitle}
        />
        <ProjectAtlasCard projects={projects} liveProjects={liveProjects} />
      </div>

      <ScrollScene intensity="subtle" className="mt-8 sm:mt-10">
        <LayoutGroup>
          <Motion.div
            id="projects-grid"
            ref={gridRef}
            layout
            variants={projectGridVariants}
            initial="hidden"
            animate={gridInView ? 'show' : 'hidden'}
            transition={{ layout: { duration: 0.56, ease: MOTION_EASE } }}
            className="grid gap-4 sm:grid-cols-2 lg:gap-5"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {projects.items.map((project) => (
                <Motion.div
                  key={project.name}
                  layout
                  variants={projectCardRevealVariants}
                  initial="hidden"
                  animate={gridInView ? 'show' : 'hidden'}
                  exit="exit"
                  transition={{ layout: { duration: 0.52, ease: MOTION_EASE } }}
                  className="h-full"
                >
                  <ProjectCard project={project} onViewDetails={onViewDetails} />
                </Motion.div>
              ))}
            </AnimatePresence>
          </Motion.div>
        </LayoutGroup>
      </ScrollScene>
    </div>
  );
}

function DesktopProjectsGallery({ projects, onViewDetails, liveProjects }) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });

  return (
    <div ref={sectionRef} className="hidden xl:block xl:min-h-[calc(100vh-7rem)]">
      <div className="relative">
        <div className="sticky top-28">
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] xl:gap-10">
            <div className="space-y-6 pr-4">
              <SectionHeading
                label={projects.label}
                title={projects.title}
                description={projects.subtitle}
              />
              <ProjectAtlasCard projects={projects} liveProjects={liveProjects} />
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">Curated gallery</span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
                  {reduceMotion ? 'Browse at your pace' : 'Horizontal scroll'}
                </span>
              </div>

              <div className="rounded-[2.2rem] border border-border/70 bg-background/46 p-2">
                <div className="project-gallery-rail flex items-center gap-2 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                  <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_color-mix(in_srgb,var(--theme-accent)_24%,transparent)]" />
                  Swipe, trackpad, or shift + wheel to move across the gallery
                </div>
              </div>

              <div className="project-gallery-shell rounded-[2.4rem] overflow-x-auto pb-4">
                <div data-project-track className="flex gap-5 pl-1 pr-[12vw] pt-2">
                  {projects.items.map((project) => (
                    <Motion.div
                      key={project.name}
                      variants={projectCardRevealVariants}
                      initial="hidden"
                      animate={sectionInView ? 'show' : 'hidden'}
                      className="project-gallery-card h-full w-[min(27.5rem,62vw)] shrink-0 snap-start"
                    >
                      <ProjectCard project={project} onViewDetails={onViewDetails} />
                    </Motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const liveProjects = useMemo(
    () => projects.items.filter((project) => project.liveUrl).length,
    [projects.items]
  );
  const handleViewDetails = useCallback((project) => {
    setActiveProject(project);
  }, []);
  const handleCloseProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <section id="projects" className="section-space">
      <div className="section-shell">
        <MobileProjectsGrid projects={projects} onViewDetails={handleViewDetails} />
        <DesktopProjectsGallery
          projects={projects}
          liveProjects={liveProjects}
          onViewDetails={handleViewDetails}
        />
      </div>

      <Suspense fallback={null}>
        <AnimatePresence initial={false} mode="wait">
          {activeProject ? (
            <ProjectDetailsModal
              key={activeProject.name}
              project={activeProject}
              onClose={handleCloseProject}
            />
          ) : null}
        </AnimatePresence>
      </Suspense>
    </section>
  );
}

export default memo(ProjectsSection);
