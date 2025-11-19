"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Download, Sparkles, Code2, Cpu, Zap } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-portrait");
  const [isMounted, setIsMounted] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const roles = ['Software Engineer', 'AI Evaluator', 'Startup Founder', 'Full-Stack Developer'];

  useEffect(() => {
    setIsMounted(true);

    // Rotate text every 3 seconds
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const animationClass = (delay: string) => cn(
    "transition-all duration-1000 ease-out",
    isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    delay
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Enhanced background pattern */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--primary)/0.15)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_60%)]" />
      </div>

      {/* Floating icons */}
      <div aria-hidden="true" className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <div className={cn("absolute top-1/4 left-[10%] p-3 rounded-2xl bg-card shadow-lg ring-1 ring-border/50 transition-all duration-1000", isMounted ? "opacity-100 translate-y-0 animate-float" : "opacity-0 -translate-y-10")} style={{ animationDelay: '0s' }}>
          <Code2 className="h-6 w-6 text-primary" />
        </div>
        <div className={cn("absolute top-1/3 right-[15%] p-3 rounded-2xl bg-card shadow-lg ring-1 ring-border/50 transition-all duration-1000 delay-300", isMounted ? "opacity-100 translate-y-0 animate-float" : "opacity-0 -translate-y-10")} style={{ animationDelay: '1s' }}>
          <Cpu className="h-6 w-6 text-primary" />
        </div>
        <div className={cn("absolute bottom-1/3 left-[15%] p-3 rounded-2xl bg-card shadow-lg ring-1 ring-border/50 transition-all duration-1000 delay-500", isMounted ? "opacity-100 translate-y-0 animate-float" : "opacity-0 translate-y-10")} style={{ animationDelay: '2s' }}>
          <Zap className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Profile Image with enhanced styling */}
          {heroImage && (
            <div className={cn("relative mb-12", animationClass("delay-100"))}>
              <div className="relative group">
                {/* Animated outer ring */}
                <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-colors duration-500" />
                {/* Rotating border effect */}
                <div className="absolute -inset-1 rounded-full bg-primary/30 animate-pulse" />
                {/* Inner background */}
                <div className="absolute inset-0 rounded-full bg-background" />
                <Image
                  src={heroImage.imageUrl}
                  alt="Muhammad Idris Abubakar"
                  width={200}
                  height={200}
                  className="relative rounded-full object-cover shadow-2xl ring-4 ring-background transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-xl ring-1 ring-border/50 backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-sm font-medium text-foreground">Available for work</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className={cn("space-y-8 max-w-4xl", animationClass("delay-200"))}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Building the future of communication</span>
            </div>

            {/* Main headline with animated role */}
            <div className="space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="block">Hi, I'm</span>
                <span className="block text-primary">Muhammad</span>
              </h1>

              {/* Animated role text */}
              <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center overflow-hidden">
                <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/80 transition-all duration-500">
                  <span key={textIndex} className="inline-block animate-fade-in-up">
                    {roles[textIndex]}
                  </span>
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-base text-foreground/60 sm:text-lg md:text-xl leading-relaxed">
              I build scalable systems and conduct AI evaluation workflows. As the founder of{' '}
              <span className="font-semibold text-primary">Nyra</span>, my mission is to create world-class
              productivity software that makes communication seamless across languages.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 sm:gap-12 pt-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">4+</p>
                <p className="text-xs sm:text-sm text-foreground/60">Years Exp</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">10+</p>
                <p className="text-xs sm:text-sm text-foreground/60">Projects</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">2</p>
                <p className="text-xs sm:text-sm text-foreground/60">Startups</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={cn("flex flex-col gap-4 pt-12 sm:flex-row sm:justify-center", animationClass("delay-300"))}>
            <Button asChild size="lg" className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
              <Link href="#projects">
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group rounded-full border-2 px-8 py-6 text-base font-medium hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300">
              <a href="https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                My Resume
              </a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className={cn("pt-16 sm:pt-24", animationClass("delay-500"))}>
            <Link href="#about" className="group inline-flex flex-col items-center gap-3 text-foreground/40 hover:text-primary transition-colors duration-300">
              <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
              <div className="h-12 w-7 rounded-full border-2 border-current p-1.5">
                <div className="h-2.5 w-1.5 rounded-full bg-current animate-bounce mx-auto" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
