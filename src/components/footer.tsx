import Link from 'next/link';
import { Github, Linkedin, Twitter, ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, X_URL, RESUME_PATH } from '@/lib/seo';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { name: 'GitHub', href: GITHUB_URL, icon: Github },
  { name: 'LinkedIn', href: LINKEDIN_URL, icon: Linkedin },
  { name: 'X (Twitter)', href: X_URL, icon: Twitter },
  { name: 'Email', href: 'mailto:abubakarmi131@gmail.com', icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 py-12 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 font-semibold text-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-code text-xs font-bold text-primary-foreground">
                MI
              </span>
              Muhammad Idris Abubakar
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Software Engineer &amp; Mobile App Developer. Lead Developer at Kredinou &amp; BizScan360, Software Engineer at Book Direct, and founder of Forge, building reliable financial infrastructure from Africa.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-code text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Navigate</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-foreground/80 transition-colors duration-200 hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work with me */}
          <div>
            <h3 className="mb-4 font-code text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Work with me</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#contact" className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:text-primary">
                  Start a conversation
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:text-primary">
                  Download CV
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:text-primary">
                  Connect on LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/70 py-6 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            &copy; {currentYear} Muhammad Idris Abubakar. Built in Kano, Nigeria.
          </p>
          <Link href="#home" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
