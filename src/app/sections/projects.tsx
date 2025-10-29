
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink, Loader2, Play, Square } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { summarizeProject } from '@/ai/flows/summarize-project-flow';
import { textToSpeech } from '@/ai/flows/tts-flow';

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

type Project = (typeof projects)[0];
type Cache = {
    text?: string;
    audio?: string;
};
type ProjectCache = Map<string, Cache>;

type AudioPlayerState = 'idle' | 'loading' | 'playing' | 'error';

const ProjectAudioPlayer = ({ project, cache }: { project: Project; cache: ProjectCache }) => {
    const [state, setState] = useState<AudioPlayerState>('idle');
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio();
        const audio = audioRef.current;
        
        const onPlay = () => setState('playing');
        const onPause = () => setState('idle');
        const onEnded = () => setState('idle');

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        
        return () => {
            if (audio) {
                audio.pause();
                audio.removeEventListener('play', onPlay);
                audio.removeEventListener('pause', onPause);
                audio.removeEventListener('ended', onEnded);
            }
        };
    }, []);

    const handleAudioPlayback = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (state === 'playing') {
            audio.pause();
            audio.currentTime = 0;
            return;
        }

        const projectCache = cache.get(project.title) || {};
        if (projectCache.audio) {
            audio.src = projectCache.audio;
            audio.play().catch(() => setState('error'));
            return;
        }

        setState('loading');
        try {
            const summaryResult = await summarizeProject({ title: project.title, description: project.description, tech: project.tech });
            const summaryText = summaryResult.summaryScript;
            
            const ttsResult = await textToSpeech({ text: summaryText });
            const audioDataUri = ttsResult.audioDataUri;
            
            cache.set(project.title, { text: summaryText, audio: audioDataUri });
            audio.src = audioDataUri;
            audio.play().catch(() => setState('error'));
        } catch (error) {
            console.error("Failed to generate or play audio for", project.title, error);
            setState('error');
        }
    };
    
    return (
        <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8"
            onClick={handleAudioPlayback}
            disabled={state === 'loading'}
        >
            {state === 'loading' && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {state === 'playing' && <Square className="mr-2 h-5 w-5" />}
            {(state === 'idle' || state === 'error') && <Play className="mr-2 h-5 w-5" />}

            {state === 'playing' ? 'Stop' : 'Listen to Summary'}
        </Button>
    );
};


const ProjectItem = ({ project, index, projectCache }: { project: Project, index: number, projectCache: ProjectCache }) => {
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
                    <ProjectAudioPlayer project={project} cache={projectCache} />
                </div>
            </div>
        </div>
    )
}

export function Projects() {
    const projectCache = useRef(new Map<string, Cache>()).current;

    useEffect(() => {
        // Silently pre-fetch text summaries and audio for all projects in the background.
        projects.forEach(project => {
            const cachedItem = projectCache.get(project.title);
            if (!cachedItem || !cachedItem.audio) {
                summarizeProject({ title: project.title, description: project.description, tech: project.tech })
                .then(summaryResult => {
                    const summaryText = summaryResult.summaryScript;
                    projectCache.set(project.title, { text: summaryText }); // Cache text first
                    return textToSpeech({ text: summaryText });
                })
                .then(ttsResult => {
                    const existingCache = projectCache.get(project.title);
                    projectCache.set(project.title, { ...existingCache, audio: ttsResult.audioDataUri });
                })
                .catch(error => {
                    // Fail silently. User can still generate on-demand by clicking.
                    console.error(`Silent audio pre-fetch failed for ${project.title}:`, error);
                });
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <ProjectItem key={project.title} project={project} index={index} projectCache={projectCache} />
                    ))}
                </div>
            </div>
        </section>
    );
}
