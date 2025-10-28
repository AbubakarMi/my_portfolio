
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === "about-profile");

  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            {aboutImage && (
              <Card className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              </Card>
            )}
          </div>
          <div className="space-y-6 md:col-span-3">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              My Story &amp; Mission
            </h2>
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                I’m a Computer Science graduate from Aliko Dangote University of Science &amp; Technology, Wudil. My journey into technology began with a fascination for how software can solve real-world problems. This passion has evolved into a career where I focus on building high-quality, impactful SaaS products and delivering top-tier solutions as a freelance developer.
              </p>
              <p>
                As the founder of the startup product <strong className="font-semibold text-primary">Nyra Connect</strong>, I'm developing a meeting application, similar to Google Meet, that provides live transcription during meetings and accessible summaries afterward. We are also planning to develop a chat application.
              </p>
            </div>
            <Button asChild size="lg" className="mt-4 rounded-full px-8">
              <a href="/resume.pdf" download="Muhammad_Idris_Abubakar_Resume.pdf">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
