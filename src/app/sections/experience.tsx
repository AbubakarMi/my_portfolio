import { ArrowUpRight, MapPin } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

type Experience = {
  company: string;
  link: string;
  role: string;
  duration: string;
  location: string;
  /** Employment type shown under the role, e.g. "Part-time". */
  type?: string;
  /** Titles held at the same company, oldest first. */
  progression?: { year: string; title: string }[];
  description: string[];
  tech: string[];
  current: boolean;
};

const experiences: Experience[] = [
  {
    company: "Book Direct",
    link: "https://bookdirect.ng",
    role: "Software Engineer",
    duration: "Sep 2026 – Present",
    location: "Nigeria · Remote",
    type: "Full-time",
    description: [
      "Software engineer on bookdirect.ng, a platform for booking from thousands of hotels and shortlet apartments across Nigeria, including Lagos, Abuja, Port Harcourt, Enugu, and Kano.",
      "The platform, part of the Staylier Group, pairs guest-facing search and booking with tools for hotel owners and shortlet managers: a booking engine, metasearch, a channel manager, and property listings."
    ],
    tech: ["Next.js", "Node.js"],
    current: true
  },
  {
    company: "Kredinou",
    link: "https://kredinou.com",
    role: "Lead Developer",
    duration: "Feb 2026 – Present",
    location: "Remote",
    type: "Part-time",
    description: [
      "Joined when the existing app was not working and had processed $0, rebuilt it, and took it live. It has since processed and settled over $73,869.",
      "Helped the business recover over $12,299 in outstanding loans.",
      "Rebuilt it as a cross-border fintech super-app for the Haitian diaspora: multi-currency wallets (USD/HTG/DOP/MXN), instant P2P transfers, and international remittance over live FX corridors, on an auditable double-entry ledger with atomic, lock-protected money movement.",
      "Now supporting the live platform part-time, handling fixes and improvements as they are needed."
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth"],
    current: true
  },
  {
    company: "Forge",
    link: "https://forgeapis.xyz",
    role: "Founder",
    duration: "Jan 2024 – Present",
    location: "Kano, Nigeria",
    type: "Own venture",
    description: [
      "Architected Forge solo, an AI-powered bulk payment and disbursement platform for African businesses, using Python (AI layer), a .NET backend, a React frontend, and PostgreSQL.",
      "Engineered intelligent account validation, reducing bulk payment failure rates to near zero across large-scale datasets.",
      "Navigated pre-seed fundraising, investor negotiations, and accelerator applications while managing end-to-end product development.",
      "Produced full investor-facing materials: pitch deck, financial model, investment memo, and product demo."
    ],
    tech: ["Python", ".NET", "React", "PostgreSQL"],
    current: true
  },
  {
    company: "Techserv Intelligence",
    link: "#",
    role: "Software Engineer",
    duration: "May 2026 – Sep 2026",
    location: "Enugu, Nigeria · Remote",
    description: [
      "Built and maintained backend services for Clinex and Vitalink, AI-driven healthcare products, using C# .NET, React, and PostgreSQL.",
      "Collaborated with cross-functional teams to architect scalable APIs and implement secure, role-based access control across platform modules."
    ],
    tech: ["C# .NET", "React", "PostgreSQL"],
    current: false
  },
  {
    company: "Hubuk Technology Limited",
    link: "https://hubuk.ng",
    role: "Backend / Full-Stack Developer",
    duration: "2021 – Aug 2026",
    location: "Kano, Nigeria",
    progression: [
      { year: "2021", title: "Joined as trainee" },
      { year: "2022", title: "Intern" },
      { year: "2023", title: "Junior Backend Developer" },
      { year: "2024", title: "Backend Developer" },
      { year: "2025", title: "Full-Stack Developer" },
    ],
    description: [
      "Architected and deployed scalable REST APIs with ASP.NET Core, reducing dev cycle time by 25%.",
      "Engineered JWT authentication and RBAC systems securing access across all platform modules.",
      "Delivered budgeting, payments, and analytics dashboards powered by PostgreSQL and EF Core.",
      "Shipped the Kano State Pension Management System (ASP.NET Core MVC), now in production managing records for over 50,000 pensioners.",
      "Contributed as Full-Stack Developer to SFMP (Sustainable Finance Marketplace), a renewable-energy structured-finance marketplace connecting borrowers, financiers, and administrators, delivered for Sterling Bank.",
      "Drove Agile ceremonies across frontend, backend, and mobile squads; authored full technical documentation."
    ],
    tech: ["ASP.NET Core", "EF Core", "PostgreSQL", "JWT", "RBAC"],
    current: false
  },
  {
    company: "BizScan360",
    link: "https://bizscan360.com",
    role: "Lead Developer",
    duration: "Nov 2025 – Mar 2026",
    location: "Remote",
    description: [
      "Led full-stack development of a business health evaluation platform now trusted by 2,800+ users and 500+ businesses worldwide.",
      "Built automated KPI analysis, one-click PDF reports, and interactive dashboards with trend charts and anomaly detection.",
      "Architected the platform with Next.js, Node.js, and PostgreSQL behind a clean REST API and multi-tier subscriptions."
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "REST APIs"],
    current: false
  },
  {
    company: "FlexiSAF Solutions Limited",
    link: "https://flexisaf.com",
    role: "Backend Engineering Intern",
    duration: "Sep – Dec 2025",
    location: "Abuja, Nigeria",
    type: "Internship",
    description: [
      "Built backend features in Java and Spring; wrote optimised SQL for enterprise-grade modules.",
      "Collaborated with senior engineers to deliver secure, maintainable internal APIs and tools."
    ],
    tech: ["Java", "Spring", "SQL"],
    current: false
  },
  {
    company: "Torvix AI",
    link: "#",
    role: "Frontend Developer Intern",
    duration: "Sep – Oct 2025",
    location: "India · Remote",
    type: "Internship",
    description: [
      "Developed reusable React.js components for an AI-powered workflow automation platform.",
      "Optimised component state management and improved performance across key automation modules."
    ],
    tech: ["React.js"],
    current: false
  }
];

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Professional journey"
          description="Where I've worked and what I shipped there."
        />

        <div className="relative">
          {/* Timeline rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-2 w-px bg-border md:left-[calc(11rem+7px)] lg:left-[calc(14rem+7px)]"
          />

          <ol>

            {experiences.map((experience) => (
              <li key={`${experience.company}-${experience.role}`} className="relative pb-8 last:pb-0 sm:pb-10">
                <Reveal>
                  <div className="md:grid md:grid-cols-[11rem_1fr] lg:grid-cols-[14rem_1fr]">
                    {/* Date column (desktop) */}
                    <div className="hidden pr-8 pt-5 text-right md:block">
                      <p className="font-code text-sm font-medium text-foreground">{experience.duration}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{experience.location}</p>
                    </div>

                    <div className="relative pl-8 md:pl-10">
                      {/* Node */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-0 top-6 h-[15px] w-[15px] rounded-full border-2 border-background",
                          experience.current ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/50"
                        )}
                      />

                      <article className="surface surface-glow p-5 transition-colors duration-300 hover:border-primary/50 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                          <div className="min-w-0">
                            <h3 className="font-headline text-lg font-bold text-foreground sm:text-xl">{experience.role}</h3>
                            {experience.link !== "#" ? (
                              <a
                                href={experience.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                              >
                                {experience.company}
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                              </a>
                            ) : (
                              <p className="mt-0.5 text-sm font-medium text-primary">{experience.company}</p>
                            )}
                          </div>
                          {experience.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              Current
                            </span>
                          )}
                        </div>

                        {experience.type && (
                          <p className="mt-2 inline-flex rounded-md border border-border/70 px-2 py-0.5 text-xs text-muted-foreground">
                            {experience.type}
                          </p>
                        )}

                        {/* Date (mobile) */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground md:hidden">
                          <span className="font-code font-medium text-foreground/90">{experience.duration}</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {experience.location}
                          </span>
                        </div>

                        {experience.progression && (
                          <ol className="mt-4 flex flex-wrap gap-2" aria-label={`Career progression at ${experience.company}`}>
                            {experience.progression.map((step) => (
                              <li key={step.year} className="flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5 text-xs">
                                <span className="font-code font-medium text-primary">{step.year}</span>
                                <span className="text-foreground/90">{step.title}</span>
                              </li>
                            ))}
                          </ol>
                        )}

                        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                          {experience.description.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {experience.tech.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {experience.tech.map((t) => (
                              <span key={t} className="rounded-md bg-muted px-2 py-1 font-code text-xs text-muted-foreground">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
