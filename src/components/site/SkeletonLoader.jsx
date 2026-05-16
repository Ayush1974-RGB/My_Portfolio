import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import { shimmer } from '../../animations/variants';

function SkeletonLoader({ 
  type = 'card',
  className = '',
  count = 1,
  height = 'h-20',
  width = 'w-full',
  rounded = 'rounded-lg',
  animated = true,
}) {
  const shimmerVariants = animated ? shimmer() : {};
  const baseClasses = `${width} ${height} ${rounded} bg-gradient-to-r from-background via-surface to-background bg-[length:200%_100%]`;

  if (type === 'card') {
    return (
      <div className={`rounded-[1.45rem] border border-border/40 bg-background/60 p-5 sm:p-6 ${className}`}>
        <Motion.div
          variants={shimmerVariants}
          animate={animated ? 'animate' : undefined}
          className="h-4 w-1/3 rounded bg-gradient-to-r from-surface via-background to-surface bg-[length:200%_100%]"
        />
        <Motion.div
          variants={shimmerVariants}
          animate={animated ? 'animate' : undefined}
          className="mt-4 h-24 w-full rounded-lg bg-gradient-to-r from-surface via-background to-surface bg-[length:200%_100%]"
        />
        <Motion.div
          variants={shimmerVariants}
          animate={animated ? 'animate' : undefined}
          className="mt-4 h-3 w-2/3 rounded bg-gradient-to-r from-surface via-background to-surface bg-[length:200%_100%]"
        />
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <Motion.div
            key={index}
            variants={shimmerVariants}
            animate={animated ? 'animate' : undefined}
            className={`h-4 rounded-full bg-gradient-to-r from-surface via-background to-surface bg-[length:200%_100%] ${
              index === count - 1 ? 'w-4/5' : 'w-full'
            } ${className}`}
          />
        ))}
      </div>
    );
  }

  if (type === 'image') {
    return (
      <Motion.div
        variants={shimmerVariants}
        animate={animated ? 'animate' : undefined}
        className={`${baseClasses} bg-gradient-to-r from-surface via-background to-surface bg-[length:200%_100%] ${className}`}
      />
    );
  }

  if (type === 'button') {
    return (
      <Motion.div
        variants={shimmerVariants}
        animate={animated ? 'animate' : undefined}
        className="h-10 w-32 rounded-full bg-gradient-to-r from-surface via-background to-surface bg-[length:200%_100%]"
      />
    );
  }

  return (
    <Motion.div
      variants={shimmerVariants}
      animate={animated ? 'animate' : undefined}
      className={`${baseClasses} bg-gradient-to-r from-surface via-background to-surface bg-[length:200%_100%] ${className}`}
    />
  );
}

export default memo(SkeletonLoader);
