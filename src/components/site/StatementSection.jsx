import { memo } from 'react';
import Reveal from './Reveal';
import ScrollScene from './ScrollScene';
import TextReveal from './TextReveal';

const STATEMENT_LAYERS = [
  {
    step: '01',
    title: 'Data clarity',
    detail: 'Clean preprocessing and readable signals before modeling.',
  },
  {
    step: '02',
    title: 'Model flow',
    detail: 'Training, inference, and evaluation connected with purpose.',
  },
  {
    step: '03',
    title: 'Product delivery',
    detail: 'APIs and interfaces that make predictions useful.',
  },
];

function StatementSection({ statement }) {
  return (
    <section id="statement" className="section-shell section-space pt-8 sm:pt-10 lg:pt-12">
      <ScrollScene intensity="medium">
        <Reveal className="statement-panel overflow-hidden rounded-[2.4rem] px-6 py-16 text-slate-50 sm:px-10 sm:py-18 lg:px-14 lg:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                {statement.label}
              </span>
              <TextReveal
                as="h2"
                text={statement.headline}
                split="words"
                stagger={0.045}
                className="mt-7 max-w-[15ch] text-[clamp(2.65rem,6.3vw,4.85rem)] font-bold leading-[0.92] tracking-[-0.062em] lg:max-w-[13ch]"
              />
              <p className="mt-6 max-w-[30rem] text-[0.98rem] leading-[1.78] text-slate-300 sm:text-[1.03rem]">{statement.supporting}</p>
              <p className="mt-8 max-w-[23rem] font-editorial text-[1.55rem] italic leading-[1.08] text-slate-200 sm:text-[1.95rem]">
                Model quality, clean APIs, and user-focused AI delivery.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {['Model inference', 'Data pipelines', 'Usable AI'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="statement-architecture">
                <span className="statement-architecture__glow" aria-hidden="true" />
                <span className="statement-architecture__ring statement-architecture__ring--outer" aria-hidden="true" />
                <span className="statement-architecture__ring statement-architecture__ring--inner" aria-hidden="true" />
                <span className="statement-architecture__grid" aria-hidden="true" />
                <span className="statement-architecture__beam" aria-hidden="true" />

                <div className="statement-architecture__header">
                  <span className="statement-architecture__signal-dot" aria-hidden="true" />
                  <span className="statement-architecture__label">AI Architecture</span>
                </div>

                <div className="statement-architecture__layers">
                  {STATEMENT_LAYERS.map((layer, index) => (
                    <div
                      key={layer.title}
                      className={`statement-architecture__item ${
                        index % 2 === 1 ? 'statement-architecture__item--offset' : ''
                      }`}
                    >
                      <span className="statement-architecture__node" aria-hidden="true" />
                      <div className="statement-architecture__card">
                        <span className="statement-architecture__step">{layer.step}</span>
                        <p className="statement-architecture__title">{layer.title}</p>
                        <p className="statement-architecture__detail">{layer.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="statement-architecture__footer">
                  <span className="statement-architecture__footer-kicker">Outcome</span>
                  <p className="statement-architecture__footer-copy">
                    Practical AI on the surface, stronger model flow underneath.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </ScrollScene>
    </section>
  );
}

export default memo(StatementSection);
