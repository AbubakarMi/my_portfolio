
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

const StatCard = ({ icon, value, label, delay, className }: { icon: React.ReactNode, value?: string, label:string, delay: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border/20 bg-card/60 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-primary/20",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <div>
          {value && <p className="text-2xl font-bold text-foreground">{value}</p>}
          <p className="text-sm text-foreground/70">{label}</p>
        </div>
      </div>
    </div>
  )
}

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-sky-50/50 dark:bg-sky-900/10 py-24 sm:py-32">
       <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_100%,hsl(var(--primary)/0.1),transparent)]"
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-5 lg:gap-16">
          
          {/* Image and two stats */}
          <div className="relative lg:col-span-2">
            <div className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <StatCard 
              {...highlights[0]} 
              delay={600} 
              className="absolute -bottom-8 -right-8 w-64"
            />
             <StatCard 
              {...highlights[1]} 
              delay={800} 
              className="absolute -top-8 -left-8 w-64"
            />
          </div>

          {/* Main content and two stats */}
          <div className="lg:col-span-3">
             <div className={cn(
                "rounded-3xl border border-border/20 bg-card/60 p-8 shadow-xl backdrop-blur-sm transition-all duration-700 delay-200 lg:p-12",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}>
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
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
               <StatCard 
                {...highlights[2]} 
                delay={1000}
              />
               <StatCard 
                {...highlights[3]} 
                delay={1200}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
