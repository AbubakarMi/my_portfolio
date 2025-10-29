
"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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

const ExperienceItem = ({ experience, index }: { experience: typeof experiences[0], index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, triggerOnce: true }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const isReversed = index % 2 !== 0;

    return (
        <div ref={ref} className={cn(
            "grid grid-cols-1 items-start gap-8 md:grid-cols-5 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
            <div className={cn(
                "md:col-span-2",
                isReversed && "md:order-last"
            )}>
                <Card className="p-6 sticky top-28 bg-primary/5 border-primary/20 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <experience.icon className="h-6 w-6" />
                        </div>
                        <div>
                             <h3 className="font-headline text-xl font-bold text-foreground">
                                <Link href={experience.link} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                                    {experience.company}
                                </Link>
                            </h3>
                            <p className="text-foreground/80">{experience.role}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-primary">{experience.duration}</p>
                </Card>
            </div>
            <div className="md:col-span-3">
                 <ul className="space-y-4 text-lg text-foreground/80">
                    {experience.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <svg className="h-6 w-6 flex-shrink-0 mt-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export function Experience() {
    return (
        <section id="experience" className="bg-background py-24 sm:py-32">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Professional Journey
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
                        A timeline of my key roles and accomplishments in the tech industry.
                    </p>
                </div>

                <div className="mt-24 space-y-24">
                    {experiences.map((exp, index) => (
                       <ExperienceItem key={exp.value} experience={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
