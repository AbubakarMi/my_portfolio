"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

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
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold text-foreground transition-colors hover:text-primary md:text-xl">
          Muhammad Idris Abubakar
        </Link>
        
        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "font-medium transition-all hover:text-primary",
                activeSection === link.id ? "text-accent scale-105" : "text-foreground/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%]">
              <div className="flex flex-col space-y-8 p-6">
                <SheetClose asChild>
                  <Link href="/" className="text-xl font-bold text-foreground">
                    M. I. Abubakar
                  </Link>
                </SheetClose>
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                     <SheetClose asChild key={link.id}>
                        <Link
                          href={`#${link.id}`}
                          className={cn(
                            "text-xl font-medium transition-colors hover:text-primary",
                            activeSection === link.id ? "text-accent" : "text-foreground/80"
                          )}
                        >
                          {link.name}
                        </Link>
                     </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
