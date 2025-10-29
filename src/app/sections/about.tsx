
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Layers, Code, Rocket, Award } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const highlights = [
    {
        icon: <Award className="h-6 w-6 text-primary" />,
        value: "4+",
        label: "Years of Experience"
    },
    {
        icon: <Rocket className="h-6 w-6 text-primary" />,
        value: "10+",
        label: "Major Projects"
    },
    {
        icon: <Layers className="h-6 w-6 text-primary" />,
        label: "Full-Stack Expertise"
    },
    {
        icon: <Code className="h-6 w-6 text-primary" />,
        label: "AI Evaluation"
    }
];

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value?: string, label: string }) => (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <div>
        {value && <p className="text-2xl font-bold text-foreground">{value}</p>}
        <p className="text-sm text-foreground/70">{label}</p>
      </div>
    </div>
);


export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === "about-profile");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, once: true }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-sky-50/50 dark:bg-sky-900/10 py-24 sm:py-32">
       <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_100%,hsl(var(--primary)/0.1),transparent)]"
      />
      <div className={cn(
        "container mx-auto px-4 md:px-6 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          
          {/* Image Column */}
          <div className="relative">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl transition-transform hover:scale-105 duration-500"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
          </div>

          {/* Content Column */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Story: From Curiosity to Creator
              </h2>
              <div className="space-y-4 text-lg text-foreground/80">
                <p>
                  My journey into technology was driven by a passion for building scalable systems and a fascination with artificial intelligence. As a detail-driven Software & AI Evaluation Engineer, I have over four years of experience designing SaaS applications, conducting AI evaluation workflows, and turning complex problems into high-impact technology.
                </p>
                <p>
                  In addition to my engineering work, I founded the startup <strong className="font-semibold text-primary">Nyra</strong>, with a mission to build world-class productivity software. My goal is to design reproducible test scenarios, apply metrics like precision and recall to improve AI model behavior, and deliver exceptional user experiences through my products.
                </p>
              </div>
               <Button asChild size="lg" className="mt-4 rounded-full px-8">
                <a href="https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
               {highlights.map(highlight => (
                 <StatItem key={highlight.label} {...highlight} />
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
