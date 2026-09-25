'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Link2, AlertCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface LinkResult {
  url: string;
  status: number;
  statusText: string;
  responseTime: number;
  error?: string;
}

export function BrokenLinkChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LinkResult[]>([]);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/check-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to check links');
      } else {
        setResults(data.links || []);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: number, error?: string) => {
    if (error) return <XCircle className="h-4 w-4 text-destructive" />;
    if (status >= 200 && status < 300) return <CheckCircle2 className="h-4 w-4 text-primary" />;
    if (status >= 300 && status < 400) return <ArrowRight className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  const getStatusLabel = (status: number, error?: string) => {
    if (error) return 'Error';
    if (status >= 200 && status < 300) return 'OK';
    if (status >= 300 && status < 400) return 'Redirect';
    if (status >= 400 && status < 500) return 'Broken';
    if (status >= 500) return 'Server Error';
    return 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <Label htmlFor="blc-url">Page URL to check</Label>
        <div className="flex gap-2">
          <Input
            id="blc-url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            className="bg-background border-subtle"
          />
          <Button
            onClick={handleCheck}
            disabled={loading || !url}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                Check links
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-subtle">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-subtle bg-muted">
                <th className="px-4 py-3 text-left font-medium text-secondary-muted">Status</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-muted">Code</th>
                <th className="px-4 py-3 text-left font-medium text-secondary-muted">URL</th>
                <th className="px-4 py-3 text-right font-medium text-secondary-muted">Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((link, i) => (
                <tr key={i} className="border-b border-subtle last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(link.status, link.error)}
                      <span className="text-foreground">{getStatusLabel(link.status, link.error)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-secondary-muted">
                    {link.error ? '-' : link.status}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate block max-w-xs"
                      title={link.url}
                    >
                      {link.url}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right text-secondary-muted">
                    {link.responseTime > 0 ? `${link.responseTime}ms` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && results.length === 0 && !error && (
        <div className="text-center py-8 text-secondary-muted">
          <Link2 className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Enter a URL above to check all links on that page.</p>
        </div>
      )}
    </div>
  );
}
