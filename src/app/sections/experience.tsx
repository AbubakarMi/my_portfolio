
"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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
        <div
            ref={itemRef}
            className={cn(
                "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                "transition-all duration-700 ease-out"
            )}
        >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 z-10">
                <exp.icon className="h-5 w-5"/>
            </div>
            <div className={cn("w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] rounded-2xl p-6", isLeft ? "order-1 text-right" : "order-0")}>
                <div className="space-y-3">
                    <p className="font-semibold text-primary text-lg">{exp.role}</p>
                    <h3 className="font-headline text-2xl font-bold text-foreground">
                        <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            {exp.company}
                        </Link>
                    </h3>
                    <p className="font-medium text-foreground/60 text-sm">{exp.duration}</p>
                    <ul className={cn(
                        "space-y-2 text-foreground/80 list-disc pl-5",
                        isLeft ? "text-right list-inside" : "text-left"
                    )}>
                        {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
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
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" aria-hidden="true" />
          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.company} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
