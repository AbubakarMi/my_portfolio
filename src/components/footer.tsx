import Link from 'next/link';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/3 blur-2xl" />
      </div>

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Main footer content */}
        <div className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="group inline-flex items-center gap-3 text-lg font-bold">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  M
                </span>
                <span className="transition-colors duration-300 group-hover:text-primary">Muhammad Idris Abubakar</span>
              </Link>
              <p className="text-sm text-secondary-foreground/70 max-w-md leading-relaxed">
                Software & AI Evaluation Engineer building scalable systems and conducting AI evaluation workflows. Founder of Nyra, on a mission to make communication seamless across languages.
              </p>
              {/* Newsletter or CTA */}
              <div className="pt-2">
                <p className="text-xs font-medium uppercase tracking-wider text-secondary-foreground/50 mb-3">Let's connect</p>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:ring-primary hover:shadow-lg hover:shadow-primary/30"
                >
                  Get in Touch
                  <ArrowUp className="h-3.5 w-3.5 rotate-45" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-all duration-300"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary/50 transition-all duration-300 group-hover:w-2 group-hover:bg-primary" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Explore</h3>
              <ul className="space-y-3">
                {navLinks.slice(3).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-primary transition-all duration-300"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary/50 transition-all duration-300 group-hover:w-2 group-hover:bg-primary" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Copyright */}
            <p className="flex items-center gap-1.5 text-sm text-secondary-foreground/60">
              &copy; {currentYear} Muhammad Idris Abubakar. Made with
              <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
              in Nigeria
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg shadow-black/10">
                <Link href="https://github.com/AbubakarMi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg shadow-black/10">
                <Link href="https://linkedin.com/in/muhammad-idris-abubakar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg shadow-black/10">
                <Link href="https://x.com/AbubakarM93064" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Back to top */}
            <Button asChild variant="ghost" size="sm" className="group rounded-xl px-4 text-secondary-foreground/70 hover:text-primary hover:bg-white/5 transition-all duration-300">
              <Link href="#home">
                Back to top
                <ArrowUp className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
