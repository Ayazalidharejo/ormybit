'use client';

import { useState, useMemo } from 'react';
import { CopyButton } from '@/components/shared/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SchemaType = 'Article' | 'FAQPage' | 'SoftwareApplication' | 'Organization' | 'BreadcrumbList';

const schemaTypes: SchemaType[] = ['Article', 'FAQPage', 'SoftwareApplication', 'Organization', 'BreadcrumbList'];

export function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState<SchemaType>('Article');

  const [article, setArticle] = useState({
    headline: '',
    author: '',
    datePublished: '',
    image: '',
    publisher: '',
  });

  const [faq, setFaq] = useState([
    { question: '', answer: '' },
  ]);

  const [app, setApp] = useState({
    name: '',
    applicationCategory: '',
    operatingSystem: '',
    offers: '',
    rating: '',
    ratingCount: '',
    description: '',
  });

  const [org, setOrg] = useState({
    name: '',
    url: '',
    logo: '',
    sameAs: '',
    address: '',
  });

  const [breadcrumb, setBreadcrumb] = useState([
    { name: '', url: '' },
  ]);

  const generatedSchema = useMemo(() => {
    let data: Record<string, unknown> = { '@context': 'https://schema.org' };

    switch (schemaType) {
      case 'Article':
        data['@type'] = 'Article';
        if (article.headline) data.headline = article.headline;
        if (article.author) data.author = { '@type': 'Person', name: article.author };
        if (article.datePublished) data.datePublished = article.datePublished;
        if (article.image) data.image = article.image;
        if (article.publisher)
          data.publisher = {
            '@type': 'Organization',
            name: article.publisher,
          };
        break;

      case 'FAQPage':
        data['@type'] = 'FAQPage';
        const validFaqs = faq.filter((f) => f.question && f.answer);
        if (validFaqs.length > 0) {
          data.mainEntity = validFaqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          }));
        }
        break;

      case 'SoftwareApplication':
        data['@type'] = 'SoftwareApplication';
        if (app.name) data.name = app.name;
        if (app.applicationCategory) data.applicationCategory = app.applicationCategory;
        if (app.operatingSystem) data.operatingSystem = app.operatingSystem;
        if (app.description) data.description = app.description;
        if (app.offers)
          data.offers = {
            '@type': 'Offer',
            price: app.offers,
            priceCurrency: 'USD',
          };
        if (app.rating && app.ratingCount)
          data.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: app.rating,
            ratingCount: app.ratingCount,
          };
        break;

      case 'Organization':
        data['@type'] = 'Organization';
        if (org.name) data.name = org.name;
        if (org.url) data.url = org.url;
        if (org.logo) data.logo = org.logo;
        if (org.sameAs) data.sameAs = org.sameAs.split(',').map((s) => s.trim());
        if (org.address) data.address = org.address;
        break;

      case 'BreadcrumbList':
        data['@type'] = 'BreadcrumbList';
        const validCrumbs = breadcrumb.filter((b) => b.name && b.url);
        if (validCrumbs.length > 0) {
          data.itemListElement = validCrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: b.url,
          }));
        }
        break;
    }

    return JSON.stringify(data, null, 2);
  }, [schemaType, article, faq, app, org, breadcrumb]);

  const wrappedSchema = `<script type="application/ld+json">\n${generatedSchema}\n</script>`;

  return (
    <div className="space-y-6">
      {/* Schema type selector */}
      <div className="space-y-2">
        <Label htmlFor="schema-type">Schema Type</Label>
        <Select value={schemaType} onValueChange={(v) => setSchemaType(v as SchemaType)}>
          <SelectTrigger id="schema-type" className="bg-background border-subtle">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {schemaTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic form based on schema type */}
      {schemaType === 'Article' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="art-headline">Headline *</Label>
            <Input id="art-headline" value={article.headline} onChange={(e) => setArticle({ ...article, headline: e.target.value })} className="bg-background border-subtle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="art-author">Author</Label>
            <Input id="art-author" value={article.author} onChange={(e) => setArticle({ ...article, author: e.target.value })} className="bg-background border-subtle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="art-date">Date Published</Label>
            <Input id="art-date" type="date" value={article.datePublished} onChange={(e) => setArticle({ ...article, datePublished: e.target.value })} className="bg-background border-subtle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="art-image">Image URL</Label>
            <Input id="art-image" value={article.image} onChange={(e) => setArticle({ ...article, image: e.target.value })} className="bg-background border-subtle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="art-pub">Publisher</Label>
            <Input id="art-pub" value={article.publisher} onChange={(e) => setArticle({ ...article, publisher: e.target.value })} className="bg-background border-subtle" />
          </div>
        </div>
      )}

      {schemaType === 'FAQPage' && (
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-start">
              <Input placeholder="Question" value={item.question} onChange={(e) => {
                const next = [...faq]; next[i] = { ...item, question: e.target.value }; setFaq(next);
              }} className="bg-background border-subtle" />
              <Textarea placeholder="Answer" value={item.answer} onChange={(e) => {
                const next = [...faq]; next[i] = { ...item, answer: e.target.value }; setFaq(next);
              }} className="bg-background border-subtle min-h-[40px]" />
              <button onClick={() => setFaq(faq.filter((_, idx) => idx !== i))} className="text-secondary-muted hover:text-destructive text-sm mt-2" aria-label="Remove FAQ">Remove</button>
            </div>
          ))}
          <button onClick={() => setFaq([...faq, { question: '', answer: '' }])} className="text-sm font-medium text-primary hover:underline">+ Add FAQ</button>
        </div>
      )}

      {schemaType === 'SoftwareApplication' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="app-name">Name *</Label><Input id="app-name" value={app.name} onChange={(e) => setApp({ ...app, name: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="app-cat">Category</Label><Input id="app-cat" placeholder="DeveloperApplication" value={app.applicationCategory} onChange={(e) => setApp({ ...app, applicationCategory: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="app-os">Operating System</Label><Input id="app-os" placeholder="Web" value={app.operatingSystem} onChange={(e) => setApp({ ...app, operatingSystem: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="app-price">Price (USD)</Label><Input id="app-price" placeholder="0" value={app.offers} onChange={(e) => setApp({ ...app, offers: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="app-rating">Rating Value</Label><Input id="app-rating" placeholder="4.5" value={app.rating} onChange={(e) => setApp({ ...app, rating: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="app-rc">Rating Count</Label><Input id="app-rc" placeholder="100" value={app.ratingCount} onChange={(e) => setApp({ ...app, ratingCount: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="app-desc">Description</Label><Textarea id="app-desc" value={app.description} onChange={(e) => setApp({ ...app, description: e.target.value })} className="bg-background border-subtle" /></div>
        </div>
      )}

      {schemaType === 'Organization' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="org-name">Name *</Label><Input id="org-name" value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="org-url">URL</Label><Input id="org-url" value={org.url} onChange={(e) => setOrg({ ...org, url: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="org-logo">Logo URL</Label><Input id="org-logo" value={org.logo} onChange={(e) => setOrg({ ...org, logo: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2"><Label htmlFor="org-sameas">Social Links (comma separated)</Label><Input id="org-sameas" value={org.sameAs} onChange={(e) => setOrg({ ...org, sameAs: e.target.value })} className="bg-background border-subtle" /></div>
          <div className="space-y-2 sm:col-span-2"><Label htmlFor="org-addr">Address</Label><Input id="org-addr" value={org.address} onChange={(e) => setOrg({ ...org, address: e.target.value })} className="bg-background border-subtle" /></div>
        </div>
      )}

      {schemaType === 'BreadcrumbList' && (
        <div className="space-y-4">
          {breadcrumb.map((item, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-start">
              <Input placeholder="Page name" value={item.name} onChange={(e) => {
                const next = [...breadcrumb]; next[i] = { ...item, name: e.target.value }; setBreadcrumb(next);
              }} className="bg-background border-subtle" />
              <Input placeholder="Page URL" value={item.url} onChange={(e) => {
                const next = [...breadcrumb]; next[i] = { ...item, url: e.target.value }; setBreadcrumb(next);
              }} className="bg-background border-subtle" />
              <button onClick={() => setBreadcrumb(breadcrumb.filter((_, idx) => idx !== i))} className="text-secondary-muted hover:text-destructive text-sm mt-2" aria-label="Remove breadcrumb">Remove</button>
            </div>
          ))}
          <button onClick={() => setBreadcrumb([...breadcrumb, { name: '', url: '' }])} className="text-sm font-medium text-primary hover:underline">+ Add breadcrumb</button>
        </div>
      )}

      {/* Output */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">JSON-LD Output</h3>
          <CopyButton text={wrappedSchema} label="Copy JSON-LD" />
        </div>
        <pre className="max-h-72 overflow-auto rounded-lg border border-subtle bg-background p-4 text-sm text-secondary-muted scrollbar-thin whitespace-pre-wrap break-all">
          <code>{generatedSchema}</code>
        </pre>
      </div>
    </div>
  );
}
