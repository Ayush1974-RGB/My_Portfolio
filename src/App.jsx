import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion as Motion } from 'framer-motion';
import { MOTION_DURATION, MOTION_EASE } from './animations/variants';
import { portfolioData } from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import SiteHeader from './components/site/SiteHeader';
import HeroSection from './components/site/HeroSection';
import SitePreloader from './components/site/SitePreloader';
import SignalTape from './components/site/SignalTape';
import KeyHighlightsSection from './components/site/KeyHighlightsSection';
import StatementSection from './components/site/StatementSection';
import AboutSection from './components/site/AboutSection';
import SkillsSection from './components/site/SkillsSection';
import SecurityMindsetSection from './components/site/SecurityMindsetSection';
import CurrentlyLearningSection from './components/site/CurrentlyLearningSection';
import SiteFooter from './components/site/SiteFooter';

const loadScrollProgress = () => import('./components/site/ScrollProgress');
const loadCustomCursor = () => import('./components/site/CustomCursor');
const loadProjectsSection = () => import('./components/site/ProjectsSection');
const loadClubsSection = () => import('./components/site/ClubsSection');
const loadExperienceSection = () => import('./components/site/ExperienceSection');
const loadContactSection = () => import('./components/site/ContactSection');
const loadResumeModal = () => import('./components/site/ResumeModal');

const ScrollProgress = lazy(loadScrollProgress);
const CustomCursor = lazy(loadCustomCursor);
const ProjectsSection = lazy(loadProjectsSection);
const ClubsSection = lazy(loadClubsSection);
const ExperienceSection = lazy(loadExperienceSection);
const ContactSection = lazy(loadContactSection);
const ResumeModal = lazy(loadResumeModal);

const LazySectionFallback = memo(function LazySectionFallback({ id, className = 'section-space' }) {
  return (
    <section id={id} className={className} aria-hidden="true">
      <div className="section-shell" />
    </section>
  );
});

function getClientCapabilities() {
  if (typeof window === 'undefined') {
    return {
      canRunEnhancements: false,
      canUseHeavyEnhancements: false,
      saveDataEnabled: false,
      lowBandwidth: false,
      prefersReducedMotion: false,
    };
  }

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveDataEnabled = Boolean(connection?.saveData);
  const lowBandwidth = typeof connection?.effectiveType === 'string' && /2g/.test(connection.effectiveType);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deviceMemory = navigator.deviceMemory ?? 4;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
  const canRunEnhancements = !saveDataEnabled && !lowBandwidth && !prefersReducedMotion;
  const canUseHeavyEnhancements = canRunEnhancements && hardwareConcurrency >= 6 && deviceMemory >= 4;

  return {
    canRunEnhancements,
    canUseHeavyEnhancements,
    saveDataEnabled,
    lowBandwidth,
    prefersReducedMotion,
  };
}

function resolvePageId(validIds, fallbackId) {
  if (typeof window === 'undefined') {
    return fallbackId;
  }

  const hashId = window.location.hash.replace('#', '').trim();
  return validIds.includes(hashId) ? hashId : fallbackId;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const hasSeenIntro = window.sessionStorage.getItem('portfolio-intro-seen') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !hasSeenIntro && !prefersReducedMotion;
  });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [enhancementsReady, setEnhancementsReady] = useState(false);
  const clientCapabilities = getClientCapabilities();
  const allowCustomCursor = clientCapabilities.canUseHeavyEnhancements;
  const allowHeavyVisuals = clientCapabilities.canUseHeavyEnhancements;
  const pageIds = useMemo(
    () => portfolioData.navigation.map(({ id }) => id),
    []
  );
  const defaultPageId = pageIds[0] ?? 'hero';
  const [activePageId, setActivePageId] = useState(() => resolvePageId(pageIds, defaultPageId));
  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  const closeIntro = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('portfolio-intro-seen', 'true');
    }

    setShowIntro(false);
  }, []);
  const tapeItems = [
    portfolioData.profile.secondaryRole,
    ...portfolioData.hero.badges,
    portfolioData.about.facts[1]?.value,
    'NITK CSE',
    'Portfolio engineered for recruiter clarity',
  ].filter(Boolean);
  const navigateToPage = useCallback(
    (id) => {
      if (!pageIds.includes(id)) {
        return;
      }

      setActivePageId(id);

      if (typeof window !== 'undefined' && window.location.hash !== `#${id}`) {
        window.location.hash = id;
      }
    },
    [pageIds]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !clientCapabilities.canRunEnhancements) {
      return undefined;
    }

    const enableEnhancements = () => setEnhancementsReady(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(enableEnhancements, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(enableEnhancements, 700);
    return () => window.clearTimeout(timeoutId);
  }, [clientCapabilities.canRunEnhancements]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (clientCapabilities.saveDataEnabled || clientCapabilities.lowBandwidth) {
      return undefined;
    }

      const warmModules = () => {
        const preloaders = [
          loadProjectsSection(),
          loadClubsSection(),
          loadExperienceSection(),
          loadContactSection(),
          loadResumeModal(),
          loadScrollProgress(),
        ];

      if (!clientCapabilities.prefersReducedMotion && clientCapabilities.canUseHeavyEnhancements) {
        preloaders.push(loadCustomCursor());
      }

      void Promise.allSettled(preloaders);
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(warmModules, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(warmModules, 1100);
    return () => window.clearTimeout(timeoutId);
  }, [
    clientCapabilities.canUseHeavyEnhancements,
    clientCapabilities.lowBandwidth,
    clientCapabilities.prefersReducedMotion,
    clientCapabilities.saveDataEnabled,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncPageFromHash = () => {
      setActivePageId(resolvePageId(pageIds, defaultPageId));
    };

    window.addEventListener('hashchange', syncPageFromHash);
    syncPageFromHash();

    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, [defaultPageId, pageIds]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: clientCapabilities.prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [activePageId, clientCapabilities.prefersReducedMotion]);

  const activePage = useMemo(() => {
    const homePage = (
      <>
        <HeroSection
          profile={portfolioData.profile}
          hero={portfolioData.hero}
          keyHighlights={portfolioData.keyHighlights}
          onOpenResume={openResume}
          enableEnhancedEffects={false}
        />
        <SignalTape items={tapeItems} />
        <KeyHighlightsSection keyHighlights={portfolioData.keyHighlights} />
        <StatementSection statement={portfolioData.statement} />
        <Suspense fallback={<LazySectionFallback id="contact" className="section-space pb-24 sm:pb-28" />}>
          <ContactSection
            contact={portfolioData.contact}
            onOpenResume={openResume}
            enableOrbitalScene={allowHeavyVisuals}
          />
        </Suspense>
      </>
    );

    switch (activePageId) {
      case 'hero':
        return homePage;
      case 'about':
        return <AboutSection profile={portfolioData.profile} about={portfolioData.about} />;
      case 'skills':
        return <SkillsSection skills={portfolioData.skills} />;
      case 'security':
        return <SecurityMindsetSection securityFocus={portfolioData.securityFocus} />;
      case 'learning':
        return <CurrentlyLearningSection learning={portfolioData.currentlyLearning} />;
      case 'projects':
        return (
          <Suspense fallback={<LazySectionFallback id="projects" />}>
            <ProjectsSection projects={portfolioData.projects} />
          </Suspense>
        );
      case 'clubs':
        return (
          <Suspense fallback={<LazySectionFallback id="clubs" />}>
            <ClubsSection clubs={portfolioData.clubs} />
          </Suspense>
        );
      case 'experience':
        return (
          <Suspense fallback={<LazySectionFallback id="experience" />}>
            <ExperienceSection experience={portfolioData.experience} />
          </Suspense>
        );
      default:
        return homePage;
    }
  }, [activePageId, allowHeavyVisuals, openResume, tapeItems]);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: MOTION_DURATION,
        ease: MOTION_EASE,
      }}
    >
      <>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[var(--theme-shadow)] focus:not-sr-only focus:outline-none"
        >
          Skip to content
        </a>

        <div className="relative min-h-screen overflow-x-clip bg-background text-foreground transition-colors duration-300 ease-in-out">
          <AnimatePresence>
            {showIntro ? (
              <SitePreloader
                key="site-preloader"
                profile={portfolioData.profile}
                hero={portfolioData.hero}
                onFinish={closeIntro}
              />
            ) : null}
          </AnimatePresence>

          {enhancementsReady ? (
            <Suspense fallback={null}>
              <ScrollProgress />
              {allowCustomCursor ? <CustomCursor /> : null}
            </Suspense>
          ) : null}
          <div className="ambient-orb ambient-orb--one" />
          <div className="ambient-orb ambient-orb--two" />
          <div className="ambient-orb ambient-orb--three" />

          <SiteHeader
            theme={theme}
            onToggleTheme={toggleTheme}
            navigation={portfolioData.navigation}
            profile={portfolioData.profile}
            onOpenResume={openResume}
            activeId={activePageId}
            onNavigate={navigateToPage}
          />

          <main id="main-content" tabIndex="-1">
            <AnimatePresence mode="wait" initial={false}>
              <Motion.div
                key={activePageId}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.34, ease: MOTION_EASE }}
              >
                {activePage}
              </Motion.div>
            </AnimatePresence>
          </main>

          <SiteFooter profile={portfolioData.profile} footer={portfolioData.footer} onOpenResume={openResume} />

          <Suspense fallback={null}>
            <AnimatePresence initial={false} mode="wait">
              {resumeOpen ? (
                <ResumeModal
                  key="resume-modal"
                  profile={portfolioData.profile}
                  hero={portfolioData.hero}
                  about={portfolioData.about}
                  skills={portfolioData.skills}
                  securityFocus={portfolioData.securityFocus}
                  projects={portfolioData.projects}
                  experience={portfolioData.experience}
                  onClose={closeResume}
                />
              ) : null}
            </AnimatePresence>
          </Suspense>
        </div>
      </>
    </MotionConfig>
  );
}
