"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(scrollPercent);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-border/30">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating progress indicator */}
      <div
        className={cn(
          "fixed bottom-8 right-8 z-50 transition-all duration-500",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="relative">
          {/* Circular progress */}
          <svg
            className="h-14 w-14 -rotate-90 transform"
            viewBox="0 0 36 36"
          >
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-muted"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-primary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${progress}, 100`}
              style={{
                transition: 'stroke-dasharray 0.15s ease-out',
              }}
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
