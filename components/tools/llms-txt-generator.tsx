'use client';

import { useState, useMemo } from 'react';
import { CopyButton } from '@/components/shared/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Download } from 'lucide-react';

interface PageEntry {
  name: string;
  url: string;
}

export function LlmsTxtGenerator() {
  const [siteName, setSiteName] = useState('');
  const [summary, setSummary] = useState('');
  const [pages, setPages] = useState<PageEntry[]>([
    { name: '', url: '' },
  { name: '', url: '' },
    { name: '', url: '' },
  ]);

  const generatedContent = useMemo(() => {
    let content = `# ${siteName || 'Your Site Name'}\n\n`;
    if (summary) {
      content += `> ${summary}\n\n`;
    }
    const validPages = pages.filter((p) => p.name && p.url);
    if (validPages.length > 0) {
      content += `## Key Pages\n\n`;
      validPages.forEach((p) => {
        content += `- [${p.name}](${p.url})\n`;
      });
    }
    return content;
  }, [siteName, summary, pages]);

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <h3 className="text-sm font-medium text-primary mb-1">What is llms.txt?</h3>
        <p className="text-sm text-secondary-muted leading-relaxed">
          The llms.txt file is a standardized markdown file placed at the root of your website
          (e.g., <code className="text-primary">/llms.txt</code>) that helps AI crawlers and
          language models like ChatGPT, Perplexity, and Claude understand your site. It provides
          a concise summary of what your site does and links to key pages, similar to how
          robots.txt guides search engine crawlers.
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="llms-sitename">Site Name</Label>
          <Input
            id="llms-sitename"
            placeholder="MyToolOrbit"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="bg-background border-subtle"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="llms-summary">Short Summary</Label>
          <Textarea
            id="llms-summary"
            placeholder="A brief description of what your site does..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="bg-background border-subtle"
          />
        </div>
      </div>

      {/* Dynamic page list */}
      <div>
        <Label className="mb-3 block">Key Pages / Tools</Label>
        <div className="space-y-3">
          {pages.map((page, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-center">
              <Input
                placeholder="Page name"
                value={page.name}
                onChange={(e) => {
                  const next = [...pages];
                  next[i] = { ...page, name: e.target.value };
                  setPages(next);
                }}
                className="bg-background border-subtle"
              />
              <Input
                placeholder="https://example.com/page"
                value={page.url}
                onChange={(e) => {
                  const next = [...pages];
                  next[i] = { ...page, url: e.target.value };
                  setPages(next);
                }}
                className="bg-background border-subtle"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPages(pages.filter((_, idx) => idx !== i))}
                className="text-secondary-muted hover:text-destructive"
                aria-label="Remove page"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPages([...pages, { name: '', url: '' }])}
          className="mt-3 border-subtle text-secondary-muted hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Add page
        </Button>
      </div>

      {/* Output */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Generated llms.txt</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-subtle text-secondary-muted hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <CopyButton text={generatedContent} label="Copy" />
          </div>
        </div>
        <pre className="max-h-72 overflow-auto rounded-lg border border-subtle bg-background p-4 text-sm text-secondary-muted scrollbar-thin whitespace-pre-wrap">
          <code>{generatedContent}</code>
        </pre>
      </div>
    </div>
  );
}
