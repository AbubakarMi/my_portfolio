
"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
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

const ExperienceCard = ({ experience }: { experience: typeof experiences[0] }) => (
    <div className={cn(
        "p-6 md:p-8 rounded-2xl border bg-card/50 transition-all duration-300 ease-out",
        "border-transparent hover:border-primary/20 hover:shadow-2xl hover:-translate-y-1"
    )}>
        <h3 className="font-headline text-xl font-bold text-foreground">{experience.role}</h3>
        <p className="text-sm text-primary font-medium mt-1">{experience.duration}</p>
        <Link href={experience.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground/80 hover:text-primary transition-colors mt-2 inline-block">
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

const TimelineItem = ({ experience, index }: { experience: typeof experiences[0], index: number }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const isLeft = index % 2 === 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        const currentRef = itemRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    
    return (
        <div ref={itemRef} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className={cn(
                "w-full md:w-[calc(50%-2.5rem)] transition-all duration-700 ease-out",
                isVisible ? "opacity-100" : "opacity-0",
                isLeft ? (isVisible ? 'md:translate-x-0' : 'md:-translate-x-10') : (isVisible ? 'md:translate-x-0' : 'md:translate-x-10')
            )}>
                <ExperienceCard experience={experience} />
            </div>

            <div className={cn(
                "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-700 delay-300",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}>
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary border-4 border-background">
                     <experience.icon className="h-6 w-6" />
                 </div>
            </div>
        </div>
    );
};

const DesktopTimeline = () => {
    return (
        <div className="relative mt-16 hidden md:block">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-16">
                 {experiences.map((exp, index) => (
                    <TimelineItem key={exp.value} experience={exp} index={index} />
                ))}
            </div>
        </div>
    );
};


const MobileTimeline = () => {
  return (
    <div className="mt-16 space-y-12 md:hidden">
      {experiences.map((exp) => (
        <ExperienceCard key={exp.value} experience={exp} />
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
