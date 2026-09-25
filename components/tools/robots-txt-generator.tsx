'use client';

import { useState, useMemo } from 'react';
import { CopyButton } from '@/components/shared/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Download } from 'lucide-react';

interface DisallowRule {
  path: string;
}

export function RobotsTxtGenerator() {
  const [userAgent, setUserAgent] = useState('*');
  const [disallowRules, setDisallowRules] = useState<DisallowRule[]>([
    { path: '/admin/' },
    { path: '/cgi-bin/' },
  { path: '/tmp/' },
  { path: '/search' },
  { path: '/*?*' },
  { path: '/cart' },
  { path: '/checkout' },
    { path: '/account' },
    { path: '/login' },
    { path: '/register' },
    { path: '/wp-admin/' },
    { path: '/wp-login' },
  ]);
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml');

  const generatedContent = useMemo(() => {
    let content = `User-agent: ${userAgent || '*'}\n`;
    content += `Allow: /\n`;
    const validRules = disallowRules.filter((r) => r.path);
    if (validRules.length > 0) {
      content += validRules.map((r) => `Disallow: ${r.path}`).join('\n');
      content += '\n';
    }
    if (sitemapUrl) {
      content += `\nSitemap: ${sitemapUrl}\n`;
    }
    return content;
  }, [userAgent, disallowRules, sitemapUrl]);

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* User-agent */}
      <div className="space-y-2">
        <Label htmlFor="rt-ua">User-agent</Label>
        <Input
          id="rt-ua"
          placeholder="* (all crawlers)"
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          className="bg-background border-subtle"
        />
        <p className="text-xs text-secondary-muted">
          Use <code className="text-primary">*</code> to target all crawlers, or specify a specific bot like <code className="text-primary">Googlebot</code>.
        </p>
      </div>

      {/* Disallow rules */}
      <div>
        <Label className="mb-3 block">Disallow rules</Label>
        <div className="space-y-3">
          {disallowRules.map((rule, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  placeholder="/admin/"
                  value={rule.path}
                  onChange={(e) => {
                    const next = [...disallowRules];
                    next[i] = { path: e.target.value };
                    setDisallowRules(next);
                  }}
                  className="bg-background border-subtle font-mono text-sm"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDisallowRules(disallowRules.filter((_, idx) => idx !== i))}
                className="text-secondary-muted hover:text-destructive shrink-0"
                aria-label="Remove rule"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDisallowRules([...disallowRules, { path: '' }])}
          className="mt-3 border-subtle text-secondary-muted hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Add disallow rule
        </Button>
      </div>

      {/* Sitemap URL */}
      <div className="space-y-2">
        <Label htmlFor="rt-sitemap">Sitemap URL (optional)</Label>
        <Input
          id="rt-sitemap"
          placeholder="https://example.com/sitemap.xml"
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          className="bg-background border-subtle"
        />
      </div>

      {/* Output */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Generated robots.txt</h3>
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
        <pre className="max-h-72 overflow-auto rounded-lg border border-subtle bg-background p-4 text-sm text-secondary-muted scrollbar-thin whitespace-pre-wrap break-all">
          <code>{generatedContent}</code>
        </pre>
      </div>
    </div>
  );
}
