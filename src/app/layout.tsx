import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { GeistSans, GeistMono } from 'geist/font';
import { ScrollProgress } from '@/components/scroll-progress';
import { CursorFollower } from '@/components/cursor-follower';
import { PortfolioChatbot } from '@/components/portfolio-chatbot';

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Idris Abubakar | Software Engineer & Founder',
    template: '%s | Muhammad Idris Abubakar',
  },
  description:
    'Personal portfolio of Muhammad Idris Abubakar, a Software Engineer and Founder of Nyra, specializing in scalable SaaS and custom software solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable, 'scroll-smooth')}>
      <body className={cn('font-body bg-background text-foreground antialiased cursor-none md:cursor-none')}>
        {/* <AnalyticsProvider /> */}
        <CursorFollower />
        <ScrollProgress />
        {children}
        <PortfolioChatbot />
        <Toaster />
      </body>
    </html>
  );
}
