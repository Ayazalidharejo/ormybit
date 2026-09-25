import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { type ToolConfig, getRelatedTools, categoryConfig } from '@/lib/tools-config';
import { FAQAccordion } from '@/components/shared/faq-accordion';
import { RelatedTools } from '@/components/shared/related-tools';

interface ToolPageLayoutProps {
  tool: ToolConfig;
  widget: React.ReactNode;
}

export function ToolPageLayout({ tool, widget }: ToolPageLayoutProps) {
  const relatedTools = getRelatedTools(tool.slug);
  const category = categoryConfig[tool.category];

  return (
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
            <Link href="/tools" className="hover:text-foreground transition-colors">
              Tools
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" />
          <li>
            <Link
              href={`/tools/${tool.category}`}
              className="hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" />
          <li className="text-foreground font-medium truncate">{tool.name}</li>
        </ol>
      </nav>

      {/* H1 + Description */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <tool.icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-primary">{category.name}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {tool.name}
        </h1>
        <p className="mt-3 text-lg text-secondary-muted">{tool.shortDescription}</p>
      </div>

      {/* Tool Widget */}
      <div className="mb-12 rounded-2xl border border-subtle bg-card p-6 sm:p-8 glow-primary">
        {widget}
      </div>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">How it works</h2>
        <div className="space-y-4 text-secondary-muted leading-relaxed">
          {tool.longDescription.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {tool.faqs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Frequently asked questions
          </h2>
          <FAQAccordion faqs={tool.faqs} />
        </section>
      )}

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Related tools</h2>
          <RelatedTools tools={relatedTools} />
        </section>
      )}
    </div>
  );
}
