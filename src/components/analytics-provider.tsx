'use client';

import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { analyzeUserInteraction } from '@/ai/ai-powered-personalized-feedback';
import { Sparkles } from 'lucide-react';

export function AnalyticsProvider() {
  const { toast } = useToast();
  const lastScrollY = useRef(0);
  const interactionHistory = useRef<string[]>([]);
  const recommendationTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'blog', 'contact'];
      const visibleSections = sections.filter(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
      });

      if (scrollingDown && visibleSections.length > 0) {
        const mostVisibleSection = visibleSections[0];
        if (!interactionHistory.current.includes(mostVisibleSection)) {
          interactionHistory.current.push(mostVisibleSection);
        }
      }

      if (recommendationTimeout.current) {
        clearTimeout(recommendationTimeout.current);
      }

      recommendationTimeout.current = setTimeout(() => {
        if (interactionHistory.current.length > 2) { // Trigger after visiting a few sections
          triggerRecommendation();
          interactionHistory.current = []; // Reset history after recommendation
        }
      }, 5000); // 5 seconds of inactivity

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (recommendationTimeout.current) {
        clearTimeout(recommendationTimeout.current);
      }
    };
  }, [toast]);

  const triggerRecommendation = async () => {
    try {
      const result = await analyzeUserInteraction({
        interactionType: 'scroll_session_end',
        interactionDetails: `User visited sections: ${interactionHistory.current.join(', ')}`,
        userHistory: `Previously visited sections: ${interactionHistory.current.join(', ')}`,
      });

      toast({
        title: (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">Just for you!</span>
          </div>
        ),
        description: result.recommendations,
        duration: 8000,
      });
    } catch (error) {
      console.error("Failed to get recommendation:", error);
    }
  };

  return null; // This component does not render anything
}
