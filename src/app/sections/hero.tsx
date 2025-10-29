
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-portrait");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-background py-24 sm:py-32">
       <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_20%,hsl(var(--primary)/0.1),transparent)]"
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className={cn(
                "space-y-8 transition-all duration-1000",
                isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <div className="space-y-4">
                <p className="font-semibold text-primary text-lg">Hello, I'm Muhammad Idris Abubakar</p>
                <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
                  Software Engineer & Founder
                </h1>
                <p className="max-w-2xl text-lg text-foreground/80 md:text-xl">
                  I build scalable SaaS and custom software solutions that help people and businesses grow. From crafting elegant backend systems to leading my own startup, I am passionate about turning great ideas into high-impact technology.
                </p>
              </div>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
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
                "relative mx-auto transition-all duration-1000 delay-200 lg:mx-0",
                isMounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}>
                {heroImage && (
                  <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={600}
                      height={400}
                      className="w-full"
                      data-ai-hint={heroImage.imageHint}
                      priority
                  />
                )}
            </div>
        </div>
      </div>
    </section>
  );
}
