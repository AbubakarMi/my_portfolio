"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

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
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500",
      isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-base font-bold text-foreground transition-colors hover:text-primary sm:text-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            M
          </span>
          <span className="hidden sm:inline">Muhammad Idris Abubakar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                activeSection === link.id
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-background p-0">
              <VisuallyHidden.Root>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden.Root>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                  <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                      M
                    </span>
                    <span>Muhammad</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-6">
                  <div className="flex flex-col space-y-1">
                    {navLinks.map((link, index) => (
                      <SheetClose asChild key={link.id}>
                        <Link
                          href={`#${link.id}`}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                            activeSection === link.id
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/70 hover:bg-muted hover:text-foreground"
                          )}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {link.name}
                          {activeSection === link.id && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-border/50">
                  <SheetClose asChild>
                    <Button asChild className="w-full rounded-xl py-6 text-base font-medium shadow-md">
                      <Link href="#contact">Get in Touch</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
