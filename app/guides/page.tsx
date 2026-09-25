import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { guides } from '@/lib/guides-config';

export const metadata: Metadata = {
  title: 'Guides — Learn SEO, Development & AI',
  description:
    'Guides and tutorials on SEO, web development, and AI tools. Learn how to use meta tags, schema markup, llms.txt, and more.',
  alternates: { canonical: '/guides' },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Guides
        </h1>
        <p className="mt-3 text-lg text-secondary-muted">
          Practical guides on SEO, web development, and AI tooling. Written for developers and
          creators who want to understand the tools they use.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col rounded-xl border border-subtle bg-card p-6 transition-all hover:border-primary/30 hover:bg-muted"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <guide.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-full border border-subtle px-2.5 py-0.5 text-xs font-medium text-secondary-muted">
                {guide.tag}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-foreground">{guide.title}</h2>
            <p className="mt-2 flex-1 text-sm text-secondary-muted leading-relaxed">
              {guide.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
              Read guide
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
