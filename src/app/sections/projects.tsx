
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const projects = [
   {
    title: "Nubenta Care",
    description: "An AI-driven health management system designed to digitize hospital operations. It connects admin, doctors, pharmacy, lab, and finance into one intelligent platform.",
    tech: ["Node.js", "PostgreSQL", "AI/NLP", "SendGrid"],
    image: PlaceHolderImages.find(p => p.id === "project-nubenta"),
    link: "#",
    role: "Founder & Lead Developer"
  },
  {
    title: "Nyra Connect",
    description: "A scalable modular system for an AI-powered productivity app. Features include journals, AI insights, focus sessions, and notifications.",
    tech: [".NET 8", "React", "PostgreSQL", "Clean Architecture"],
    image: PlaceHolderImages.find(p => p.id === "project-nyra"),
    link: "#",
    role: "Founder & Lead Developer"
  },
  {
    title: "InvoTrek",
    description: "A multi-tenant SaaS for smart document automation. Features AI-assisted field detection and inventory tracking.",
    tech: ["Node.js", "PostgreSQL", "Google AI", "SaaS"],
    image: PlaceHolderImages.find(p => p.id === "project-invotrek"),
    link: "https://invotrek.netlify.app",
    role: "Creator & Lead Developer"
  },
  {
    title: "BuildTrack Pro",
    description: "A multi-tenant web app for contractors to track construction expenses, material usage, and worker payments.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-buildtrack"),
    link: "#",
    role: "Lead Developer"
  },
  {
    title: "SmartEd ERP",
    description: "A comprehensive school ERP for managing attendance, grades, and payments, featuring role-based security.",
    tech: ["ASP.NET Core 8", "PostgreSQL", "MVC"],
    image: PlaceHolderImages.find(p => p.id === "project-smarterp"),
    link: "#",
    role: "Lead Developer"
  },
   {
    title: "BulkPay",
    description: "An automated salary payment system designed for companies to manage and disburse salaries to employees efficiently.",
    tech: [".NET", "MVC", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-bulkpay"),
    link: "#",
    role: "Backend Developer"
  },
  {
    title: "Adustech Bus Tracker",
    description: "A real-time bus booking and tracking platform designed for university students to manage transportation.",
    tech: ["Node.js", "Firebase"],
    image: PlaceHolderImages.find(p => p.id === "project-admission"),
    link: "https://bus-tracker-i4dn.vercel.app/",
    role: "Full-Stack Developer"
  },
  {
    title: "Rewardify",
    description: "A gamification platform that helps businesses increase user engagement by integrating a points-based reward system.",
    tech: ["Node.js", "PostgreSQL", "React", "Gamification"],
    image: PlaceHolderImages.find(p => p.id === "project-rewardify"),
    link: "#",
    role: "Full-Stack Developer"
  },
  {
    title: "Rental Management System",
    description: "A system for property owners to manage rental properties, track payments, and handle maintenance requests.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Software Engineer"
  },
  {
    title: "Online Management System",
    description: "A general-purpose system for small businesses to track inventory, sales, and customer data.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "blog-scaling-systems"),
    link: "#",
    role: "Web Developer"
  }
];

const ProjectCard = ({ project, isVisible }: { project: typeof projects[0], isVisible: boolean }) => (
  <Link href={project.link} target="_blank" rel="noopener noreferrer" className="group block">
    <Card
      className={cn(
        "overflow-hidden rounded-2xl h-full flex flex-col transition-all duration-500 ease-out",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
    >
      <div className="relative overflow-hidden">
        {project.image && (
          <Image
            src={project.image.imageUrl}
            alt={project.title}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={project.image.imageHint}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 text-white">
            <ExternalLink className="h-5 w-5" />
            <span className="font-semibold">View Project</span>
          </div>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="font-headline text-xl font-bold text-foreground">{project.title}</h3>
        <p className="mt-2 flex-1 text-base text-foreground/80">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="px-2 py-1 text-xs">{t}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  </Link>
);


export function Projects() {
  const [visibleCount, setVisibleCount] = useState(6);
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
          { threshold: 0.1, triggerOnce: true }
        );
        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  const showMoreProjects = () => {
    setVisibleCount(projects.length);
  };

  return (
    <section id="projects" className="bg-primary/5 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            A selection of projects that showcase my skills in AI, SaaS development, and system architecture.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, visibleCount).map((project, index) => (
            <div key={project.title} ref={el => itemsRef.current[index] = el}>
                <ProjectCard project={project} isVisible={!!visibleItems[index]} />
            </div>
          ))}
        </div>

        {visibleCount < projects.length && (
            <div className="mt-16 text-center">
                <Button size="lg" onClick={showMoreProjects} className="rounded-full px-8">
                    Show More Projects
                </Button>
            </div>
        )}

      </div>
    </section>
  );
}
