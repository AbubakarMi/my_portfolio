
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Layers, Code, Rocket, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const highlights = [
    {
        icon: <Award className="h-8 w-8 text-primary" />,
        value: "4+ Years",
        label: "Experience"
    },
    {
        icon: <Rocket className="h-8 w-8 text-primary" />,
        value: "10+",
        label: "Major Projects"
    },
    {
        icon: <Layers className="h-8 w-8 text-primary" />,
        label: "Full-Stack Expertise"
    },
    {
        icon: <Code className="h-8 w-8 text-primary" />,
        label: "AI Evaluation"
    }
];

const HighlightCard = ({ icon, value, label, delay }: { icon: React.ReactNode, value?: string, label: string, delay: number }) => {
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
      { threshold: 0.1 }
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
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          {icon}
        </div>
        {value && <p className="text-3xl font-bold text-foreground">{value}</p>}
        <p className="text-md mt-1 text-foreground/70">{label}</p>
      </Card>
    </div>
  );
};


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
    <section id="about" ref={sectionRef} className="bg-sky-50/50 dark:bg-sky-900/10 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-20">
          <div className={cn(
            "lg:col-span-2 transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            {aboutImage && (
              <Card className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              </Card>
            )}
          </div>
          <div className={cn(
              "space-y-8 md:col-span-3 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
             style={{ transitionDelay: '200ms' }}
          >
            <div className="space-y-4">
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
            </div>
            <Button asChild size="lg" className="mt-4 rounded-full px-8">
              <a href="https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {highlights.map((highlight, index) => (
                    <HighlightCard 
                      key={highlight.label} 
                      {...highlight}
                      delay={400 + index * 150}
                    />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
