import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "SmartEd — School Management System",
    description: "A modular SaaS for schools with dashboards, fee tracking, and parent portals. Built to simplify administrative tasks and enhance communication between school and home.",
    tech: [".NET 8", "ASP.NET Core", "PostgreSQL", "React", "TypeScript"],
    image: PlaceHolderImages.find(p => p.id === "project-smarted"),
    link: "#",
    role: "Lead Developer & Architect"
  },
  {
    title: "Appointment Booking System",
    description: "A versatile multi-industry appointment platform. Features a robust ASP.NET Core backend and a responsive frontend, allowing for seamless scheduling and management.",
    tech: ["ASP.NET", "PostgreSQL", "React", "Next.js"],
    image: PlaceHolderImages.find(p => p.id === "project-booking"),
    link: "#",
    role: "Full-Stack Developer"
  }
];

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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {project.image && (
                <div className="overflow-hidden">
                   <Image
                    src={project.image.imageUrl}
                    alt={project.image.description}
                    width={800}
                    height={600}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                <CardDescription>
                  <strong>Role:</strong> {project.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link href={project.link}>
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
