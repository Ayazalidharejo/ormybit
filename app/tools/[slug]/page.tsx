import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  tools,
  getToolBySlug,
  getRelatedTools,
  categoryConfig,
  type ToolCategory,
} from '@/lib/tools-config';
import { ToolPageLayout } from '@/components/shared/tool-page-layout';
import { ToolCard } from '@/components/shared/tool-card';
import dynamic from 'next/dynamic';

const MetaTagsGenerator = dynamic(() => import('@/components/tools/meta-tags-generator').then(mod => ({ default: mod.MetaTagsGenerator })));
const SchemaMarkupGenerator = dynamic(() => import('@/components/tools/schema-markup-generator').then(mod => ({ default: mod.SchemaMarkupGenerator })));
const LlmsTxtGenerator = dynamic(() => import('@/components/tools/llms-txt-generator').then(mod => ({ default: mod.LlmsTxtGenerator })));
const BrokenLinkChecker = dynamic(() => import('@/components/tools/broken-link-checker').then(mod => ({ default: mod.BrokenLinkChecker })));
const TokenCounter = dynamic(() => import('@/components/tools/token-counter').then(mod => ({ default: mod.TokenCounter })));
const SitemapGenerator = dynamic(() => import('@/components/tools/sitemap-generator').then(mod => ({ default: mod.SitemapGenerator })));
const RobotsTxtGenerator = dynamic(() => import('@/components/tools/robots-txt-generator').then(mod => ({ default: mod.RobotsTxtGenerator })));
const OgPreviewChecker = dynamic(() => import('@/components/tools/og-preview-checker').then(mod => ({ default: mod.OgPreviewChecker })));
const AIContentBriefGenerator = dynamic(() => import('@/components/tools/ai-content-brief-generator').then(mod => ({ default: mod.AIContentBriefGenerator })));

export function generateStaticParams() {
  const categoryParams = (Object.keys(categoryConfig) as ToolCategory[]).map((slug) => ({
    slug,
  }));
  const toolParams = tools.map((tool) => ({ slug: tool.slug }));
  return [...categoryParams, ...toolParams];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { slug } = params;

  // Check if it's a category
  const category = categoryConfig[slug as ToolCategory];
  if (category) {
    return {
      title: `${category.name} — Free Online Tools`,
      description: category.description,
      alternates: { canonical: `/tools/${slug}` },
      robots: { index: true, follow: true },
      openGraph: {
        title: `${category.name} — Free Online Tools`,
        description: category.description,
        url: `/tools/${slug}`,
        type: 'website',
        siteName: 'MyToolOrbit',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${category.name} — Free Online Tools`,
        description: category.description,
      },
    };
  }

  // Check if it's a tool
  const tool = getToolBySlug(slug);
  if (tool) {
    return {
      title: tool.metaTitle,
      description: tool.metaDescription,
      alternates: { canonical: `/tools/${tool.slug}` },
      robots: { index: true, follow: true },
      openGraph: {
        title: tool.metaTitle,
        description: tool.metaDescription,
        url: `/tools/${tool.slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: tool.metaTitle,
        description: tool.metaDescription,
      },
    };
  }

  return {};
}

function getToolWidget(slug: string) {
  switch (slug) {
    case 'meta-tags-generator':
      return <MetaTagsGenerator />;
    case 'schema-markup-generator':
      return <SchemaMarkupGenerator />;
    case 'llms-txt-generator':
      return <LlmsTxtGenerator />;
    case 'broken-link-checker':
      return <BrokenLinkChecker />;
    case 'token-counter':
      return <TokenCounter />;
    case 'sitemap-generator':
      return <SitemapGenerator />;
    case 'robots-txt-generator':
      return <RobotsTxtGenerator />;
    case 'og-preview-checker':
      return <OgPreviewChecker />;
    case 'ai-content-brief-generator':
      return <AIContentBriefGenerator />;
    default:
      return null;
  }
}

export default function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Check if it's a category page
  const category = categoryConfig[slug as ToolCategory];
  if (category) {
    const catTools = tools.filter((t) => t.category === slug);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-secondary-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-foreground font-medium">{category.name}</li>
          </ol>
        </nav>

        <div className="mb-8">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <category.icon className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 text-lg text-secondary-muted">{category.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    );
  }

  // Check if it's a tool page
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const widget = getToolWidget(slug);
  const relatedTools = getRelatedTools(slug);
  const toolCategory = categoryConfig[tool.category];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const softwareAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.shortDescription,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: '/tools' },
      { '@type': 'ListItem', position: 3, name: toolCategory.name, item: `/tools/${tool.category}` },
      { '@type': 'ListItem', position: 4, name: tool.name, item: `/tools/${tool.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ToolPageLayout tool={tool} widget={widget} />
    </>
  );
}
