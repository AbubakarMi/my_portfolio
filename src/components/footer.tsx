import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          &copy; {currentYear} Muhammad Idris Abubakar. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted hover:text-foreground">
            <Link href="https://github.com/idris-131" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted hover:text-foreground">
            <Link href="https://www.linkedin.com/in/muhammad-idris-abubakar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted hover:text-foreground">
            <Link href="https://twitter.com/Abubakar_MI131" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
