import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/app/sections/hero';
import { About } from '@/app/sections/about';
import { Skills } from '@/app/sections/skills';
import { Projects } from '@/app/sections/projects';
import { Blog } from '@/app/sections/blog';
import { Contact } from '@/app/sections/contact';
import { Chat } from '@/components/chat';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <Chat />
    </div>
  );
}
