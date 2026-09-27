'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { CopyButton } from '@/components/shared/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Share2 } from 'lucide-react';

export function MetaTagsGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [siteName, setSiteName] = useState('');

  const generatedTags = useMemo(() => {
    const tags: string[] = [];
    if (title) tags.push(`<title>${title}</title>`);
    if (description)
      tags.push(`<meta name="description" content="${description}" />`);
    if (url) tags.push(`<link rel="canonical" href="${url}" />`);
    if (title) tags.push(`<meta property="og:title" content="${title}" />`);
    if (description)
      tags.push(`<meta property="og:description" content="${description}" />`);
    if (url) tags.push(`<meta property="og:url" content="${url}" />`);
    if (image) tags.push(`<meta property="og:image" content="${image}" />`);
    if (siteName)
      tags.push(`<meta property="og:site_name" content="${siteName}" />`);
    tags.push(`<meta property="og:type" content="website" />`);
    if (title)
      tags.push(`<meta name="twitter:title" content="${title}" />`);
    if (description)
      tags.push(`<meta name="twitter:description" content="${description}" />`);
    if (image)
      tags.push(`<meta name="twitter:image" content="${image}" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    return tags.join('\n');
  }, [title, description, url, image, siteName]);

  const truncatedTitle = title.length > 60 ? title.slice(0, 57) + '...' : title;
  const truncatedDesc =
    description.length > 160 ? description.slice(0, 157) + '...' : description;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mt-title">Page Title</Label>
          <Input
            id="mt-title"
            placeholder="Free Online Tools for Developers"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background border-subtle"
          />
          <p className="text-xs text-secondary-muted">{title.length}/60 chars</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mt-sitename">Site Name</Label>
          <Input
            id="mt-sitename"
            placeholder="MyToolOrbit"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="bg-background border-subtle"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="mt-desc">Meta Description</Label>
          <Input
            id="mt-desc"
            placeholder="A short, compelling description of your page..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-background border-subtle"
          />
          <p className="text-xs text-secondary-muted">{description.length}/160 chars</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mt-url">Page URL</Label>
          <Input
            id="mt-url"
            placeholder="https://example.com/page"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-background border-subtle"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mt-image">Image URL (1200x630 recommended)</Label>
          <Input
            id="mt-image"
            placeholder="https://example.com/og-image.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="bg-background border-subtle"
          />
        </div>
      </div>

      {/* Google Preview */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <Globe className="h-4 w-4 text-primary" />
          Google Search Preview
        </div>
        <div className="rounded-lg border border-subtle bg-background p-4">
          <div className="text-xs text-secondary-muted">
            {url || 'https://example.com'}
          </div>
          <div className="mt-1 text-lg leading-snug text-primary hover:underline cursor-pointer">
            {truncatedTitle || 'Your Page Title Will Appear Here'}
          </div>
          <div className="mt-1 text-sm leading-relaxed text-secondary-muted">
            {truncatedDesc || 'Your meta description will appear here...'}
          </div>
        </div>
      </div>

      {/* Social Preview */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <Share2 className="h-4 w-4 text-primary" />
          Social Share Preview
        </div>
        <div className="max-w-md overflow-hidden rounded-lg border border-subtle bg-background">
          <div className="relative aspect-[1.91/1] bg-muted flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt="Social share card preview image"
                fill
                unoptimized
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-sm text-secondary-muted">1200 x 630 image</span>
            )}
          </div>
          <div className="p-3">
            <div className="text-xs uppercase tracking-wide text-secondary-muted">
              {siteName || 'example.com'}
            </div>
            <div className="mt-0.5 text-sm font-medium text-foreground line-clamp-2">
              {truncatedTitle || 'Your Page Title'}
            </div>
            <div className="mt-0.5 text-xs text-secondary-muted line-clamp-2">
              {truncatedDesc || 'Your meta description...'}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Tags */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Generated Meta Tags</h3>
          <CopyButton text={generatedTags} label="Copy tags" />
        </div>
        <pre className="max-h-72 overflow-auto rounded-lg border border-subtle bg-background p-4 text-sm text-secondary-muted scrollbar-thin whitespace-pre-wrap break-all">
          <code>{generatedTags || 'Fill in the fields above to generate meta tags...'}</code>
        </pre>
      </div>
    </div>
  );
}
