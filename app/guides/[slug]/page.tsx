import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { guides, getGuideBySlug } from '@/lib/guides-config';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `/guides/${guide.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
  author: {
      '@type': 'Organization',
      name: 'MyToolOrbit',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyToolOrbit',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: '/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `/guides/${guide.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-secondary-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/guides" className="hover:text-foreground transition-colors">
                Guides
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium truncate">{guide.tag}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
              <guide.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">{guide.tag}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-3 text-lg text-secondary-muted">{guide.description}</p>
        </div>

        {/* Content */}
        <article className="space-y-8">
          {guide.content.map((section, i) => (
            <div key={i} className="space-y-4 text-secondary-muted leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-6 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:text-secondary-muted [&_code]:text-primary [&_code]:text-sm [&_strong]:text-foreground [&_em]:text-secondary-muted">
              {section}
            </div>
          ))}
        </article>

        {/* Back to guides */}
        <div className="mt-12 border-t border-subtle pt-6">
          <Link
            href="/guides"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to all guides
          </Link>
        </div>
      </div>
    </>
  );
}
