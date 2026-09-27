import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, FileText } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';

// Disable static generation since we use MongoDB now
// export function generateStaticParams() {}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let guide = null;
  try {
    await dbConnect();
    guide = await Article.findOne({ slug: params.slug }).lean();
  } catch (e) {
    console.error('generateMetadata dbConnect failed:', e);
  }
  
  if (!guide) {
    const { guides: hardcodedGuides } = await import('@/lib/guides-config');
    const hardcoded = hardcodedGuides.find(g => g.slug === params.slug);
    if (hardcoded) {
      guide = {
        title: hardcoded.metaTitle || hardcoded.title,
        excerpt: hardcoded.metaDescription || hardcoded.description,
        slug: hardcoded.slug
      };
    } else {
      return {};
    }
  }
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guides/${guide.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `/guides/${guide.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.excerpt,
    },
  };
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  let dbArticle = null;
  
  try {
    await dbConnect();
    dbArticle = await Article.findOne({ slug: params.slug }).lean();
  } catch (error) {
    console.error('Failed to fetch from MongoDB:', error);
  }

  if (!dbArticle) {
    const { guides: hardcodedGuides } = await import('@/lib/guides-config');
    const hardcoded = hardcodedGuides.find(g => g.slug === params.slug);
    if (!hardcoded) notFound();

    dbArticle = {
      title: hardcoded.title,
      slug: hardcoded.slug,
      excerpt: hardcoded.description,
      content: hardcoded.content,
      metaTitle: hardcoded.metaTitle,
      metaDescription: hardcoded.metaDescription,
      createdAt: new Date().toISOString()
    };
  }
  
  // Shallow copy so we can serialize except the content which might be React nodes
  const guide = { ...dbArticle };
  // If content is a string, it's from DB. If it's an array, it's from hardcoded config.

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
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
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
            <li className="text-foreground font-medium truncate">Guide</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Guide</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-tight text-center">
            {guide.title}
          </h1>
          <p className="mt-4 text-xl text-secondary-muted leading-relaxed max-w-4xl mx-auto text-center">
            {guide.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-5xl mx-auto quill-content">
          {typeof guide.content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: guide.content }} />
          ) : (
            <div className="space-y-6">
              {Array.isArray(guide.content) && guide.content.map((node: any, i: number) => (
                <div key={i}>{node}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
