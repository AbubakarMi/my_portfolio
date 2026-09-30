"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Play, Square, Loader2, ArrowUpRight, ChevronDown, Layers } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { textToSpeech } from '@/ai/flows/tts-flow';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

const projects = [
  {
    title: "Book Direct",
    description: "A platform for booking from thousands of hotels and shortlet apartments across Nigeria, including Lagos, Abuja, Ibadan, Port Harcourt, Enugu, and Kano. Part of the Staylier Group, it pairs guest-facing search and booking with tools for hotel owners and shortlet managers. I help build its scalable backend with clean architecture.",
    status: "Live",
    tech: ["Next.js", "Node.js", "Hotel Booking"],
    image: PlaceHolderImages.find(p => p.id === "project-bookdirect"),
    video: "/bookdirect-demo.mp4",
    // The recording includes the browser toolbar; anchor to the bottom so it is cropped out.
    mediaClass: "object-bottom",
    link: "https://bookdirect.ng",
    role: "Software Engineer @ Book Direct",
    summaryScript: "Book Direct is a platform for booking from thousands of hotels and shortlet apartments across Nigeria, in cities like Lagos, Abuja, Ibadan, Port Harcourt, Enugu, and Kano. It is part of the Staylier Group and pairs guest-facing search and booking with tools for hotel owners and shortlet managers. It is built with a Next.js frontend and a Node.js backend, and I help build its scalable, clean-architecture backend as a remote Software Engineer."
  },
  {
    title: "Kano State Pension Management System",
    description: "A production pension administration platform for the Kano State pension system, managing records for over 50,000 pensioners. Covers pensioner enrollment, data verification, and disbursement tracking, with role-based admin dashboards for pension board staff to manage records, monitor verification status, and generate reports.",
    status: "Live",
    metric: "50,000+ pensioners",
    note: "The dashboard shows verified, active pensioners. The remaining records are deceased, unverified, or disabled.",
    tech: ["ASP.NET Core MVC", "PostgreSQL", "EF Core", "RBAC"],
    image: PlaceHolderImages.find(p => p.id === "project-pension"),
    link: "#",
    role: "Full-Stack Developer @ Hubuk Technology",
    summaryScript: "The Kano State Pension Management System is a production pension administration platform that now manages records for over fifty thousand pensioners. As a full-stack developer at Hubuk Technology, I built the backend modules and database schema for pensioner enrollment, data verification, and disbursement tracking, and delivered role-based admin dashboards so pension board staff can manage records, monitor verification status, and generate reports. It's built with ASP.NET Core MVC, PostgreSQL, and EF Core."
  },
  {
    title: "KrediNou",
    description: "A multi-currency fintech super-app connecting the Haitian diaspora across North America, the Dominican Republic, and Mexico with families back home. It combines USD/HTG/DOP/MXN wallets, instant P2P transfers, international remittance, credit scoring and micro-loans, an agent cash network, and a merchant and marketplace suite, built on an auditable double-entry ledger with end-to-end encryption and RBAC. I rebuilt it from a non-working app that had processed $0; it is now live with over $73,869 processed and settled, and over $12,299 in loans recovered.",
    status: "Live",
    metric: "$73,869 settled",
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma 7", "NextAuth", "Fintech"],
    image: PlaceHolderImages.find(p => p.id === "project-kredinou"),
    video: "/kredinou-demo.mp4",
    link: "https://www.kredinou.com/",
    role: "Lead Developer",
    summaryScript: "KrediNou is a cross-border fintech super-app for the Haitian diaspora. It lets users hold multi-currency wallets in US dollars, Haitian gourdes, Dominican pesos, and Mexican pesos, send instant peer-to-peer transfers, and move money home through live remittance corridors backed by a real agent cash network. It also offers credit scoring, micro-loans, and a merchant and marketplace suite, all built on an auditable double-entry ledger. When I joined as Lead Developer the existing app was not working and had processed nothing. I rebuilt it and took it live, and it has since processed and settled over seventy-three thousand dollars and helped recover over twelve thousand dollars in loans.",
  },
  {
    title: "BizScan360",
    description: "A Business Health Evaluation Platform I built from the ground up, trusted by 500+ growing businesses worldwide. It turns complex financial and operational data into a clear 0-100 Business Health Score, with automated KPI analysis, one-click PDF reports, interactive dashboards with trend charts and anomaly detection, and a multi-tier subscription model.",
    status: "Live",
    metric: "2,800+ users",
    tech: ["Next.js", "Node.js", "PostgreSQL", "REST APIs"],
    image: PlaceHolderImages.find(p => p.id === "project-bizscan360"),
    video: "/bizscan360-demo.mp4",
    link: "https://bizscan360.com",
    role: "Lead Developer",
    summaryScript: "BizScan360 is a business health evaluation platform that helps companies understand their financial and operational performance. It calculates a numerical health score from 0 to 100, identifies risks and opportunities, and provides automated KPI analysis through interactive dashboards. It's built for startups, SMEs, and investors to make data-driven decisions quickly and efficiently."
  },
  {
    title: "SFMP: Sustainable Finance Marketplace",
    description: "A renewable-energy structured-finance marketplace connecting borrowers, financiers, and administrators, built for and powered by Sterling Bank. I worked across the stack on features supporting the end-to-end structured-finance workflow between borrowers and financiers.",
    status: "Live",
    metric: "Built for Sterling Bank",
    tech: ["Full-Stack", "Structured Finance", "Renewable Energy"],
    image: PlaceHolderImages.find(p => p.id === "project-sfmp"),
    video: "/sterloan-demo.mp4",
    // The recording includes the browser toolbar; anchor to the bottom so it is cropped out.
    mediaClass: "object-bottom",
    link: "https://sterloan.hubuk.ng",
    role: "Full-Stack Developer @ Hubuk Technology",
    summaryScript: "SFMP, the Sustainable Finance Marketplace, is a renewable-energy structured-finance marketplace built for and powered by Sterling Bank. It connects borrowers, financiers, and administrators on one platform. As a full-stack developer at Hubuk Technology, I worked on the features that support the end-to-end structured-finance workflow between borrowers and financiers."
  },
  {
    title: "AbiiApp",
    description: "A social super-app combining a mobile social network, AI-powered content moderation and ranking, an in-app wallet and marketplace, and a unified social inbox. The Laravel backend integrates Facebook, Instagram, X, Threads, and LinkedIn APIs into a single inbox. Delivered end-to-end as a client project through Infira Technology.",
    status: "Live",
    metric: "Google Play & App Store",
    tech: ["PHP", "Laravel", "Mobile", "AI Moderation"],
    image: undefined,
    link: "#",
    role: "Lead Developer · Infira Technology",
    summaryScript: "AbiiApp is a social super-app that combines a mobile social network, AI-powered content moderation and ranking, an in-app wallet and marketplace, and a unified social inbox. I led full-stack development and architected a Laravel backend that brings Facebook, Instagram, X, Threads, and LinkedIn into a single inbox. I delivered it end to end as a freelance contract through Infira Technology, and it is now live on the Google Play Store and the Apple App Store."
  },
  {
    title: "Vitalink",
    description: "A smart patient monitoring and vital-signs tracking platform with real-time health data pipelines and role-based clinician dashboards. Integrates with Clinex, Techserv Intelligence's broader AI-driven healthcare ecosystem.",
    status: "In Development",
    tech: ["C# .NET", "React", "PostgreSQL", "Health Data"],
    image: PlaceHolderImages.find(p => p.id === "project-vitalink"),
    video: "/vitalink-demo.mp4",
    link: "https://vitalink.tech",
    role: "Software Engineer @ Techserv Intelligence",
    summaryScript: "Vitalink is a smart patient monitoring platform that tracks vital signs through real-time health data pipelines. It powers clinical alerting systems and role-based dashboards for care teams, and integrates with Clinex, Techserv Intelligence's broader AI-driven healthcare ecosystem. It's built with C# .NET, React, and PostgreSQL for secure, compliant performance."
  },
  {
    title: "Forge",
    description: "An AI-powered bulk payment and disbursement platform for African businesses. The Python AI engine validates and auto-corrects bank account details, including wrong numbers, mismatched names, duplicates, and bank-name normalisation, then disburses clean data with a near-zero failure rate.",
    status: "Pre-Launch",
    tech: ["Python", ".NET", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-forge"),
    link: "https://forgeapis.xyz",
    role: "Founder",
    summaryScript: "Forge is an AI-powered bulk payment and disbursement platform for African businesses. Its Python AI engine validates and auto-corrects bank account details, then disburses clean data with a near-zero failure rate. I founded Forge after personally managing a thirty-thousand-beneficiary disbursement that required weeks of manual cleaning, and built it with a Python AI layer, a .NET backend, a React frontend, and PostgreSQL."
  },
  {
    title: "Anvil",
    description: "A cross-border fintech mobile app enabling seamless international money transfers. A sender in Nigeria or any country initiates a transfer and the recipient automatically receives funds in their local currency, with no P2P exchange or manual conversion step. Built as a product under Forge, targeting the African remittance corridor.",
    status: "Under Development",
    tech: ["Flutter", ".NET", "PostgreSQL", "Fintech"],
    image: PlaceHolderImages.find(p => p.id === "project-anvil"),
    link: "#",
    role: "Founder & Lead Developer",
    summaryScript: "Anvil is a cross-border fintech mobile app for seamless international money transfers. A sender in Nigeria or any country initiates a transfer and the recipient automatically receives funds in their local currency, with no peer-to-peer exchange or manual conversion step. Built in Flutter with a .NET backend and PostgreSQL as a product under Forge, it targets the African remittance corridor."
  },
  {
    title: "AJ Academy",
    description: "An interactive English learning web app featuring live classes, structured lessons, and progress tracking for students and professionals.",
    tech: ["Web App", "Live Classes", "Education", "Interactive Learning"],
    image: PlaceHolderImages.find(p => p.id === "project-ajacademy"),
    video: "/aj-academy-demo.mp4",
    link: "https://aj-academy.netlify.app",
    role: "Lead Developer",
    summaryScript: "AJ Academy is a specialized English learning platform that connects students and professionals with live interactive classes. It features structured lessons in grammar, vocabulary, and speaking, alongside real-time instructor engagement. The platform offers a seamless web-based experience with progress tracking to help learners reach their language proficiency goals efficiently."
  },
  {
    title: "Appointment Booking System",
    description: "A scalable, multi-industry booking platform serving health clinics, beauty salons, and hospitality. Supports multi-role access, dynamic service and slot configuration, real-time availability checks, and automated confirmation emails. Designed for multi-tenancy.",
    status: "Delivered",
    tech: ["ASP.NET Core 8", "PostgreSQL", "JWT", "SendGrid"],
    image: PlaceHolderImages.find(p => p.id === "project-booking"),
    link: "#",
    role: "Backend Developer",
    summaryScript: "This Appointment Booking System is a scalable, multi-industry platform serving health clinics, beauty salons, and hospitality businesses. Built with ASP.NET Core 8 and PostgreSQL, it supports multi-role access, dynamic service and slot configuration, real-time availability checks, and automated confirmation emails via SendGrid, all designed for multi-tenancy."
  },
  {
    title: "Hospital Management System",
    description: "A multi-role Hospital Management System digitising core clinical and administrative workflows. Covers patient registration, appointment scheduling with conflict detection, multi-tier billing, pharmacy inventory tracking, and real-time staff dashboards with role-based views.",
    status: "Delivered",
    tech: ["Node.js", "PostgreSQL", "Express", "Firebase Auth"],
    image: PlaceHolderImages.find(p => p.id === "project-hospital"),
    link: "#",
    role: "Full-Stack Developer",
    summaryScript: "This Hospital Management System is a multi-role platform that digitises core clinical and administrative workflows. Built with Node.js, Express, and PostgreSQL, it covers patient registration, appointment scheduling with conflict detection, multi-tier billing, pharmacy inventory tracking, and real-time staff dashboards with role-based views."
  },
  {
    title: "Nubenta Care",
    description: "An AI-driven health management system designed to digitize hospital operations. It connects admin, doctors, pharmacy, lab, and finance into one intelligent platform.",
    tech: ["Node.js", "PostgreSQL", "AI/NLP", "SendGrid"],
    image: PlaceHolderImages.find(p => p.id === "project-nubenta"),
    link: "#",
    role: "Founder & Lead Developer",
    summaryScript: "Nubenta Care is an AI-powered health management system that digitizes and connects all hospital departments. By integrating administration, doctors, and labs, it streamlines operations and improves patient care through smart, automated workflows."
  },
  {
    title: "InvoTrek",
    description: "A multi-tenant SaaS for smart document automation. Features AI-assisted field detection and inventory tracking.",
    tech: ["Node.js", "PostgreSQL", "Google AI", "SaaS"],
    image: PlaceHolderImages.find(p => p.id === "project-invotrek"),
    link: "https://invotrek.netlify.app",
    role: "Creator & Lead Developer",
    summaryScript: "InvoTrek is a multi-tenant SaaS platform designed for intelligent document automation. Using Node.js and Google AI, it offers features like AI-assisted field detection and inventory management to streamline business workflows."
  },
  {
    title: "Adustech Bus Tracker",
    description: "A real-time bus booking and tracking platform designed for university students to manage transportation.",
    tech: ["Node.js", "Firebase"],
    image: PlaceHolderImages.find(p => p.id === "project-admission"),
    link: "https://bus-tracker-i4dn.vercel.app/",
    role: "Full-Stack Developer",
    summaryScript: "The Adustech Bus Tracker is a real-time booking and tracking platform for university transportation. Using Node.js and Firebase, it provides students and administrators with a seamless way to manage campus transit."
  },
  {
    title: "BuildTrack Pro",
    description: "A multi-tenant web app for contractors to track construction expenses, material usage, and worker payments.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-buildtrack"),
    link: "#",
    role: "Lead Developer",
    summaryScript: "BuildTrack Pro is a web platform for construction management. Built with React and Node.js, it empowers contractors to track expenses, monitor material usage, and manage worker payments through an intuitive, real-time dashboard."
  },
  {
    title: "SmartEd ERP",
    description: "A comprehensive school ERP for managing attendance, grades, and payments, featuring role-based security.",
    tech: ["ASP.NET Core 8", "PostgreSQL", "MVC"],
    image: PlaceHolderImages.find(p => p.id === "project-smarterp"),
    link: "#",
    role: "Lead Developer",
    summaryScript: "SmartEd ERP is a comprehensive school management system built with ASP.NET Core. It simplifies administrative tasks by managing attendance, grades, and payments, all secured with a robust, role-based access control system."
  },
  {
    title: "BulkPay",
    description: "An automated salary payment system designed for companies to manage and disburse salaries to employees efficiently.",
    tech: [".NET", "MVC", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-bulkpay"),
    link: "#",
    role: "Backend Developer",
    summaryScript: "BulkPay is an automated salary payment system developed with .NET. It streamlines payroll for companies, enabling efficient management and disbursement of employee salaries through a secure and reliable platform."
  },
  {
    title: "Rewardify",
    description: "A gamification platform that helps businesses increase user engagement by integrating a points-based reward system.",
    tech: ["Node.js", "PostgreSQL", "React", "Gamification"],
    image: PlaceHolderImages.find(p => p.id === "project-rewardify"),
    link: "#",
    role: "Full-Stack Developer",
    summaryScript: "Rewardify is a gamification platform that boosts user engagement. By integrating a points-based reward system using React and Node.js, it helps businesses incentivize and retain their users effectively."
  },
  {
    title: "Rental Management System",
    description: "A system for property owners to manage rental properties, track payments, and handle maintenance requests.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "project-rental"),
    link: "#",
    role: "Software Engineer",
    summaryScript: "This Rental Management System allows property owners to efficiently manage their rental properties. Built with React and Node.js, it features payment tracking, maintenance request handling, and tenant management."
  },
  {
    title: "Online Management System",
    description: "A general-purpose system for small businesses to track inventory, sales, and customer data.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: PlaceHolderImages.find(p => p.id === "blog-scaling-systems"),
    link: "#",
    role: "Lead Developer",
    summaryScript: "This Online Management System is a versatile tool for small businesses. It helps track inventory, monitor sales, and manage customer data through a clean and simple interface built with React and Node.js."
  }
];

interface Project {
  title: string;
  description: string;
  status?: string;
  metric?: string;
  /** Small print shown under the description, e.g. to explain a screenshot. */
  note?: string;
  tech: string[];
  image: (typeof PlaceHolderImages)[0] | undefined;
  video?: string;
  mediaClass?: string;
  link: string;
  role: string;
  summaryScript: string;
}

/** How many projects show before the visitor expands the grid. */
const INITIAL_COUNT = 9;

const ProjectAudioPlayer = ({ project }: { project: Project }) => {
  const [audioState, setAudioState] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle');
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleAudioPlayback = async () => {
    if (audioState === 'playing' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState('idle');
      return;
    }

    if (audioDataUri && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed:", e);
        setAudioState('error');
      });
      return;
    }

    setAudioState('loading');
    try {
      if (!project.summaryScript) {
        throw new Error("No summary script available for this project.");
      }
      const ttsResult = await textToSpeech({ text: project.summaryScript });
      setAudioDataUri(ttsResult.audioDataUri);
    } catch (error) {
      console.error("Failed to generate audio summary:", error);
      setAudioState('error');
      toast({
        variant: "destructive",
        title: "Audio Summary Failed",
        description: "Couldn't generate an audio summary for this project. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioDataUri]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const onPlay = () => setAudioState('playing');
      const onPause = () => setAudioState('idle');
      const onEnded = () => setAudioState('idle');

      audioElement.addEventListener('play', onPlay);
      audioElement.addEventListener('pause', onPause);
      audioElement.addEventListener('ended', onEnded);

      return () => {
        audioElement.removeEventListener('play', onPlay);
        audioElement.removeEventListener('pause', onPause);
        audioElement.removeEventListener('ended', onEnded);
      }
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      <Button
        size="sm"
        variant="ghost"
        className="rounded-full px-3 text-muted-foreground hover:bg-muted hover:text-primary"
        onClick={handleAudioPlayback}
        disabled={audioState === 'loading'}
      >
        {audioState === 'loading'
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : audioState === 'playing' ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {audioState === 'playing' ? 'Stop' : 'Listen'}
      </Button>
    </>
  );
};

const ProjectMedia = ({ project }: { project: Project }) => {
  const [isNear, setIsNear] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || !project.video) return;

    // Play only while on screen; the demo files are large.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play().catch(error => {
            console.warn("Video autoplay failed:", error);
          });
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.25 }
    );

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(currentRef);
    nearObserver.observe(currentRef);
    return () => {
      observer.disconnect();
      nearObserver.disconnect();
    };
  }, [project.video]);

  return (
    <div ref={ref} className="relative aspect-video w-full overflow-hidden bg-muted">
      {project.video ? (
        <video
          ref={videoRef}
          src={isNear ? project.video : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.image?.imageUrl}
          aria-label={`${project.title} demo`}
          className={cn("h-full w-full object-cover", project.mediaClass)}
        />
      ) : project.image ? (
        <Image
          src={project.image.imageUrl}
          alt={project.title}
          width={800}
          height={450}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn("h-full w-full object-cover transition-transform duration-700 group-hover:scale-105", project.mediaClass)}
          data-ai-hint={project.image.imageHint}
        />
      ) : (
        <div className="bg-grid flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/20 via-card to-card p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Layers className="h-6 w-6" />
          </div>
          <p className="font-headline text-lg font-bold leading-tight text-foreground text-balance">{project.title}</p>
        </div>
      )}

      {project.status && <span className={cn(
        "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur",
        project.status === 'Live'
          ? "bg-emerald-500/90 text-white"
          : "bg-black/60 text-white"
      )}>
        {project.status === 'Live' && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
        {project.status}
      </span>}
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="surface surface-glow group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
    <ProjectMedia project={project} />

    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <p className="font-code text-xs font-medium uppercase tracking-wider text-primary">{project.role}</p>
      <h3 className="mt-2 font-headline text-xl font-bold tracking-tight text-foreground">{project.title}</h3>
      {project.metric && (
        <p className="mt-1 text-sm font-medium text-foreground/80">{project.metric}</p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      {project.note && (
        <p className="mt-2 border-l-2 border-primary/40 pl-3 text-xs leading-relaxed text-muted-foreground">{project.note}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md bg-muted px-2 py-1 font-code text-xs text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-5">
        {project.link !== "#" ? (
          <Button asChild size="sm" className="group/btn rounded-full px-5">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">
            {project.status === 'Live' || project.status === 'Delivered' ? 'Not publicly linked' : 'Coming soon'}
          </span>
        )}
        <ProjectAudioPlayer project={project} />
      </div>
    </div>
  </article>
);

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="relative border-y border-border/70 bg-muted/40 py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Production systems in fintech, government, healthcare, and SaaS. Press Listen on any card for an AI-narrated summary."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 3) * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              className="h-12 rounded-full px-7 hover:bg-muted hover:text-foreground"
            >
              {showAll ? 'Show fewer projects' : `Show all ${projects.length} projects`}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", showAll && "rotate-180")} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
