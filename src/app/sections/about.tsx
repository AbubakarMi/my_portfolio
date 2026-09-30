import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, ArrowUpRight, Landmark, Banknote, Leaf, Rocket, LineChart, Smartphone, GraduationCap, Languages } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { RESUME_PATH } from '@/lib/seo';

const highlights = [
  {
    icon: Landmark,
    metric: "50,000+ pensioners",
    text: "Shipped the Kano State Pension Management System, now live in production."
  },
  {
    icon: Banknote,
    metric: "$73,869 settled",
    text: "Rebuilt KrediNou from a non-working app into a live fintech platform, and helped recover over $12,299 in loans."
  },
  {
    icon: Leaf,
    metric: "Built for Sterling Bank",
    text: "Full-stack developer on SFMP, a renewable-energy structured-finance marketplace."
  },
  {
    icon: Rocket,
    metric: "Founder of Forge",
    text: "Architected an AI payment validation engine after cleaning a 30,000-beneficiary disbursement by hand."
  },
  {
    icon: LineChart,
    metric: "2,800+ users",
    text: "Led BizScan360, a business health platform trusted by 500+ companies worldwide."
  },
  {
    icon: Smartphone,
    metric: "Live on both app stores",
    text: "Launched AbiiApp, a social super-app on Google Play and the Apple App Store."
  },
];

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === "about-profile");

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading eyebrow="About" title="Engineer, founder, and builder of systems people rely on" />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Story */}
          <Reveal className="lg:col-span-7">
            <div className="surface h-full p-6 sm:p-8">
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  I&apos;m a results-driven Software Engineer and Mobile App Developer with{' '}
                  <span className="font-medium text-foreground">5+ years of experience</span>, in the industry since 2020, building secure,
                  high-performance systems across fintech, healthcare, government, education, transport, and
                  hospitality. My toolkit spans C# .NET, Python, Django, Node.js, Next.js, React, Flutter,
                  PHP Laravel, and PostgreSQL.
                </p>
                <p>
                  I&apos;m currently a remote Software Engineer at{' '}
                  <a href="https://bookdirect.ng" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">Book Direct</a>,
                  a hotel and shortlet booking platform for Nigeria. I learned the craft on the job, not in a
                  lecture hall: I joined Hubuk Technology in 2021, interned there in 2022, and grew from junior
                  backend developer to full-stack developer by 2025, shipping fintech and government platforms
                  along the way. I also engineered AI-driven healthcare products at Techserv Intelligence.
                </p>
                <p>
                  Alongside that work I founded{' '}
                  <a href="https://forgeapis.xyz" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">Forge</a>,
                  an AI-powered bulk payment and disbursement platform for African businesses, and I&apos;m building{' '}
                  <span className="font-medium text-foreground">Anvil</span>, a cross-border money transfer app.
                  I care about scalable REST APIs, airtight auth and RBAC, and turning messy real-world problems
                  into reliable products.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-7">
                  <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="group h-12 rounded-full px-7 hover:bg-muted hover:text-foreground">
                  <a href="#contact">
                    Let&apos;s Talk
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Photo + quick facts */}
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="grid h-full gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {aboutImage && (
                <div className="surface overflow-hidden">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] h-full w-full object-cover"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </div>
              )}
              <div className="surface flex flex-col justify-center gap-5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">B.Sc. (Hons) Computer Science</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">Aliko Dangote University of Science and Technology, Kano · 2020 – 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Languages className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Languages</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">English (professional) · Hausa (native)</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Career highlights */}
        <h3 className="mb-5 mt-14 font-code text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Career highlights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, index) => (
            <Reveal key={highlight.metric} delay={index * 60}>
              <div className="surface surface-glow group h-full p-5 transition-colors duration-300 hover:border-primary/50 sm:p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <highlight.icon className="h-5 w-5" />
                </div>
                <p className="font-headline text-lg font-bold tracking-tight text-foreground">{highlight.metric}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{highlight.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
