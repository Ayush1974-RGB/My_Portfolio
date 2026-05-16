import { memo, useEffect, useMemo, useRef } from 'react';
import { ORBIT_SHELLS, TECHNOLOGIES } from './techData';

function ContactOrbitalScene() {
  const sceneRef = useRef(null);
  const frameRef = useRef(0);
  const shellMap = useMemo(
    () =>
      ORBIT_SHELLS.map((shell) => ({
        ...shell,
        icons: TECHNOLOGIES.filter((technology) => technology.shell === shell.id),
      })),
    []
  );

  useEffect(() => {
    const node = sceneRef.current;

    if (!node || typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const render = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      node.style.setProperty('--scene-tilt-x', `${current.y * -5.5}deg`);
      node.style.setProperty('--scene-tilt-y', `${current.x * 7.5}deg`);
      node.style.setProperty('--scene-shift-x', `${current.x * 14}px`);
      node.style.setProperty('--scene-shift-y', `${current.y * 10}px`);
      frameRef.current = window.requestAnimationFrame(render);
    };

    const resetScene = () => {
      target.x = 0;
      target.y = 0;
    };

    const handlePointerMove = (event) => {
      if (mediaQuery.matches) {
        return;
      }

      const bounds = node.getBoundingClientRect();
      const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

      target.x = Math.max(-1, Math.min(1, normalizedX));
      target.y = Math.max(-1, Math.min(1, normalizedY));
    };

    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        resetScene();
      }
    };

    frameRef.current = window.requestAnimationFrame(render);
    node.addEventListener('pointermove', handlePointerMove, { passive: true });
    node.addEventListener('pointerleave', resetScene);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      node.removeEventListener('pointermove', handlePointerMove);
      node.removeEventListener('pointerleave', resetScene);
      if (mediaQuery.addEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="contact-scene-canvas contact-scene-canvas--dom"
      style={{
        background:
          'radial-gradient(circle at top, color-mix(in srgb, var(--theme-accent) 16%, transparent), transparent 34%), linear-gradient(155deg, #040b18 0%, #071122 46%, #09172f 100%)',
        boxShadow: '0 28px 72px color-mix(in srgb, var(--theme-accent) 12%, transparent)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-[9%] top-0 z-[3] h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-6 z-[3] rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-white/72 backdrop-blur">
        Tech Orbit
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 z-[3] hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/60 backdrop-blur sm:block">
        Hover To Inspect
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.07),transparent_44%)]" />

      <div className="contact-orbital-stage">
        <div className="contact-orbital-grid" aria-hidden="true" />
        <div className="contact-orbital-core">
          <div className="contact-orbital-core__glow" aria-hidden="true" />
          <div className="contact-orbital-core__shell contact-orbital-core__shell--outer" aria-hidden="true" />
          <div className="contact-orbital-core__shell contact-orbital-core__shell--inner" aria-hidden="true" />
          <div className="contact-orbital-core__planet" aria-hidden="true">
            <span className="contact-orbital-core__spec contact-orbital-core__spec--one" />
            <span className="contact-orbital-core__spec contact-orbital-core__spec--two" />
            <span className="contact-orbital-core__spec contact-orbital-core__spec--three" />
            <span className="contact-orbital-core__highlight" />
          </div>
          <div className="contact-orbital-core__label">
            <span>Frontend</span>
            <span>Systems</span>
            <span>Security</span>
          </div>
        </div>

        {shellMap.map((shell) => (
          <div
            key={shell.id}
            className={`contact-orbit-shell contact-orbit-shell--${shell.direction}`}
            style={{
              '--orbit-radius': shell.radius,
              '--orbit-duration': shell.duration,
            }}
          >
            <div className="contact-orbit-shell__ring" aria-hidden="true" />
            {shell.icons.map((technology, index) => {
              const angle = `${(360 / shell.icons.length) * index}deg`;
              const floatDelay = `${index * 0.28}s`;
              const Icon = technology.Icon;

              return (
                <div
                  key={technology.id}
                  className="contact-tech-node"
                  style={{
                    '--orbit-angle': angle,
                    '--float-delay': floatDelay,
                    '--node-color': technology.color,
                  }}
                >
                  <div className="contact-tech-node__body">
                    <Icon />
                  </div>
                  <span className="contact-tech-node__label">{technology.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ContactOrbitalScene);
