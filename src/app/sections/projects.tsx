
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: "Nyra Meet",
    description: "A meeting application that provides live transcription and accessible summaries after meetings. Also developing a chat application to complement the meeting functions.",
    tech: ["Next.js", "TypeScript", "Google AI", "WebRTC"],
    image: PlaceHolderImages.find(p => p.id === "project-nyra"),
    link: "#",
    role: "Founder & Lead Developer"
  },
  {
    title: "BuildTrack Pro",
    description: "A multi-tenant web app for contractors to track construction expenses, material usage, and worker payments. Monitor daily spending, manage budgets, and prevent losses.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-buildtrack"),
    link: "#",
    role: "Lead Developer"
  },
  {
    title: "InvoTrek",
    description: "A multi-tenant SaaS for smart document automation. Upload templates, fill client data, and auto-generate professional Word or PDF files. Features AI-assisted field detection.",
    tech: ["React", "Node.js", "Google AI", "SaaS"],
    image: PlaceHolderImages.find(p => p.id === "project-invotrek"),
    link: "#",
    role: "Creator & Lead Developer"
  },
  {
    title: "Online Admission System",
    description: "A system for students to register, log in, and submit admission details with documents. Admins can review, verify, and manage applications via a secure dashboard.",
    tech: ["Node.js", "Express", "MongoDB", "EJS"],
    image: PlaceHolderImages.find(p => p.id === "project-admission"),
    link: "#",
    role: "Backend Developer"
  },
  {
    title: "Rental Management System",
    description: "A system to rent houses, apartments, and event centers with secure bookings, payments, reviews, and role-based dashboards for renters, owners, and admins.",
    tech: ["Node.js", "Express", "React", "TypeScript"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Full-Stack Developer"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <Card 
            ref={cardRef}
            className={cn(
                "group flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-500",
                isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0',
                "hover:shadow-2xl hover:-translate-y-2"
            )}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="relative overflow-hidden">
                {project.image && (
                    <Image
                        src={project.image.imageUrl}
                        alt={project.image.description}
                        width={800}
                        height={600}
                        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={project.image.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:backdrop-blur-sm">
                    <p className="mb-4 text-sm">{project.description}</p>
                    <Link href={project.link} className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105">
                        View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
            <CardHeader className="flex-grow bg-card">
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                <CardDescription className="font-medium text-primary">
                    {project.role}
                </CardDescription>
            </CardHeader>
            <div className="bg-card p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                </div>
            </div>
        </Card>
    );
};


export function Projects() {
  return (
    <section id="projects" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            A selection of projects that showcase my skills and passion for building software.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
