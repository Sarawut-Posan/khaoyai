'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import ProgressDots from './ui/ProgressDots';

interface PresentationContainerProps {
  slides: React.ComponentType<{ isActive?: boolean; onNavigate?: (slideIndex: number) => void }>[];
  initialSlide?: number;
}

export default function PresentationContainer({
  slides,
  initialSlide = 0,
}: PresentationContainerProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const [direction, setDirection] = useState<number>(0);
  const totalSlides = slides.length;

  // Navigation functions
  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides && index !== currentSlide) {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
      }
    },
    [currentSlide, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const previousSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // URL hash synchronization
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const slideIndex = parseInt(hash, 10);
    if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  }, [totalSlides]);

  useEffect(() => {
    window.location.hash = `${currentSlide}`;
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          previousSlide();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          nextSlide();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, previousSlide, goToSlide, totalSlides]);

  // Touch gesture handler
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 500;

    if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -swipeVelocityThreshold
    ) {
      nextSlide();
    } else if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > swipeVelocityThreshold
    ) {
      previousSlide();
    }
  };

  // Slide transition variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: 'spring' as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.3 },
  };

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-sand">
      {/* Main slide container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[1400px] h-full mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full"
            >
              <CurrentSlideComponent
                isActive={true}
                onNavigate={goToSlide}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress dots navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <ProgressDots
          total={totalSlides}
          current={currentSlide}
          onDotClick={goToSlide}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-10">
        <div className="font-sarabun text-sm text-charcoal/60">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>
    </div>
  );
}
