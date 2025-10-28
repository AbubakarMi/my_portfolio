import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Rocket, GraduationCap } from 'lucide-react';

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
    <section id="experience" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Work Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            My professional journey and key roles.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <Card key={exp.company} className="group flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold">
                    <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {exp.company}
                    </Link>
                  </CardTitle>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <exp.icon className="h-6 w-6" />
                  </div>
                </div>
                <CardDescription className="text-md font-semibold text-primary">{exp.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-foreground/80">{exp.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
