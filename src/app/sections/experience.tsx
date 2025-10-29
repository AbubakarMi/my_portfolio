
"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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

const ExperienceItem = ({ exp, isVisible }: { exp: typeof experiences[0], isVisible: boolean }) => {
    return (
        <div className={cn(
            "relative flex items-start gap-6 pl-14 transition-all duration-700 ease-out",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
            <div className="absolute left-0 top-1.5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-background">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" style={{animationDelay: `${Math.random() * 2}s`}}></div>
                <exp.icon className="h-5 w-5 relative" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-primary">{exp.duration}</p>
                <h3 className="mt-1 font-headline text-xl font-bold text-foreground">
                    {exp.role} at{' '}
                    <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {exp.company}
                    </Link>
                </h3>
                <ul className="mt-3 space-y-2 text-foreground/80 list-disc pl-5 text-base">
                    {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export function Experience() {
    const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        itemsRef.current.forEach((item, index) => {
            if (item) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setVisibleItems(prev => ({...prev, [index]: true}));
                            observer.unobserve(item);
                        }
                    },
                    { threshold: 0.2, triggerOnce: true }
                );
                observer.observe(item);
                observers.push(observer);
            }
        });
        
        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    return (
        <section id="experience" className="bg-background py-24 sm:py-32">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Professional Journey
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
                        A timeline of my key roles and accomplishments in the tech industry.
                    </p>
                </div>

                <div className="relative mt-24 flex flex-col gap-12">
                    <div className="absolute left-[21px] top-4 h-full w-0.5 -translate-x-1/2 bg-border" aria-hidden="true" />
                    {experiences.map((exp, index) => (
                        <div key={exp.company} ref={el => itemsRef.current[index] = el}>
                            <ExperienceItem exp={exp} isVisible={!!visibleItems[index]}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
