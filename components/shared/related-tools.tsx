import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type ToolConfig } from '@/lib/tools-config';

interface RelatedToolsProps {
  tools: ToolConfig[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={`/tools/${tool.slug}`}
          className="group flex flex-col rounded-xl border border-subtle bg-card p-5 transition-all hover:border-primary/30 hover:bg-muted"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <tool.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground">{tool.name}</h3>
          <p className="mt-1.5 flex-1 text-sm text-secondary-muted line-clamp-2">
            {tool.shortDescription}
          </p>
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
            Try tool
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}
