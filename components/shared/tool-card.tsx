import Link from 'next/link';
import { type ToolConfig, categoryConfig } from '@/lib/tools-config';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: ToolConfig;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const category = categoryConfig[tool.category];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        'group flex flex-col rounded-xl border border-subtle bg-card p-5 transition-all hover:border-primary/30 hover:bg-muted hover:shadow-lg',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/15">
          <tool.icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xs font-medium text-secondary-muted">
          {category.name}
        </span>
      </div>
      <h3 className="text-base font-semibold text-foreground">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm text-secondary-muted line-clamp-2">
        {tool.shortDescription}
      </p>
    </Link>
  );
}
