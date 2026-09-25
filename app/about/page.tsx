import type { Metadata } from 'next';
import Link from 'next/link';
import { Orbit, Target, Shield, Zap, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About MyToolOrbit',
  description:
    'Learn about MyToolOrbit — a free online tools platform with 8 tools for developers, SEO professionals, and AI users. Built for speed, privacy, and simplicity.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: Zap,
    title: 'Speed First',
    description: 'Six of our eight tools run entirely in your browser for instant results. The two that need a server (Broken Link Checker and OG Preview Checker) use lightweight API routes that fetch a single URL on your behalf.',
  },
  {
    icon: Shield,
    title: 'Privacy by Default',
    description: 'Your inputs never leave your browser for the six client-side tools. The two API-route tools send only the URL you enter — no other data is transmitted, stored, or logged.',
  },
  {
    icon: Heart,
    title: 'Free Forever',
    description: 'All eight tools are free to use, with no signup, no premium tiers, and no hidden costs. No ads, no tracking pixels, no data selling.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <Orbit className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About MyToolOrbit
        </h1>
      </div>

      <div className="space-y-6 text-secondary-muted leading-relaxed">
        <p>
          MyToolOrbit is a free online tools platform built for developers, SEO professionals,
          and AI users. We currently offer eight tools across three categories — SEO tools
          (Meta Tags Generator, Schema Markup Generator, Sitemap Generator, Robots.txt
          Generator, and OG Preview Checker), developer tools (Broken Link Checker), and AI
          tools (Token Counter and llms.txt Generator).
        </p>
        <p>
          The platform was born from a simple frustration: too many online tools are slow,
          cluttered with ads, require account creation, or quietly send your data to servers
          you have no control over. We set out to build the opposite — a collection of clean,
          focused tools that work instantly in your browser and respect your privacy by design.
        </p>
        <p>
          Six of our eight tools run entirely client-side, meaning your inputs never leave your
          browser. The Meta Tags Generator, Schema Markup Generator, llms.txt Generator, Token
          Counter, Sitemap Generator, and Robots.txt Generator all process your data locally in
          JavaScript — nothing is sent to any server. The two exceptions are the Broken Link
          Checker and the OG Preview Checker, which each use a single API route to fetch a URL
          on your behalf. Even for these, we do not store the URL you enter, the results, or any
          identifying information. No accounts, no tracking, no data collection.
        </p>
        <p>
          We also publish in-depth guides on SEO and AI topics, including{' '}
          <Link href="/guides/meta-tags-seo-guide" className="text-primary hover:underline">
            how to write meta tags that improve click-through rate
          </Link>
          ,{' '}
          <Link href="/guides/schema-markup-guide" className="text-primary hover:underline">
            a practical guide to schema markup
          </Link>
          , and{' '}
          <Link href="/guides/llms-txt-guide" className="text-primary hover:underline">
            what llms.txt is and whether you need one
          </Link>
          . Each guide connects back to the relevant tools so you can go from understanding to
          doing in one click.
        </p>
        <p>
          Our architecture is designed so that adding a new tool is as simple as creating a
          configuration entry and a widget component — the shared layout, SEO metadata, JSON-LD
          injection, and breadcrumb navigation all happen automatically. This means we can add
          new tools quickly based on what our users need.
        </p>
      </div>

      <div className="mt-12">
        <div className="mb-6 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Our values</h2>
        </div>
        <div className="space-y-4">
          {values.map((value) => (
            <div key={value.title} className="flex gap-4 rounded-xl border border-subtle bg-card p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <value.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="mt-1 text-sm text-secondary-muted">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
