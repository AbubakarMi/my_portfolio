
"use client";

import Link from 'next/link';
import { Building, Rocket, GraduationCap, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export function Experience() {
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

                <div className="mt-16">
                    <Tabs defaultValue="hubuk" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                            {experiences.map((exp) => (
                                <TabsTrigger key={exp.value} value={exp.value} className="flex flex-col md:flex-row gap-2 items-center py-3">
                                    <exp.icon className="h-5 w-5" />
                                    <span>{exp.company}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {experiences.map((exp) => (
                             <TabsContent key={exp.value} value={exp.value}>
                                <Card className="mt-6 border-0 shadow-none animate-fade-in-up">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="font-headline text-2xl font-bold text-foreground">
                                                {exp.role} at{' '}
                                                <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="text-primary transition-colors hover:text-accent">
                                                    {exp.company}
                                                </Link>
                                            </CardTitle>
                                            <p className="text-sm font-medium text-primary">{exp.duration}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="mt-4 space-y-3 text-lg text-foreground/80 list-disc pl-5">
                                            {exp.description.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </section>
    );
}
