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
    <footer className="relative bg-secondary text-secondary-foreground">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/20" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Main footer content */}
        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                  M
                </span>
                Muhammad Idris Abubakar
              </Link>
              <p className="text-sm text-secondary-foreground/70 max-w-md leading-relaxed">
                Software & AI Evaluation Engineer building scalable systems and conducting AI evaluation workflows. Founder of Nyra, on a mission to make communication seamless across languages.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Explore</h3>
              <ul className="space-y-3">
                {navLinks.slice(3).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="flex items-center gap-1 text-xs text-secondary-foreground/60">
              &copy; {currentYear} Muhammad Idris Abubakar. Made with
              <Heart className="h-3 w-3 text-primary fill-primary" />
              in Nigeria
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-secondary-foreground/70 hover:bg-white/10 hover:text-primary transition-all duration-300">
                <Link href="https://github.com/AbubakarMi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-secondary-foreground/70 hover:bg-white/10 hover:text-primary transition-all duration-300">
                <Link href="https://linkedin.com/in/muhammad-idris-abubakar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-secondary-foreground/70 hover:bg-white/10 hover:text-primary transition-all duration-300">
                <Link href="https://x.com/AbubakarM93064" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Back to top */}
            <Button asChild variant="ghost" size="sm" className="rounded-lg text-secondary-foreground/70 hover:text-primary transition-all duration-300">
              <Link href="#home">
                Back to top
                <ArrowUp className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
