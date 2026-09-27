import { Search, FileText, Sparkles, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface GuideConfig {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  icon: LucideIcon;
  tag: string;
  content: ReactNode[];
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

function IntLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-primary underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}

export const guides: GuideConfig[] = [
  {
    slug: 'meta-tags-seo-guide',
    title: 'How to Write Meta Tags That Actually Improve Click-Through Rate',
    description:
      'A practical guide to writing title tags and meta descriptions that get more clicks from Google search results — with real examples and common mistakes to avoid.',
    metaTitle: 'How to Write Meta Tags That Improve CTR — Complete Guide',
    metaDescription:
      'Learn how to write title tags and meta descriptions that increase click-through rate from Google search. Real examples, character limits, and common mistakes.',
    icon: Search,
    tag: 'SEO',
    content: [
      <>
        <p>
          Meta tags are the single most visible part of your SEO strategy — they are the first thing a potential visitor sees on a Google search results page. A well-written title tag and meta description can increase your click-through rate by 20-30% without changing your ranking at all. This guide walks through exactly how to write them, with specific character limits, real examples, and the mistakes that quietly cost you clicks.
        </p>
      </>,
      <>
        <h2>What meta tags actually matter in 2024?</h2>
        <p>
          There are dozens of meta tags, but only a handful have a real impact on how your page appears in search results:
        </p>
        <ul>
          <li><strong className="text-foreground">Title tag</strong> — the clickable blue link in search results. Google displays 50-60 characters; anything longer gets truncated with an ellipsis.</li>
          <li><strong className="text-foreground">Meta description</strong> — the gray text below the title. Google displays about 150-160 characters on desktop and slightly fewer on mobile.</li>
          <li><strong className="text-foreground">Open Graph tags</strong> (og:title, og:description, og:image) — control how your page looks when shared on Facebook, LinkedIn, and Slack.</li>
          <li><strong className="text-foreground">Twitter Card tags</strong> — control how your page appears when shared on Twitter/X. Twitter falls back to Open Graph tags if these are missing.</li>
        </ul>
        <p>
          You can generate all of these at once using our <IntLink href="/tools/meta-tags-generator">Meta Tags Generator</IntLink>, which also shows a live Google preview so you can see exactly how your tags will be truncated.
        </p>
      </>,
      <>
        <h2>How to write a title tag that gets clicks</h2>
        <p>
          Your title tag has two jobs: tell Google what the page is about, and convince a person to click it instead of the nine other results on the page. Here is how to do both:
        </p>
        <h3>1. Put your primary keyword first</h3>
        <p>
          Google weighs the first words of your title more heavily. If your page targets &quot;best running shoes,&quot; start with those words — not with your brand name. Save the brand name for the end: &quot;Best Running Shoes for Flat Feet — RunnerWorld.&quot;
        </p>
        <h3>2. Stay under 60 characters</h3>
        <p>
          Google truncates titles around 50-60 characters on desktop. If your title is longer, Google may rewrite it entirely. Keep your most important information in the first 55 characters to be safe.
        </p>
        <h3>3. Make it specific, not generic</h3>
        <p>
          &quot;SEO Tips&quot; is generic. &quot;12 SEO Tips That Increased Our Traffic 340% in 6 Months&quot; is specific and clickable. Numbers, timeframes, and concrete outcomes all increase click-through rate. Avoid all-caps words and excessive punctuation — Google may see these as spammy.
        </p>
      </>,
      <>
        <h2>How to write a meta description that earns the click</h2>
        <p>
          Google does not use the meta description as a direct ranking signal, but it does display it in search results — and a better description means more clicks, which means more traffic. Here is what works:
        </p>
        <h3>Lead with the value</h3>
        <p>
          The first 120 characters are what show on mobile. Start with the most compelling part of your page, not with background context. &quot;Learn exactly how to fix a leaky faucet in under 30 minutes — no plumber required&quot; beats &quot;This article discusses various aspects of faucet repair.&quot;
        </p>
        <h3>Include a call to action</h3>
        <p>
          Phrases like &quot;learn how,&quot; &quot;get the checklist,&quot; or &quot;compare the options&quot; tell the searcher what they will get by clicking. This is the one place in SEO where direct selling works.
        </p>
        <h3>Match the page content</h3>
        <p>
          If your description promises something the page does not deliver, visitors will bounce — and Google may eventually rewrite your description. Honesty keeps people on the page, which helps rankings indirectly.
        </p>
      </>,
      <>
        <h2>Common meta tag mistakes that cost you clicks</h2>
        <ul>
          <li><strong className="text-foreground">Duplicate title tags</strong> across pages — Google cannot tell which page is which, and searchers see identical entries. Every page needs a unique title.</li>
          <li><strong className="text-foreground">Stuffing keywords</strong> — &quot;SEO Tips | SEO Guide | SEO Strategies | SEO Help&quot; reads as spam and Google may rewrite it. Write for humans first.</li>
          <li><strong className="text-foreground">No meta description</strong> — Google will generate one from your page content, and it is usually worse than what you would write. Always provide one.</li>
          <li><strong className="text-foreground">Missing Open Graph image</strong> — when someone shares your link, there is no image preview. Use a 1200x630 image. Check how your page looks with our <IntLink href="/tools/og-preview-checker">OG Preview Checker</IntLink>.</li>
        </ul>
      </>,
      <>
        <h2>The bottom line</h2>
        <p>
          Meta tags are the lowest-effort, highest-impact SEO task on your site. Spending 10 minutes per page writing a specific title and a compelling description can increase traffic from existing rankings without any other changes. Use the <IntLink href="/tools/meta-tags-generator">Meta Tags Generator</IntLink> to create and preview your tags, then verify your social share appearance with the <IntLink href="/tools/og-preview-checker">OG Preview Checker</IntLink>. For the technical side, Google&apos;s <ExtLink href="https://developers.google.com/search/docs/appearance/snippet">snippet documentation</ExtLink> covers the official guidelines.
        </p>
      </>,
    ],
  },
  {
    slug: 'schema-markup-guide',
    title: 'A Practical Guide to Schema Markup for Small Sites',
    description:
      'Schema markup explained for non-developers. Which schema types to use, how to add JSON-LD to your site, and how to test it — without getting lost in the spec.',
    metaTitle: 'Schema Markup for Small Sites — A Practical Guide to JSON-LD',
    metaDescription:
      'A practical guide to schema markup for small websites. Which JSON-LD types to use, how to add them, and how to test with Google Rich Results Test.',
    icon: FileText,
    tag: 'SEO',
    content: [
      <>
        {/* Table of Contents */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 mb-8 mt-2 max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-foreground mt-0">Table of Contents</h3>
          <ul className="space-y-2 mb-0 list-none pl-0">
            <li><a href="#what-it-does" className="text-primary hover:underline">What schema markup actually does</a></li>
            <li><a href="#which-types" className="text-primary hover:underline">Which schema types does a small site actually need?</a></li>
            <li><a href="#how-to-add" className="text-primary hover:underline">How to add JSON-LD to your site</a></li>
            <li><a href="#how-to-test" className="text-primary hover:underline">How to test your schema markup</a></li>
          </ul>
        </div>

        {/* Header Image */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden my-8 border border-subtle" style={{ height: '300px' }}>
          <Image src="/images/schema-markup.jpg" alt="Schema Markup and JSON-LD Illustration" width={1200} height={630} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
        </div>

        <p>
          Schema markup is structured data you add to your web pages that helps search engines understand what your content is about. It is what enables rich results — those enhanced search listings with star ratings, FAQ accordions, and breadcrumb trails that stand out from regular results. This guide covers exactly which schema types small sites need, how to add them without a developer, and how to test that they work.
        </p>
      </>,
      <>
        <h2 id="what-it-does">What schema markup actually does</h2>
        <p>
          When you add schema markup to a page, you are giving Google a structured, machine-readable description of what is on that page. Without schema, Google has to guess whether a number on your page is a price, a rating, or a quantity. With schema, you tell it explicitly — &quot;this is a product, the price is $29, and 47 people rated it 4.5 stars.&quot;
        </p>
        <p>
          This does not improve your ranking directly, but it makes your search listing more prominent and informative, which increases click-through rate. According to <ExtLink href="https://developers.google.com/search/docs/appearance/structured-data">Google&apos;s structured data documentation</ExtLink>, pages with valid schema are eligible for rich results, though Google decides whether to actually display them.
        </p>
      </>,
      <>
        <h2 id="which-types">Which schema types does a small site actually need?</h2>
        <p>
          There are hundreds of schema types, but most small sites only need a handful:
        </p>
        <ul>
          <li><strong className="text-foreground">Organization</strong> — tells Google who you are. Add it to your homepage with your name, URL, logo, and social profiles.</li>
          <li><strong className="text-foreground">Article</strong> — for blog posts and news content. Include the headline, author, date published, and image.</li>
          <li><strong className="text-foreground">FAQPage</strong> — if your page has a FAQ section. This can earn an expandable FAQ accordion in search results, which takes up more space and increases clicks.</li>
          <li><strong className="text-foreground">BreadcrumbList</strong> — shows your page&apos;s position in your site hierarchy as a breadcrumb trail in search results.</li>
          <li><strong className="text-foreground">SoftwareApplication</strong> — if you offer a tool or app. Includes pricing, ratings, and category.</li>
        </ul>
        <p>
          You can generate all of these with our <IntLink href="/tools/schema-markup-generator">Schema Markup Generator</IntLink>, which outputs ready-to-paste JSON-LD for each type.
        </p>
      </>,
      <>
        <h2 id="how-to-add">How to add JSON-LD to your site</h2>
        <p>
          JSON-LD is Google&apos;s recommended format for structured data. It is a JavaScript object placed inside a <code className="text-primary">&lt;script type=&quot;application/ld+json&quot;&gt;</code> tag. You can put it in the <code className="text-primary">&lt;head&gt;</code> or anywhere in the body — Google reads it regardless of position.
        </p>
        <h3>If you have a static site</h3>
        <p>
          Paste the generated JSON-LD directly into your HTML, inside the <code className="text-primary">&lt;head&gt;</code> section.
        </p>
        <h3>If you use WordPress</h3>
        <p>
          Most SEO plugins (Yoast, Rank Math) add basic schema automatically. For custom schema types like FAQPage or SoftwareApplication, use a plugin that supports custom JSON-LD, or add it via a custom HTML block in the post editor.
        </p>
        <h3>If you use Next.js or another framework</h3>
        <p>
          Inject the JSON-LD as a <code className="text-primary">&lt;script&gt;</code> tag in your page component. In Next.js, you can use <code className="text-primary">dangerouslySetInnerHTML</code> or a structured data component.
        </p>
      </>,
      <>
        <h2 id="how-to-test">How to test your schema markup</h2>
        <p>
          Before publishing, always validate your markup with <ExtLink href="https://search.google.com/test/rich-results">Google&apos;s Rich Results Test</ExtLink>. Paste your JSON-LD or enter your URL, and the tool will tell you which rich result types your markup is eligible for and flag any errors or warnings.
        </p>
        <p>
          Common errors include missing required fields (every schema type has fields Google requires), invalid date formats (use ISO 8601: YYYY-MM-DD), and nested objects that do not match the schema.org spec. The <IntLink href="/tools/schema-markup-generator">Schema Markup Generator</IntLink> handles the structure for you — you just need to fill in the values.
        </p>
      </>,
      <>
        <h2>Schema markup is not a ranking silver bullet</h2>
        <p>
          Adding schema will not move you from page 2 to page 1. What it does is make your existing listings more prominent and clickable. If you are already ranking well but not getting many clicks, schema markup — especially FAQPage and review snippets — is one of the fastest ways to increase traffic without improving your position. Pair it with <IntLink href="/tools/meta-tags-generator">well-written meta tags</IntLink> for the best results.
        </p>
      </>,
    ],
  },
  {
    slug: 'llms-txt-guide',
    title: 'What Is llms.txt and Do You Actually Need One?',
    description:
      'The llms.txt standard explained in plain language. What it does, which AI crawlers use it, and whether it is worth adding to your site right now.',
    metaTitle: 'What Is llms.txt? A Plain-English Guide to the AI Crawler Standard',
    metaDescription:
      'The llms.txt standard explained. What it does, which AI crawlers use it, and whether your site needs one. A practical, honest guide.',
    icon: Sparkles,
    tag: 'AI',
    content: [
      <>
        <p>
          llms.txt is a standardized text file you place at the root of your website (like robots.txt) that gives AI crawlers and large language models a concise summary of what your site is about and which pages matter most. It is an emerging community standard, not an official specification, but it is gaining adoption as more sites want to be correctly represented in AI-generated answers. This guide explains what it does, which AI systems use it, and whether it is worth your time right now.
        </p>
      </>,
      <>
        <h2>What problem does llms.txt solve?</h2>
        <p>
          When ChatGPT, Perplexity, or Claude answer a question and cite a website, they need to understand what that site is about and which pages are most relevant. Today, they do this by crawling your pages and using their own models to figure out your site structure. This works, but it is imperfect — AI systems may miss important pages, misunderstand your site&apos;s purpose, or cite the wrong page.
        </p>
        <p>
          llms.txt gives you a way to tell AI systems directly: &quot;Here is what my site does, and here are the pages that best represent it.&quot; It is the same idea as <IntLink href="/tools/sitemap-generator">XML sitemaps for search engines</IntLink>, but for AI crawlers. The proposal and specification are at <ExtLink href="https://llmstxt.org">llmstxt.org</ExtLink>.
        </p>
      </>,
      <>
        <h2>What goes in an llms.txt file?</h2>
        <p>
          The format is intentionally simple — plain text with markdown-style headings:
        </p>
        <ul>
          <li><strong className="text-foreground">An H1 heading</strong> with your site name.</li>
          <li><strong className="text-foreground">A blockquote</strong> (&gt;) with a one or two sentence summary of what your site does.</li>
          <li><strong className="text-foreground">H2 sections</strong> grouping your key pages by category, with markdown links to each page.</li>
        </ul>
        <p>
          You can generate this format with our <IntLink href="/tools/llms-txt-generator">llms.txt Generator</IntLink>, which lets you add your site name, summary, and key pages, then copy or download the result.
        </p>
      </>,
      <>
        <h2>Do AI crawlers actually read llms.txt?</h2>
        <p>
          This is the honest answer: as of late 2024, no major AI system has officially confirmed that it reads llms.txt files. The standard is too new. However, the file is plain text at a predictable URL (/llms.txt), and AI crawlers do fetch arbitrary URLs — there is no harm in having it, and early adopters report that AI systems seem to reference their content more accurately after adding it.
        </p>
        <p>
          The risk is essentially zero: it is a small text file, it does not affect your SEO or search rankings, and it does not expose any information that is not already public on your site. The upside is that as more AI systems start checking for llms.txt, your site will already have one.
        </p>
      </>,
      <>
        <h2>How is llms.txt different from robots.txt?</h2>
        <p>
          robots.txt tells crawlers what they are <em>allowed</em> to crawl. llms.txt tells AI crawlers what your site is <em>about</em> and which pages matter most. They serve completely different purposes and do not conflict — you can have both. Use our <IntLink href="/tools/robots-txt-generator">Robots.txt Generator</IntLink> for your robots.txt and the <IntLink href="/tools/llms-txt-generator">llms.txt Generator</IntLink> for your llms.txt.
        </p>
      </>,
      <>
        <h2>Should you add an llms.txt file right now?</h2>
        <p>
          If your site is content-focused and you care about how AI systems represent your brand, yes — it takes two minutes and costs nothing. If your site is a private app or internal tool that you do not want AI systems referencing, skip it. The standard is still emerging, and the landscape may change quickly, but having a well-structured llms.txt file now means you are ready when adoption increases.
        </p>
      </>,
    ],
  },
];

export function getGuideBySlug(slug: string): GuideConfig | undefined {
  return guides.find((g) => g.slug === slug);
}

export const guideSlugs = guides.map((g) => g.slug);
