
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

const ExperienceItem = ({ 
  experience, 
  isLeft, 
}: { 
  experience: typeof experiences[0], 
  isLeft: boolean, 
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current!);
                }
            },
            { threshold: 0.1 }
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
    
    const directionClass = isLeft ? 'md:flex-row' : 'md:flex-row-reverse';
    const slideInClass = isLeft ? 'md:translate-x-0' : 'md:translate-x-0';
    const initialPositionClass = isLeft ? 'md:-translate-x-10' : 'md:translate-x-10';

    return (
        <div 
          ref={ref} 
          className={cn(
            "flex justify-center md:justify-between items-center w-full transition-all duration-1000 ease-out",
            directionClass,
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
            {/* Content */}
            <div className={cn(
                "w-full md:w-5/12 p-4"
            )}>
                <div className="bg-card p-6 rounded-xl shadow-lg border border-border/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <p className="text-primary font-semibold mb-1">{experience.duration}</p>
                    <h3 className="font-headline text-xl font-bold text-foreground mb-1">{experience.role}</h3>
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
            </div>

            {/* Timeline Node */}
            <div className="hidden md:flex w-2/12 justify-center">
                <div className="relative h-full">
                    <div className="w-1 h-full bg-border"></div>
                    <div className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-500",
                      isVisible ? "scale-100" : "scale-75"
                    )}>
                        <div className="h-6 w-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                            <experience.icon className="h-4 w-4" />
                        </div>
                         {isVisible && <div className="absolute h-10 w-10 rounded-full bg-primary/20 animate-ping -z-10"></div>}
                    </div>
                </div>
            </div>

            {/* Spacer for the other side on desktop */}
            <div className="hidden md:block w-5/12"></div>
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

                <div className="mt-24 flex flex-col items-center gap-16">
                    {experiences.map((exp, index) => (
                       <ExperienceItem 
                          key={exp.value} 
                          experience={exp} 
                          isLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
