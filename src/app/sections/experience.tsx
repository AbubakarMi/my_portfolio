import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Rocket, GraduationCap, ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    company: "Hubuk Technology Limited",
    link: "https://hubuk.ng",
    role: "Software Engineer",
    duration: "4+ Years",
    icon: Building
  },
  {
    company: "Torvix AI",
    link: "#",
    role: "Frontend Developer",
    duration: "Project-based",
    icon: Rocket
  },
  {
    company: "FlexiSAF Edusoft Limited",
    link: "https://flexisaf.com",
    role: "Backend Developer",
    duration: "Internship",
    icon: GraduationCap
  }
];

export function Experience() {
  return (
    <section id="experience" className="bg-muted/50 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-3 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Work Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            My professional journey and key roles.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
             <Link key={exp.company} href={exp.link} target="_blank" rel="noopener noreferrer" className="group block">
                <Card className="h-full rounded-2xl border-transparent shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-primary">
                        <exp.icon className="h-7 w-7" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:rotate-45 group-hover:text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex h-full flex-col">
                      <div className="flex-grow">
                        <CardTitle className="text-xl font-bold mb-1">
                          {exp.company}
                        </CardTitle>
                        <CardDescription className="text-md font-semibold text-primary">{exp.role}</CardDescription>
                      </div>
                      <p className="font-medium text-muted-foreground mt-4">{exp.duration}</p>
                  </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
