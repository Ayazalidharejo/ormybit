import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Zap, Shield, Gift, Orbit, BookOpen, Search, FileText, Sparkles } from 'lucide-react';
import { tools, categoryConfig, type ToolCategory } from '@/lib/tools-config';
import { ToolCard } from '@/components/shared/tool-card';

export const metadata: Metadata = {
  title: 'Free Online Tools for Developers, Creators & SEO',
  description:
    'MyToolOrbit offers free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users. Meta tag generators, schema markup, token counter, and more.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Online Tools for Developers, Creators & SEO',
    description: 'MyToolOrbit offers free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users.',
    url: '/',
    type: 'website',
    siteName: 'MyToolOrbit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools for Developers, Creators & SEO',
    description: 'MyToolOrbit offers free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users.',
  },
};

const features = [
  {
    icon: Gift,
    title: '100% Free',
    description: 'Every tool is completely free to use. No hidden fees, no premium tiers, no credit card required.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Tools run client-side in your browser for instant results. No waiting for server round trips.',
  },
  {
    icon: Shield,
    title: 'Privacy-Friendly',
    description: 'Your data never leaves your browser. No tracking, no signup, no data collection on tool usage.',
  },
];

const guides = [
  {
    icon: Search,
    title: 'How to Write Meta Tags That Actually Improve CTR',
    description: 'A practical guide to writing title tags and meta descriptions that get more clicks from Google search results.',
    href: '/guides/meta-tags-seo-guide',
  },
  {
    icon: FileText,
    title: 'A Practical Guide to Schema Markup for Small Sites',
    description: 'Which JSON-LD schema types to use, how to add them to your site, and how to test with Google Rich Results Test.',
    href: '/guides/schema-markup-guide',
  },
  {
    icon: Sparkles,
    title: 'What Is llms.txt and Do You Actually Need One?',
    description: 'The llms.txt standard explained in plain language. What it does, which AI crawlers use it, and whether it is worth adding.',
    href: '/guides/llms-txt-guide',
  },
];

export default function HomePage() {
  const categories = Object.keys(categoryConfig) as ToolCategory[];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-subtle">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-subtle bg-card px-4 py-1.5 text-sm text-secondary-muted">
              <Orbit className="h-4 w-4 text-primary" />
              <span>Free tools for developers, SEO & AI</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Free Online Tools for{' '}
              <span className="text-primary">Developers, Creators & SEO</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-secondary-muted leading-relaxed sm:text-lg">
              Fast, privacy-friendly tools for meta tags, schema markup, token counting,
              sitemaps, and more. No signup required — just open and use.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse all tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 rounded-lg border border-subtle px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Read guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools by category */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {categories.map((catSlug) => {
          const category = categoryConfig[catSlug];
          const catTools = tools.filter((t) => t.category === catSlug);
          return (
            <div key={catSlug} className="mb-12 last:mb-0 lg:mb-16">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                      <category.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground sm:text-2xl">{category.name}</h2>
                  </div>
                  <p className="text-sm text-secondary-muted sm:text-base">{category.description}</p>
                </div>
                <Link
                  href={`/tools/${catSlug}`}
                  className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Learn / Guides section */}
      <section className="border-t border-subtle bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Learn the fundamentals</h2>
            </div>
            <p className="text-sm text-secondary-muted sm:text-base">
              Guides to help you understand the tools and get better results from your SEO and development work.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group flex flex-col rounded-xl border border-subtle bg-card p-5 transition-all hover:border-primary/30 hover:bg-muted"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                  <guide.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{guide.title}</h3>
                <p className="mt-2 flex-1 text-sm text-secondary-muted leading-relaxed">
                  {guide.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why MyToolOrbit */}
      <section className="border-t border-subtle">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why MyToolOrbit</h2>
            <p className="mt-2 text-sm text-secondary-muted sm:text-base">
              Built for speed, privacy, and simplicity.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-subtle bg-card p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-secondary-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
