"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, KeyRound, Mail, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const DotNetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.53,2.09l-7.2,2.15C3.52,4.48,3,5.2,3,6.05v9.91c0,0.85,0.52,1.57,1.33,1.81l7.2,2.15c0.47,0.14,0.97,0.14,1.44,0l7.2-2.15c0.81-0.24,1.33-0.96,1.33-1.81V6.05c0-0.85-0.52-1.57-1.33-1.81l-7.2-2.15C12.5,1.95,12,1.95,11.53,2.09z M12,13.88c-2.3,0-4.17-1.87-4.17-4.17S9.7,5.54,12,5.54c2.3,0,4.17,1.87,4.17,4.17S14.3,13.88,12,13.88z" fill="#512bd4"/>
  </svg>
);

const PostgresqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2 0-3.5-1.5-3.5-3.5S9 9.5 11 9.5V5h2v4.5c2 0 3.5 1.5 3.5 3.5S15 16.5 13 16.5h-2zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2z" fill="#336791"/>
  </svg>
);

const TypeScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5h21v21h-21z" fill="#3178c6"/>
    <path d="M12.3 10.6c.1-.1.3-.2.5-.2s.4.1.5.2l3.4 3.4c.1.1.2.3.2.5s-.1.4-.2.5l-.9.9c-.1.1-.3.2-.5.2s-.4-.1-.5-.2L12 12.3l-2.9 2.9c-.1.1-.3.2-.5.2s-.4-.1-.5-.2l-.9-.9c-.1-.1-.2-.3-.2-.5s.1-.4.2-.5zm-4-1.7V4.5h11.2v4.4h-4.4v8.9h-2.4V8.9z" fill="#fff"/>
  </svg>
);

const TailwindCssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.18 10.37c-1.09 1.09-2.52 1.63-4.23 1.63-1.63 0-3-.5-4.1-1.5-.53-.48-.7-1.25-.38-1.84.32-.59.98-.81 1.58-.51.4.2.73.52.96.75 1.05 1 2.58 1 3.6 0 .5-.5.78-1.18.78-1.88 0-1.2-.59-1.8-1.78-2.07-1.13-.25-2.28-.68-2.28-2.26 0-.91.56-1.68 1.48-2.1.4-.18.84-.23 1.28-.15.7.12 1.34.52 1.78 1 .32.36.31.92-.03 1.27-.34.36-.9.37-1.25.02-.2-.2-.46-.35-.76-.35-.5 0-.8.3-.8.75 0 .6.47.88 1.65 1.15 1.35.31 2.41 1.05 2.41 2.54 0 .97-.56 1.83-1.42 2.37z" fill="#38b2ac"/>
  </svg>
);

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="64" fill="black"/>
    <path d="M84.316 43.199V102h11.041V43.199H84.316zM46.732 43.199L83.167 86.41V43.199h-11.12v35.337L46.732 52.345v-9.146z" fill="url(#paint0_linear_1_2)"/>
    <defs>
      <linearGradient id="paint0_linear_1_2" x1="68.868" y1="43.199" x2="68.868" y2="102" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);


const skills = {
  Backend: [
    { name: '.NET 8', icon: DotNetIcon },
    { name: 'ASP.NET Core', icon: DotNetIcon },
    { name: 'PostgreSQL', icon: PostgresqlIcon },
    { name: 'JWT/Auth', icon: KeyRound },
  ],
  Frontend: [
    { name: 'React', icon: ReactIcon },
    { name: 'Next.js', icon: NextjsIcon },
    { name: 'TypeScript', icon: TypeScriptIcon },
    { name: 'Tailwind CSS', icon: TailwindCssIcon },
  ],
  'DevOps & Tools': [
    { name: 'Docker', icon: Container },
    { name: 'SendGrid', icon: Mail },
    { name: 'Git & GitHub', icon: Github },
  ],
};

const SkillCard = ({ name, icon: Icon, index }: { name: string, icon: React.ElementType, index: number }) => {
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
      <div 
        ref={cardRef}
        className={cn(
          "flex items-center gap-4 rounded-xl border-transparent bg-card p-4 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1.5",
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="h-7 w-7" />
        </div>
        <span className="font-semibold text-foreground text-md">{name}</span>
      </div>
  );
};


export function Skills() {
  return (
    <section id="skills" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-3">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills &amp; Technologies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A look at the primary tools and technologies in my professional toolkit.
          </p>
        </div>

        <div className="mt-20">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="mb-12 last:mb-0">
              <h3 className="text-center font-headline text-2xl font-semibold text-foreground mb-8">
                {category.replace('&amp;', '&')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {items.map((skill, index) => (
                  <SkillCard key={skill.name} name={skill.name} icon={skill.icon} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
