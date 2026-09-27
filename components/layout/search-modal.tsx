'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Command } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools-config';
import { guides } from '@/lib/guides-config';
import { Input } from '@/components/ui/input';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const searchQuery = query.toLowerCase();
  
  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery) ||
      t.shortDescription.toLowerCase().includes(searchQuery)
  );

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery) ||
      g.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24">
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-subtle bg-card shadow-2xl mx-4">
        <div className="flex items-center border-b border-subtle px-4">
          <Search className="h-5 w-5 text-secondary-muted" />
          <Input
            ref={inputRef}
            className="flex-1 border-0 bg-transparent px-4 py-4 text-base focus-visible:ring-0 shadow-none h-14"
            placeholder="Search tools and guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted text-secondary-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query === '' ? (
            <div className="p-8 text-center text-sm text-secondary-muted">
              Type to search for SEO tools, metadata generators, and guides...
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTools.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary-muted">
                    Tools
                  </h3>
                  <div className="grid gap-2">
                    {filteredTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors group"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{tool.name}</div>
                          <div className="text-xs text-secondary-muted line-clamp-1">{tool.shortDescription}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredGuides.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary-muted">
                    Guides
                  </h3>
                  <div className="grid gap-2">
                    {filteredGuides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors group"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                          <guide.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{guide.title}</div>
                          <div className="text-xs text-secondary-muted line-clamp-1">{guide.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredTools.length === 0 && filteredGuides.length === 0 && (
                <div className="p-8 text-center text-sm text-secondary-muted">
                  No results found for &quot;{query}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
