import { cn } from '@/lib/utils';
import { Reveal } from '@/components/reveal';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 max-w-2xl sm:mb-14",
        align === 'center' && "mx-auto text-center",
        className
      )}
    >
      <p className={cn(
        "mb-4 inline-flex items-center gap-2 font-code text-xs font-medium uppercase tracking-[0.2em] text-primary",
      )}>
        <span className="h-px w-6 bg-primary" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
