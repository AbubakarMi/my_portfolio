"use client";

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-shimmer before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)]",
        className
      )}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Image skeleton */}
      <div className="relative overflow-hidden rounded-2xl">
        <Skeleton className="aspect-video w-full" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-5">
        <div>
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="mt-3 h-8 w-3/4" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-lg" />
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/50">
      {/* Image skeleton */}
      <div className="relative">
        <Skeleton className="aspect-video w-full" />
        <div className="absolute top-4 right-4">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col p-6">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="mt-2 h-6 w-3/4" />

        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="mt-auto pt-6">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-border/50">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

export function ExperienceCardSkeleton() {
  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />
      {/* Timeline node */}
      <div className="absolute left-0 top-1.5 -translate-x-1/2">
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>

      <div className="rounded-2xl bg-card p-6 ring-1 ring-border/50">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  );
}
