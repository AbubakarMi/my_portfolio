
"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';


const experiences = [
  {
    company: "Hubuk Technology Limited",
    link: "https://hubuk.ng",
    role: "Full Stack",
    duration: "June 2022 – Present",
    icon: Building,
    description: [
        "Designed modular REST APIs with ASP.NET Core 8 & PostgreSQL, improving response efficiency by 25%.",
        "Developed automated QA and reproducibility scripts for AI models.",
        "Built internal AI-powered dashboards and wrote technical documentation."
    ],
    value: "hubuk"
  },
  {
    company: "Freelance Contributor",
    link: "#",
    role: "AI / QA Evaluation",
    duration: "2024 – Present",
    icon: Code,
    description: [
        "Evaluated LLM outputs for accuracy and logical consistency.",
        "Authored test cases using JSON/YAML and applied precision, recall, and coverage metrics.",
        "Collaborated on prompt iteration and rubric definition."
    ],
    value: "freelance"
  },
  {
    company: "FlexiSAF Edusoft Limited",
    link: "https://flexisaf.com",
    role: "Backend Engineering Intern",
    duration: "Sept 2025 – Dec 2025",
    icon: GraduationCap,
     description: [
        "Assisted in backend feature development using Java, Spring-based frameworks, and SQL.",
        "Gained hands-on experience in a professional software development environment."
    ],
    value: "flexisaf"
  },
  {
    company: "Torvix AI",
    link: "#",
    role: "Frontend Developer Intern",
    duration: "Oct 2025 – Nov 2025",
    icon: Rocket,
    description: [
        "Built responsive UIs for AI model visualization using modern frontend frameworks.",
        "Integrated backend APIs to display real-time data from AI systems."
    ],
    value: "torvix"
  }
];

const ExperienceCard = ({ experience, isVisible }: { experience: typeof experiences[0], isVisible: boolean }) => (
  <div className={cn(
        "p-6 md:p-8 rounded-2xl border bg-card/50 transition-all duration-500 ease-out",
        "border-transparent hover:border-primary/20 hover:shadow-2xl hover:-translate-y-1",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
        <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <experience.icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-headline text-xl font-bold text-foreground">{experience.role}</h3>
                <p className="text-sm text-primary font-medium">{experience.duration}</p>
            </div>
        </div>
        <Link href={experience.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground/80 hover:text-primary transition-colors">
            {experience.company}
        </Link>
        <ul className="mt-4 space-y-3 text-foreground/80">
            {experience.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                    <svg className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const DesktopTimeline = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    const progress = count > 0 ? (current / count) * 100 : 0;

    return (
        <div className="mt-16 hidden md:block">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {experiences.map((exp, index) => (
                        <CarouselItem key={exp.value} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-4">
                               <ExperienceCard experience={exp} isVisible={true} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="mt-12">
                <div className="flex items-center justify-center gap-6">
                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={scrollPrev} disabled={current === 1}>
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    
                    <div className="w-full max-w-sm">
                       <div className="relative h-1 w-full rounded-full bg-border">
                           <div 
                             className="absolute h-1 rounded-full bg-primary transition-all duration-300"
                             style={{width: `${progress}%`}}
                           />
                       </div>
                    </div>

                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={scrollNext} disabled={current === count}>
                        <ArrowRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const MobileTimeline = () => {
  return (
    <div className="mt-16 space-y-12 md:hidden">
      {experiences.map((exp, index) => (
        <ExperienceCard key={exp.value} experience={exp} isVisible={true} />
      ))}
    </div>
  );
};


export function Experience() {
    const isMobile = useIsMobile();
    return (
        <section id="experience" className="bg-background py-24 sm:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Professional Journey
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
                        A timeline of my key roles and accomplishments in the tech industry.
                    </p>
                </div>
                
                {isMobile ? <MobileTimeline /> : <DesktopTimeline />}
            </div>
        </section>
    );
}

    