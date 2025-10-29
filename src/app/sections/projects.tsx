
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink, Play, Square } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const projects = [
   {
    title: "Nubenta Care",
    description: "An AI-driven health management system designed to digitize hospital operations. It connects admin, doctors, pharmacy, lab, and finance into one intelligent platform.",
    tech: ["Node.js", "PostgreSQL", "AI/NLP", "SendGrid"],
    image: PlaceHolderImages.find(p => p.id === "project-nubenta"),
    link: "#",
    role: "Founder & Lead Developer",
    audioUrl: "/audio/nubenta-care.mp3"
  },
  {
    title: "Nyra Connect",
    description: "A scalable modular system for an AI-powered productivity app. Features include journals, AI insights, focus sessions, and notifications.",
    tech: [".NET 8", "React", "PostgreSQL", "Clean Architecture"],
    image: PlaceHolderImages.find(p => p.id === "project-nyra"),
    link: "#",
    role: "Founder & Lead Developer",
    audioUrl: "/audio/nyra-connect.mp3"
  },
  {
    title: "InvoTrek",
    description: "A multi-tenant SaaS for smart document automation. Features AI-assisted field detection and inventory tracking.",
    tech: ["Node.js", "PostgreSQL", "Google AI", "SaaS"],
    image: PlaceHolderImages.find(p => p.id === "project-invotrek"),
    link: "https://invotrek.netlify.app",
    role: "Creator & Lead Developer",
    audioUrl: "/audio/invotrek.mp3"
  },
  {
    title: "BuildTrack Pro",
    description: "A multi-tenant web app for contractors to track construction expenses, material usage, and worker payments.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-buildtrack"),
    link: "#",
    role: "Lead Developer",
    audioUrl: "/audio/buildtrack-pro.mp3"
  },
  {
    title: "SmartEd ERP",
    description: "A comprehensive school ERP for managing attendance, grades, and payments, featuring role-based security.",
    tech: ["ASP.NET Core 8", "PostgreSQL", "MVC"],
    image: PlaceHolderImages.find(p => p.id === "project-smarterp"),
    link: "#",
    role: "Lead Developer",
    audioUrl: "/audio/smarted-erp.mp3"
  },
   {
    title: "BulkPay",
    description: "An automated salary payment system designed for companies to manage and disburse salaries to employees efficiently.",
    tech: [".NET", "MVC", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-bulkpay"),
    link: "#",
    role: "Backend Developer",
    audioUrl: "/audio/bulkpay.mp3"
  },
  {
    title: "Adustech Bus Tracker",
    description: "A real-time bus booking and tracking platform designed for university students to manage transportation.",
    tech: ["Node.js", "Firebase"],
    image: PlaceHolderImages.find(p => p.id === "project-admission"),
    link: "https://bus-tracker-i4dn.vercel.app/",
    role: "Full-Stack Developer",
    audioUrl: "/audio/adustech-bus-tracker.mp3"
  },
  {
    title: "Rewardify",
    description: "A gamification platform that helps businesses increase user engagement by integrating a points-based reward system.",
    tech: ["Node.js", "PostgreSQL", "React", "Gamification"],
    image: PlaceHolderImages.find(p => p.id === "project-rewardify"),
    link: "#",
    role: "Full-Stack Developer",
    audioUrl: "/audio/rewardify.mp3"
  },
  {
    title: "Rental Management System",
    description: "A system for property owners to manage rental properties, track payments, and handle maintenance requests.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Software Engineer",
    audioUrl: "/audio/rental-management-system.mp3"
  },
  {
    title: "Online Management System",
    description: "A general-purpose system for small businesses to track inventory, sales, and customer data.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "blog-scaling-systems"),
    link: "#",
    role: "Web Developer",
    audioUrl: "/audio/online-management-system.mp3"
  }
];

type Project = (typeof projects)[0];

const ProjectAudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed:", e);
      });
    }
  };
  
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handlePause);

    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handlePause);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <Button
        size="lg"
        variant="outline"
        className="rounded-full px-8"
        onClick={togglePlayback}
      >
        {isPlaying ? (
          <Square className="mr-2 h-5 w-5" />
        ) : (
          <Play className="mr-2 h-5 w-5" />
        )}
        {isPlaying ? 'Stop' : 'Listen to Summary'}
      </Button>
    </>
  );
};


const ProjectItem = ({ project, index }: { project: Project, index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isReversed = index % 2 !== 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2, once: true }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);
    
    return (
        <div ref={ref} className={cn("grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-1000", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className={cn("group relative", isReversed && "lg:order-last")}>
                <Card className="overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
                    {project.image && (
                         <Image
                            src={project.image.imageUrl}
                            alt={project.title}
                            width={1200}
                            height={900}
                            className="aspect-video w-full object-cover"
                            data-ai-hint={project.image.imageHint}
                        />
                    )}
                </Card>
            </div>
            <div className="space-y-6">
                <div>
                   <p className="font-semibold text-primary">{project.role}</p>
                    <h3 className="mt-2 font-headline text-3xl font-bold text-foreground">{project.title}</h3>
                </div>
                <p className="text-lg text-foreground/80">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                    {project.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="px-3 py-1 text-sm">{t}</Badge>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4">
                     <Button asChild size="lg" className="rounded-full px-8">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <ProjectAudioPlayer audioUrl={project.audioUrl} />
                </div>
            </div>
        </div>
    )
}

export function Projects() {
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
                
                <div className="mt-24 space-y-24">
                    {projects.map((project, index) => (
                        <ProjectItem key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
