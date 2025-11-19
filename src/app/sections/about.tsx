"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Layers, Code, Rocket, Award, ArrowUpRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const highlights = [
  {
    icon: <Award className="h-5 w-5" />,
    value: "4+",
    label: "Years Experience"
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    value: "10+",
    label: "Major Projects"
  },
  {
    icon: <Layers className="h-5 w-5" />,
    value: "Full",
    label: "Stack Expertise"
  },
  {
    icon: <Code className="h-5 w-5" />,
    value: "AI",
    label: "Evaluation"
  }
];

const StatItem = ({ icon, value, label, index, isVisible }: { icon: React.ReactNode, value: string, label: string, index: number, isVisible: boolean }) => (
  <div
    className={cn(
      "group relative overflow-hidden rounded-2xl bg-background p-5 shadow-sm ring-1 ring-border/50 transition-all duration-500 hover:shadow-xl hover:ring-primary/30 hover:-translate-y-1",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    )}
    style={{
      transitionDelay: `${600 + index * 100}ms`,
    }}
  >
    {/* Subtle shine effect on hover */}
    <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] transition-transform duration-700 group-hover:translate-x-full" />

    <div className="relative flex items-center gap-4">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-xs text-foreground/60">{label}</p>
      </div>
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-muted/30 py-24 sm:py-32">
      {/* Background decoration */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className={cn(
          "mb-16 text-center transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            About Me
          </p>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            My Story
          </h2>
        </div>

        <div className={cn(
          "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 transition-all duration-1000 ease-out delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>

          {/* Image Column */}
          <div className={cn(
            "relative transition-all duration-1000 ease-out delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 h-20 w-20 rounded-2xl bg-primary/10 transition-all duration-500 hover:bg-primary/20" />
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-2xl bg-primary/5" />

              {/* Floating accent */}
              <div className="absolute -top-8 right-8 h-3 w-3 rounded-full bg-primary/40 animate-pulse" />
              <div className="absolute -bottom-6 left-12 h-2 w-2 rounded-full bg-primary/30 animate-pulse delay-500" />

              {aboutImage && (
                <div className="group relative overflow-hidden rounded-3xl ring-1 ring-border/50">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={600}
                    height={750}
                    className="aspect-[4/5] w-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={aboutImage.imageHint}
                  />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
                </div>
              )}
            </div>
          </div>

          {/* Content Column */}
          <div className={cn(
            "space-y-8 transition-all duration-1000 ease-out delay-500",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="space-y-6">
              <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                From Curiosity to Creator
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-foreground/70">
                <p>
                  My journey into technology was driven by a passion for building scalable systems and a fascination with artificial intelligence. As a detail-driven Software & AI Evaluation Engineer, I have over four years of experience designing SaaS applications, conducting AI evaluation workflows, and turning complex problems into high-impact technology.
                </p>
                <p>
                  In addition to my engineering work, I founded the startup{' '}
                  <span className="font-semibold text-primary">Nyra</span>, with a mission to build world-class productivity software. My goal is to design reproducible test scenarios, apply metrics like precision and recall to improve AI model behavior, and deliver exceptional user experiences through my products.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button asChild size="lg" className="group rounded-full px-8 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <a href="https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Download Resume
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="group rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <a href="#contact">
                    Let's Talk
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((highlight, index) => (
                <StatItem
                  key={highlight.label}
                  icon={highlight.icon}
                  value={highlight.value}
                  label={highlight.label}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
