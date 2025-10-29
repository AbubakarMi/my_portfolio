
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Download } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-portrait");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const animationClass = (delay: string) => cn(
    "transition-all duration-700 ease-in-out",
    isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
    delay
  );

  return (
    <section id="home" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_20%,hsl(var(--primary)/0.1),transparent)]"
      />
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className={cn("space-y-8")}>
          <div className="space-y-4 text-center lg:text-left">
            <p className={cn("font-semibold text-primary text-lg", animationClass("delay-0"))}>
              Hello, I'm Muhammad Idris Abubakar
            </p>
            <h1 className={cn("font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl", animationClass("delay-150"))}>
              Software & AI Evaluation Engineer
            </h1>
            <p className={cn("mx-auto max-w-2xl text-lg text-foreground/80 md:text-xl lg:mx-0", animationClass("delay-300"))}>
              I build scalable systems and conduct AI evaluation workflows. As the founder of <strong className="font-semibold text-primary">Nyra</strong>, my mission is to build world-class productivity software that makes communication seamless, no matter what language people speak.
            </p>
          </div>
          <div className={cn("flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center lg:justify-start", animationClass("delay-500"))}>
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base">
              <Link href="#projects">View My Work <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 px-8 py-6 text-base">
               <a href="https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                My Resume
              </a>
            </Button>
          </div>
        </div>

        <div className={cn(
            "relative hidden lg:flex items-center justify-center transition-opacity duration-1000",
            isMounted ? "opacity-100" : "opacity-0"
        )}>
          <div className="absolute bg-primary/20 rounded-full h-[450px] w-[450px] animate-pulse-slow -z-10" />
           {heroImage && (
             <div className="relative h-[320px] w-[320px]" style={{transform: "translateZ(0)"}}>
                <Image
                    src={heroImage.imageUrl}
                    alt="Muhammad Idris Abubakar"
                    fill
                    className="rounded-full object-cover shadow-2xl"
                    priority
                />
             </div>
           )}
        </div>
      </div>
    </section>
  );
}
