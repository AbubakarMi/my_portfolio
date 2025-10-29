
"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const experiences = [
  {
    company: "Hubuk Technology Limited",
    link: "https://hubuk.ng",
    role: "Backend Developer",
    duration: "June 2022 – Present",
    icon: Building,
    description: [
        "Designed modular REST APIs with ASP.NET Core 8 & PostgreSQL, improving response efficiency by 25%.",
        "Developed automated QA and reproducibility scripts for AI models.",
        "Built internal AI-powered dashboards and wrote technical documentation."
    ]
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
    ]
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
    ]
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
    ]
  }
];

const ExperienceItem = ({ exp, index }: { exp: typeof experiences[0], index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const isLeft = index % 2 === 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    return (
        <div ref={itemRef} className="relative w-full">
            <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <exp.icon className="h-6 w-6" />
                </div>
            </div>

            <Card className={cn(
                "w-full md:w-[calc(50%-2.5rem)] group transition-all duration-1000 ease-out",
                isLeft ? "md:mr-auto" : "md:ml-auto",
                isVisible ? 'opacity-100' : 'opacity-0',
                isVisible && isLeft && 'md:translate-x-0',
                !isVisible && isLeft && 'md:-translate-x-12',
                isVisible && !isLeft && 'md:translate-x-0',
                !isVisible && !isLeft && 'md:translate-x-12',
            )}>
                 <div className="space-y-3 p-6">
                    <p className="font-semibold text-primary text-lg">{exp.role}</p>
                    <h3 className="font-headline text-2xl font-bold text-foreground">
                        <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            {exp.company}
                        </Link>
                    </h3>
                    <p className="font-medium text-foreground/60 text-sm">{exp.duration}</p>
                    <ul className="space-y-2 text-foreground/80 list-disc pl-5 text-left">
                        {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </Card>
        </div>
    );
};


export function Experience() {
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

        <div className="relative mt-24 space-y-16">
          <div className="absolute left-0 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:left-1/2" aria-hidden="true" />
          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.company} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
