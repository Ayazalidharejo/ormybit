import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools, categoryConfig, type ToolCategory } from '@/lib/tools-config';
import { ToolCard } from '@/components/shared/tool-card';

export const metadata: Metadata = {
  title: 'All Tools — Free Online Developer, SEO & AI Tools',
  description:
    'Browse all free online tools from MyToolOrbit. Meta tag generators, schema markup, llms.txt, broken link checker, token counter, and sitemap generator.',
  alternates: { canonical: '/tools' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'All Tools — Free Online Developer, SEO & AI Tools',
    description: 'Browse all free online tools from MyToolOrbit. Meta tag generators, schema markup, llms.txt, broken link checker, token counter, and sitemap generator.',
    url: '/tools',
    type: 'website',
    siteName: 'MyToolOrbit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Tools — Free Online Developer, SEO & AI Tools',
    description: 'Browse all free online tools from MyToolOrbit.',
  },
};

export default function ToolsPage() {
  const categories = Object.keys(categoryConfig) as ToolCategory[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          All Tools
        </h1>
        <p className="mt-3 text-lg text-secondary-muted">
          {tools.length} free tools for developers, SEO professionals, and AI users. No signup required.
        </p>
      </div>

      {categories.map((catSlug) => {
        const category = categoryConfig[catSlug];
        const catTools = tools.filter((t) => t.category === catSlug);
        return (
          <div key={catSlug} className="mb-12 last:mb-0">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <category.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <Link
                href={`/tools/${catSlug}`}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
              <ArrowRight className="h-4 w-4 text-secondary-muted" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
