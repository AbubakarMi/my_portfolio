

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: "Nyra Connect",
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
    role: "Full-Stack & Lead Developer"
  },
  {
    title: "Rental Management System",
    description: "A system to rent houses, apartments, and event centers with secure bookings, payments, reviews, and role-based dashboards for renters, owners, and admins.",
    tech: ["Node.js", "Express", "React", "TypeScript"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Full-Stack & Lead Developer"
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
        <Dialog>
            <Card
                ref={cardRef}
                className={cn(
                    "group flex flex-col overflow-hidden rounded-2xl border-transparent shadow-lg transition-all duration-500 bg-card",
                    isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0',
                    "hover:shadow-primary/20 hover:-translate-y-2"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
            >
                <DialogTrigger asChild>
                    <div className="relative overflow-hidden cursor-pointer">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 p-6">
                            <CardTitle className="text-xl font-bold text-primary-foreground shadow-black [text-shadow:0_1px_2px_var(--tw-shadow-color)]">{project.title}</CardTitle>
                            <CardDescription className="font-medium text-primary-foreground/80">
                                {project.role}
                            </CardDescription>
                        </div>
                    </div>
                </DialogTrigger>
                <div className="bg-card p-6 pt-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                    </div>
                </div>
            </Card>
            <DialogContent className="max-w-4xl p-0">
                 <div className="relative">
                    {project.image && (
                        <div className="overflow-hidden rounded-t-lg max-h-[400px]">
                            <Image
                                src={project.image.imageUrl}
                                alt={project.image.description}
                                width={1200}
                                height={675}
                                className="w-full object-cover"
                                data-ai-hint={project.image.imageHint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>
                    )}
                    <DialogHeader className="absolute bottom-0 left-0 p-8 text-white">
                        <DialogTitle className="text-4xl font-bold tracking-tight shadow-black [text-shadow:0_2px_4px_var(--tw-shadow-color)]">{project.title}</DialogTitle>
                        <p className="text-xl font-medium text-white/90 shadow-black [text-shadow:0_1px_2px_var(--tw-shadow-color)]">{project.role}</p>
                    </DialogHeader>
                </div>
                <div className="px-8 pb-8 pt-6 space-y-6">
                    <p className="text-muted-foreground text-base leading-relaxed">{project.description}</p>
                    <div>
                        <h4 className="font-semibold mb-3 text-foreground">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <Badge key={t} variant="secondary" className="text-sm py-1 px-3">{t}</Badge>
                            ))}
                        </div>
                    </div>
                     <div className="pt-4">
                        <Button asChild size="lg" className="rounded-full">
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Live Demo
                            </Link>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export function Projects() {
  return (
    <section id="projects" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-3">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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
