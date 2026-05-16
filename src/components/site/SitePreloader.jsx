import { memo, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

function SitePreloader({ profile, hero, onFinish }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timeoutId = window.setTimeout(onFinish, 1750);

    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(timeoutId);
    };
  }, [onFinish]);

  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } }}
      className="site-preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="site-preloader__grid" aria-hidden="true" />

      <div className="site-preloader__content">
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="site-preloader__badge"
        >
          Initializing portfolio signal
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="site-preloader__headline"
        >
          <span>{profile.name}</span>
          <span className="site-preloader__headline-accent">{hero.subtitle}</span>
        </Motion.div>

        <Motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="site-preloader__support"
        >
          Building the first impression with product polish, systems awareness, and a security-minded edge.
        </Motion.p>

        <div className="site-preloader__progress">
          <Motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.25, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="site-preloader__progress-bar"
          />
        </div>
      </div>
    </Motion.div>
  );
}

export default memo(SitePreloader);
