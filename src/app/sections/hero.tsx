import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-portrait");

  return (
    <section id="home" className="relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-sky-100 py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-6">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={160}
                height={160}
                className="h-40 w-40 rounded-full border-4 border-background object-cover shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
            />
          )}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Hi, I’m Muhammad Idris Abubakar — <br /> Software Engineer & Founder.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-foreground/80 md:text-xl">
              I build scalable SaaS and custom software that help people and businesses grow.
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 px-8">
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
