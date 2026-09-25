'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, AlertCircle, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

interface OgData {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  url: string | null;
  foundTags: string[];
  missingTags: string[];
}

export function OgPreviewChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OgData | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch('/api/check-og', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to fetch page');
      } else {
        setData(result);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const previewTitle = data?.twitterTitle || data?.title || 'No title found';
  const previewDesc = data?.twitterDescription || data?.description || 'No description found';
  const previewImage = data?.twitterImage || data?.image;
  const previewSite = data?.siteName || data?.url || '';

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <Label htmlFor="og-url">URL to check</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="og-url"
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
                <Eye className="h-4 w-4" />
                Check preview
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

      {/* Preview card */}
      {data && (
        <>
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">Social share preview</h3>
            <div className="max-w-md overflow-hidden rounded-lg border border-subtle bg-background">
              <div className="flex aspect-[1.91/1] items-center justify-center bg-muted">
                {previewImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewImage}
                    alt="OG preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-sm text-secondary-muted">No image found</span>
                )}
              </div>
              <div className="p-3">
                <div className="text-xs uppercase tracking-wide text-secondary-muted truncate">
                  {previewSite || 'example.com'}
                </div>
                <div className="mt-0.5 text-sm font-medium text-foreground line-clamp-2">
                  {previewTitle}
                </div>
                <div className="mt-0.5 text-xs text-secondary-muted line-clamp-2">
                  {previewDesc}
                </div>
              </div>
            </div>
          </div>

          {/* Found tags */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">Tags found</h3>
            <div className="space-y-2">
              {data.foundTags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <code className="text-secondary-muted">{tag}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Missing tags */}
          {data.missingTags.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-foreground">Missing tags</h3>
              <div className="space-y-2">
                {data.missingTags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-destructive shrink-0" />
                    <code className="text-secondary-muted">{tag}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw values */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">Extracted values</h3>
            <div className="space-y-3">
              {[
                { label: 'og:title', value: data.title },
                { label: 'og:description', value: data.description },
                { label: 'og:image', value: data.image },
                { label: 'og:site_name', value: data.siteName },
                { label: 'og:url', value: data.url },
                { label: 'twitter:card', value: data.twitterCard },
                { label: 'twitter:title', value: data.twitterTitle },
                { label: 'twitter:description', value: data.twitterDescription },
                { label: 'twitter:image', value: data.twitterImage },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr]">
                  <code className="text-sm text-primary">{item.label}</code>
                  <span className="text-sm text-secondary-muted break-all">
                    {item.value || <em className="text-destructive/70">not found</em>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!loading && !data && !error && (
        <div className="py-8 text-center text-secondary-muted">
          <Eye className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">Enter a URL above to check its Open Graph and Twitter Card tags.</p>
        </div>
      )}
    </div>
  );
}
