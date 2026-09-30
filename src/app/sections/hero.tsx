import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, X_URL, RESUME_PATH } from '@/lib/seo';

const stats = [
  { value: '5+', label: 'Years building production systems' },
  { value: '50,000+', label: 'Pensioners on the Kano State pension platform' },
  { value: '$73,869', label: 'Settled through KrediNou' },
  { value: '2,800+', label: 'Users on BizScan360' },
];

const techStack = [
  'C# .NET', 'ASP.NET Core', 'Python', 'Django', 'Node.js', 'Next.js', 'React',
  'Flutter', 'PHP Laravel', 'PostgreSQL', 'EF Core', 'REST APIs', 'JWT & RBAC',
];

const socialLinks = [
  { name: 'GitHub', href: GITHUB_URL, icon: Github },
  { name: 'LinkedIn', href: LINKEDIN_URL, icon: Linkedin },
  { name: 'X (Twitter)', href: X_URL, icon: Twitter },
];

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-portrait");

  return (
    <section id="home" className="relative -mt-[4.25rem] overflow-hidden pt-[4.25rem] sm:-mt-20 sm:pt-20">
      {/* Backdrop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_65%)]" />
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px] sm:w-[48rem]" />
      </div>

      <div className="container mx-auto px-4 pb-16 pt-10 sm:pt-16 md:px-6 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <div className="animate-rise inline-flex max-w-full items-center gap-2.5 rounded-full border border-border/70 bg-card/70 py-1.5 pl-3 pr-4 text-xs font-medium text-foreground/80 backdrop-blur sm:text-sm">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="truncate">Available for work · Software Engineer at Book Direct</span>
            </div>

            {/* The h1 must carry the full name — it is the strongest on-page
                signal for a search on "Muhammad Idris Abubakar". */}
            <h1
              className="animate-rise mt-6 font-headline text-[2.6rem] font-bold leading-[1.05] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              Muhammad Idris{' '}
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 bg-clip-text text-transparent">Abubakar</span>
            </h1>

            {/* Static, server-rendered title so the real job title reaches the crawler. */}
            <p
              className="animate-rise mt-5 text-lg font-medium text-foreground/90 sm:text-xl md:text-2xl"
              style={{ animationDelay: '160ms' }}
            >
              Software Engineer &amp; Mobile App Developer. Lead Developer at{' '}
              <a href="https://www.kredinou.com" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">Kredinou</a>
              {' '}&amp;{' '}
              <a href="https://bizscan360.com" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">BizScan360</a>
            </p>

            <p
              className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: '240ms' }}
            >
              I build secure, high-performance backend and mobile systems across fintech,
              healthcare, and government, from a pension platform serving 50,000+ people to{' '}
              <span className="font-medium text-foreground">Forge</span>, the AI payment
              validation engine I founded for African businesses.
            </p>

            <div
              className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '320ms' }}
            >
              <Button asChild size="lg" className="group h-12 rounded-full px-7 text-base shadow-lg shadow-primary/20">
                <Link href="#projects">
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-border bg-card/60 px-7 text-base backdrop-blur hover:bg-muted hover:text-foreground">
                <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Button>
              <div className="flex items-center justify-center gap-1 sm:ml-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-primary"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Portrait */}
          {heroImage && (
            <div className="animate-rise order-1 mx-auto w-full max-w-[15rem] sm:max-w-xs lg:order-2 lg:max-w-none" style={{ animationDelay: '120ms' }}>
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 via-primary/5 to-transparent blur-2xl" />
                {/* Gradient frame */}
                <div aria-hidden="true" className="absolute -inset-px rounded-[1.8rem] bg-gradient-to-br from-primary/80 via-border to-cyan-400/50" />
                <div className="relative overflow-hidden rounded-[1.75rem] bg-card">
                  <Image
                    src={heroImage.imageUrl}
                    alt="Portrait of Muhammad Idris Abubakar, Software Engineer and Lead Developer at Kredinou and BizScan360"
                    width={640}
                    height={800}
                    sizes="(min-width: 1024px) 400px, 320px"
                    className="aspect-[4/5] w-full object-cover object-[center_22%]"
                    priority
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Career highlights */}
        <dl
          className="animate-rise mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-border/70 bg-border/70 gap-px lg:mt-20 lg:grid-cols-4"
          style={{ animationDelay: '400ms' }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1.5 bg-card p-4 sm:p-6">
              <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">{stat.label}</dt>
              <dd className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* Tech stack marquee (decorative; the full list lives in Skills) */}
        <div
          aria-hidden="true"
          className="animate-rise relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          style={{ animationDelay: '480ms' }}
        >
          <div className="flex w-max animate-marquee gap-3 motion-reduce:animate-none">
            {[...techStack, ...techStack].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="whitespace-nowrap rounded-full border border-border/70 bg-card/60 px-4 py-2 font-code text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
