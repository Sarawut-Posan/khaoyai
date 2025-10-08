import React from 'react';

export interface ProgressDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export default function ProgressDots({
  total,
  current,
  onDotClick,
  className = '',
}: ProgressDotsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === current;
        const isPast = index < current;
        
        return (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`
              transition-all duration-300 rounded-full
              ${isActive ? 'w-8 h-3 bg-terracotta' : 'w-3 h-3'}
              ${!isActive && isPast ? 'bg-sage' : ''}
              ${!isActive && !isPast ? 'bg-sage/30' : ''}
              hover:scale-110
            `}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? 'true' : 'false'}
          />
        );
      })}
    </div>
  );
}
