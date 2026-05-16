import { memo, useMemo } from 'react';

function SignalTape({ items, label = 'Portfolio signal tape' }) {
  const repeatedItems = useMemo(() => Array.from({ length: 3 }, () => items).flat(), [items]);

  return (
    <section className="signal-tape-section" aria-label={label}>
      <div className="signal-tape-shell">
        <div className="signal-tape-track">
          {repeatedItems.map((item, index) => (
            <div key={`${item}-${index}`} className="signal-tape-item">
              <span>{item}</span>
              <span className="signal-tape-separator" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(SignalTape);
