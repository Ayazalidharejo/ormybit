'use client';

import { useState, useMemo } from 'react';
import { CopyButton } from '@/components/shared/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Download } from 'lucide-react';

interface SitemapEntry {
  url: string;
  priority: string;
  changefreq: string;
}

const changefreqOptions = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function SitemapGenerator() {
  const [entries, setEntries] = useState<SitemapEntry[]>([
    { url: '', priority: '0.8', changefreq: 'weekly' },
    { url: '', priority: '0.6', changefreq: 'monthly' },
  ]);
  const [bulkText, setBulkText] = useState('');

  const handleBulkAdd = () => {
    if (!bulkText.trim()) return;
    const urls = bulkText
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u);
    const newEntries = urls.map((url) => ({
      url,
      priority: '0.7',
      changefreq: 'weekly',
    }));
    setEntries([...entries, ...newEntries]);
    setBulkText('');
  };

  const generatedXml = useMemo(() => {
    const validEntries = entries.filter((e) => e.url);
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    validEntries.forEach((entry) => {
      xml += '  <url>\n';
      xml += `    <loc>${escapeXml(entry.url)}</loc>\n`;
      xml += `    <priority>${entry.priority || '0.5'}</priority>\n`;
      xml += `    <changefreq>${entry.changefreq || 'weekly'}</changefreq>\n`;
      xml += '  </url>\n';
    });
    xml += '</urlset>';
    return xml;
  }, [entries]);

  const handleDownload = () => {
    const blob = new Blob([generatedXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Bulk add */}
      <div className="space-y-2">
        <Label htmlFor="sm-bulk">Bulk add URLs (one per line)</Label>
        <Textarea
          id="sm-bulk"
          placeholder={'https://example.com/page1\nhttps://example.com/page2'}
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          className="bg-background border-subtle min-h-[80px] font-mono text-sm"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleBulkAdd}
          className="border-subtle text-secondary-muted hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Add URLs
        </Button>
      </div>

      {/* URL entries */}
      <div className="space-y-3">
        <Label>URL entries</Label>
        {entries.map((entry, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-[1fr_100px_140px_auto] items-center">
            <Input
              placeholder="https://example.com/page"
              value={entry.url}
              onChange={(e) => {
                const next = [...entries];
                next[i] = { ...entry, url: e.target.value };
                setEntries(next);
              }}
              className="bg-background border-subtle"
            />
            <Input
              type="number"
              step="0.1"
              min="0"
              max="1"
              placeholder="0.7"
              value={entry.priority}
              onChange={(e) => {
                const next = [...entries];
                next[i] = { ...entry, priority: e.target.value };
                setEntries(next);
              }}
              className="bg-background border-subtle"
            />
            <Select
              value={entry.changefreq}
              onValueChange={(v) => {
                const next = [...entries];
                next[i] = { ...entry, changefreq: v };
                setEntries(next);
              }}
            >
              <SelectTrigger className="bg-background border-subtle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {changefreqOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEntries(entries.filter((_, idx) => idx !== i))}
              className="text-secondary-muted hover:text-destructive"
              aria-label="Remove URL"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setEntries([...entries, { url: '', priority: '0.7', changefreq: 'weekly' }])
          }
          className="border-subtle text-secondary-muted hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Add URL
        </Button>
      </div>

      {/* Output */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Generated sitemap.xml</h3>
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
            <CopyButton text={generatedXml} label="Copy" />
          </div>
        </div>
        <pre className="max-h-72 overflow-auto rounded-lg border border-subtle bg-background p-4 text-sm text-secondary-muted scrollbar-thin whitespace-pre-wrap break-all">
          <code>{generatedXml}</code>
        </pre>
      </div>
    </div>
  );
}
