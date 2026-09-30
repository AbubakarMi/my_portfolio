"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ThemeToggle } from '@/components/theme-toggle';
import { RESUME_PATH } from '@/lib/seo';

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div className={cn(
        "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-2 pr-2 transition-all duration-300 sm:h-16 sm:pl-3 sm:pr-3",
        isScrolled
          ? "border-border/70 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}>
        {/* Logo */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-full pr-3 text-sm font-semibold text-foreground"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary font-code text-xs font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-105">
            MI
          </span>
          <span className="truncate sm:hidden">Muhammad Idris</span>
          <span className="hidden truncate sm:inline lg:hidden xl:inline">Muhammad Idris Abubakar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              aria-current={activeSection === link.id ? 'true' : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                activeSection === link.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-1.5">
          <ThemeToggle />

          <Button asChild size="sm" className="hidden rounded-full px-5 sm:inline-flex">
            <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </Button>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted hover:text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm bg-background p-0 [&>button]:hidden">
                <VisuallyHidden.Root>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden.Root>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-border/70 p-5">
                    <span className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-code text-xs font-bold text-primary-foreground">
                        MI
                      </span>
                      Muhammad Idris Abubakar
                    </span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted hover:text-foreground">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close navigation menu</span>
                      </Button>
                    </SheetClose>
                  </div>

                  <nav className="flex-1 overflow-y-auto p-5" aria-label="Mobile">
                    <div className="flex flex-col gap-1">
                      {navLinks.map((link, index) => (
                        <SheetClose asChild key={link.id}>
                          <Link
                            href={`/#${link.id}`}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium transition-colors duration-200",
                              activeSection === link.id
                                ? "bg-primary/10 text-primary"
                                : "text-foreground/80 hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {link.name}
                            <span className="font-code text-xs text-muted-foreground">0{index + 1}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </nav>

                  <div className="grid gap-3 border-t border-border/70 p-5">
                    <SheetClose asChild>
                      <Button asChild className="h-12 w-full rounded-xl text-base">
                        <Link href="/#contact">Get in Touch</Link>
                      </Button>
                    </SheetClose>
                    <Button asChild variant="outline" className="h-12 w-full rounded-xl text-base hover:bg-muted hover:text-foreground">
                      <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                        Download CV
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
