"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-portrait");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const animationClass = (delay: string) => cn(
    "transition-all duration-1000 ease-out",
    isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    delay
  );

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-background py-20 sm:py-24">
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Profile Image with enhanced styling */}
          {heroImage && (
            <div className={cn("relative mb-10", animationClass("delay-100"))}>
              <div className="relative">
                {/* Outer ring */}
                <div className="absolute -inset-2 rounded-full bg-primary/20 blur-sm" />
                {/* Inner ring */}
                <div className="absolute -inset-1 rounded-full bg-background" />
                <Image
                  src={heroImage.imageUrl}
                  alt="Muhammad Idris Abubakar"
                  width={180}
                  height={180}
                  className="relative rounded-full object-cover shadow-2xl ring-4 ring-background"
                  priority
                />
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1 shadow-lg ring-1 ring-border">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-medium text-foreground/80">Available for work</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className={cn("space-y-8 max-w-4xl", animationClass("delay-200"))}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Building the future of communication</span>
            </div>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Software &</span>
                <span className="block text-primary">AI Evaluation</span>
                <span className="block">Engineer</span>
              </h1>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-base text-foreground/70 sm:text-lg md:text-xl leading-relaxed">
              I build scalable systems and conduct AI evaluation workflows. As the founder of{' '}
              <span className="font-semibold text-primary">Nyra</span>, my mission is to build world-class
              productivity software that makes communication seamless across languages.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={cn("flex flex-col gap-4 pt-10 sm:flex-row sm:justify-center", animationClass("delay-300"))}>
            <Button asChild size="lg" className="group rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
              <Link href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
          <div className={cn("pt-16 sm:pt-20", animationClass("delay-500"))}>
            <Link href="#about" className="group inline-flex flex-col items-center gap-2 text-foreground/50 hover:text-primary transition-colors duration-300">
              <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
              <div className="h-10 w-6 rounded-full border-2 border-current p-1">
                <div className="h-2 w-1 rounded-full bg-current animate-bounce mx-auto" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
