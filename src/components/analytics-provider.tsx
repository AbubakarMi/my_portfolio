"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";
import { analyzeUserInteraction } from "@/ai/ai-powered-personalized-feedback";
import { WandSparkles } from "lucide-react";

export function AnalyticsProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const [history, setHistory] = useState<string[]>([]);
  const interactionTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = (section: string) => {
    setHistory(prev => {
      const updatedHistory = [...prev, section];
      // Keep last 5 interactions
      if (updatedHistory.length > 5) {
        return updatedHistory.slice(updatedHistory.length - 5);
      }
      return updatedHistory;
    });
  }

  const triggerAnalysis = async () => {
    if (history.length < 2) return;

    try {
      const result = await analyzeUserInteraction({
        interactionType: 'section_views',
        interactionDetails: `User has viewed the following sections: ${history.join(', ')}`,
        userHistory: `Previously viewed: ${history.slice(0, -1).join(', ')}`
      });

      toast({
        title: (
          <div className="flex items-center gap-2">
            <WandSparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">A quick suggestion...</span>
          </div>
        ),
        description: result.recommendations,
      });

      // Clear history after analysis to avoid repeated toasts
      setHistory([]);

    } catch (error) {
      console.error("Failed to analyze user interaction:", error);
    }
  };

  useEffect(() => {
    if (interactionTimeout.current) {
      clearTimeout(interactionTimeout.current);
    }
    if (history.length > 0) {
      interactionTimeout.current = setTimeout(triggerAnalysis, 5000); // 5 seconds after last interaction
    }

    return () => {
      if (interactionTimeout.current) {
        clearTimeout(interactionTimeout.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const sections = ["about", "skills", "experience", "projects", "blog", "contact"];
  
  return (
    <>
      {children}
      {sections.map(id => (
        <AnalyticsIntersectionObserver key={id} sectionId={id} onInView={() => handleInteraction(id)} />
      ))}
    </>
  );
}

function AnalyticsIntersectionObserver({ sectionId, onInView }: { sectionId: string; onInView: () => void }) {
  const { ref, inView } = useInView({
    threshold: 0.3, // Triggers when 30% of the section is visible
    triggerOnce: true, // Only triggers once per section
  });

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      ref(element);
    }
  }, [sectionId, ref]);
  
  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return null;
}
