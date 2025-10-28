
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        <p className="text-center text-sm md:text-left">
          © {currentYear} Muhammad Idris Abubakar. Built with ❤️ using TypeScript & Next.js.
        </p>
        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" size="icon" className="text-secondary-foreground hover:bg-white/10 hover:text-accent">
            <Link href="https://github.com/AbubakarMi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-secondary-foreground hover:bg-white/10 hover:text-accent">
            <Link href="https://www.linkedin.com/in/muhammad-idris-abubakar-99574634a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-secondary-foreground hover:bg-white/10 hover:text-accent">
            <Link href="https://x.com/AbubakarM93064" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
