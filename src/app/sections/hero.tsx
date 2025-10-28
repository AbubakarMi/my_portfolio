
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

  return (
    <section id="home" className="relative w-full overflow-hidden bg-background py-24 md:py-32 lg:py-40">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className={cn(
            "space-y-8 text-center md:text-left transition-all duration-1000",
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <div className="space-y-4">
             <p className="font-semibold text-primary text-lg">Muhammad Idris Abubakar</p>
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
              Software Engineer & Founder
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-foreground/80 md:mx-0 md:text-xl">
              I build scalable SaaS and custom software solutions that help people and businesses grow.
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base">
              <Link href="#projects">View My Work <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 px-8 py-6 text-base">
               <a href="/resume.pdf" download="Muhammad_Idris_Abubakar_Resume.pdf">
                <Download className="mr-2 h-5 w-5" />
                My Resume
              </a>
            </Button>
          </div>
        </div>
         <div className={cn(
            "relative mx-auto w-fit transition-all duration-1000 delay-200",
            isMounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}>
          {heroImage && (
             <div className="group relative">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={450}
                    height={563}
                    className="h-auto w-full max-w-sm rounded-[4rem] border-4 border-background object-cover shadow-2xl md:max-w-md aspect-[4/5]"
                    data-ai-hint={heroImage.imageHint}
                    priority
                />
                <div className="absolute inset-0 rounded-[4rem] bg-primary/10 transition-opacity duration-300 group-hover:opacity-0"></div>
             </div>
          )}
        </div>
      </div>
    </section>
  );
}


