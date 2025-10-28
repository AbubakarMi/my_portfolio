import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics-provider';

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Idris Abubakar | Software Engineer & Founder',
    template: '%s | Muhammad Idris Abubakar',
  },
  description:
    'Personal portfolio of Muhammad Idris Abubakar, a Software Engineer and Founder of Nyra Technology Limited, specializing in scalable SaaS and custom software solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body bg-background text-foreground antialiased')}>
        <AnalyticsProvider />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
