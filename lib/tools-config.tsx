import {
  Search,
  Code2,
  Sparkles,
  FileText,
  Link2,
  Hash,
  FileCode,
  Tag,
  GitBranch,
  Bot,
  Eye,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export type ToolCategory = 'seo-tools' | 'dev-tools' | 'ai-tools';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolConfig {
  slug: string;
  name: string;
  category: ToolCategory;
  shortDescription: string;
  longDescription: ReactNode[];
  metaTitle: string;
  metaDescription: string;
  faqs: FAQItem[];
  relatedTools: string[];
  icon: LucideIcon;
  keywords: string[];
}

export const categoryConfig: Record<
  ToolCategory,
  { name: string; description: string; icon: LucideIcon }
> = {
  'seo-tools': {
    name: 'SEO Tools',
    description:
      'Optimize your website for search engines with meta tags, schema markup, sitemaps, and link analysis.',
    icon: Search,
  },
  'dev-tools': {
    name: 'Developer Tools',
    description:
      'Utilities for developers including token counting, link checking, and more.',
    icon: Code2,
  },
  'ai-tools': {
    name: 'AI Tools',
    description:
      'Tools for AI and LLM workflows including token counting and llms.txt generation.',
    icon: Sparkles,
  },
};

// Helper for external links
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

// Helper for internal links
function IntLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-primary underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}

export const tools: ToolConfig[] = [
  {
    slug: 'ai-content-brief-generator',
    name: 'AI Content Brief Generator',
    category: 'ai-tools',
    shortDescription:
      'Generate a complete content outline for any keyword — subtopics to cover, questions to answer, and target word count  powered by AI.',
    longDescription: [
      'An AI Content Brief Generator is an automated SEO tool that creates comprehensive content outlines by analyzing top-ranking competitor pages for your target keyword. It extracts heading structures, common questions, and required semantic entities to build a complete structural blueprint for your article. By reverse-engineering what already ranks, this tool ensures your content covers exactly what search engines and readers expect to see.',
      <>
        <strong>What is a Content Brief and Why Does it Matter?</strong> A high-quality content brief is the essential foundation of any successful SEO strategy. Rather than guessing what to write, a brief grounds your work in a data-backed blueprint. When combined with our <IntLink href="/tools/meta-tags-generator">Meta Tags Generator</IntLink> and <IntLink href="/tools/schema-markup-generator">Schema Markup Generator</IntLink>, a well-structured brief gives you a significant advantage. Content that matches the structural expectations of top results—while expanding with genuine depth—tends to perform much better. For more context on creating people-first content, review <ExtLink href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content">Google\'s guidelines on creating helpful content</ExtLink>.
      </>,
      'In the competitive landscape of modern SEO, search engines rely heavily on semantic relationships to determine relevance. A brief gives you the framework to naturally include these elements. Our generator takes the heavy lifting out of this process. It extracts the heading structures (H1s, H2s, H3s) and body context from the competitors you provide, synthesizing that raw data into a clean, actionable outline.',
      <>
        <strong>Honest Limitations: This is a Starting Point, Not a Magic Bullet.</strong> Please note that while an AI-generated brief gives you the structural blueprint of top-performing content, it absolutely does not guarantee rankings on its own. It is designed to be a starting point that you build upon. To actually rank and convert readers, you must execute on this brief with high-quality writing, original insights, unique industry examples, and your own hard-earned expertise. This is not a "fill-in-the-blank" shortcut for mass-producing low-effort content. It is a professional tool for serious writers and marketers who want to ensure their best work is structurally sound.
      </>,
      <>
        <strong>How is this different from just asking ChatGPT?</strong> While you can certainly open ChatGPT and ask for an outline, this tool is specifically engineered and structured for SEO content creation. First, it can actively scrape and read the actual structure of live competitor URLs you provide, grounding the AI's generation in reality rather than just its training weights. Second, it enforces a strict, highly useful JSON format that guarantees you receive a targeted H1, an H2 structure with specific writing notes, relevant "People Also Ask" style questions, target word counts, and related semantic entities. You aren't just chatting with a bot; you're operating a specialized SEO tool designed to produce actionable briefs you can copy straight into your document.
      </>
    ],
    metaTitle: 'Free AI Content Brief Generator - SEO Content Outline Tool | MyToolOrbit',
    metaDescription:
      'Generate AI-powered content briefs and outlines for any target keyword. See what subtopics and questions top-ranking pages cover. Free alternative to paid content brief tools.',
    faqs: [
      {
        question: 'How is this different from just asking ChatGPT?',
        answer:
          'While you can ask ChatGPT for an outline, this tool specifically structures its output for SEO content creation, returning a targeted H1, an H2 structure with specific notes, relevant "People Also Ask" style questions, target word counts, and semantic entities. Plus, it can actively scrape and analyze up to 3 competitor URLs you provide to ground the brief in what is actually ranking.',
      },
      {
        question: 'Does following this brief guarantee I will rank?',
        answer:
          'No. A content brief provides the structural blueprint of what search engines expect to see for a given query, which is a crucial starting point. However, to actually rank, you need to execute on that brief with high-quality writing, original insights, unique expertise, and a site that has sufficient authority in your niche.',
      },
      {
        question: 'How accurate is the competitor analysis?',
        answer:
          'When you provide competitor URLs, our server fetches those pages and extracts their heading structure (H1s, H2s, H3s) along with a portion of the body text. This extracted data is then fed to the AI model alongside your keyword to produce a highly contextual brief. Note that some sites block automated scraping, in which case the tool falls back to generating a high-quality brief based solely on the keyword.',
      },
    ],
    relatedTools: ['schema-markup-generator', 'meta-tags-generator'],
    icon: Sparkles,
    keywords: ['content brief generator', 'ai content outline', 'seo brief tool', 'content outline maker', 'seo content writing'],
  },
  {
    slug: 'meta-tags-generator',
    name: 'Meta Tags Generator',
    category: 'seo-tools',
    shortDescription:
      'Generate meta tags, Open Graph, and Twitter Card tags with live Google and social previews.',
    longDescription: [
      'A Meta Tags Generator is an online tool that creates optimized HTML meta tags, Open Graph tags, and Twitter Card tags for your website. Simply enter your page title, description, and image URL to instantly generate the code required for search engines and social platforms. This ensures your content looks professional and clickable when shared online.',
      <>
        Meta tags are the first thing search engines and social platforms see when they encounter your page. A well-crafted title tag and meta description can dramatically improve click-through rates from search results, while{' '}
        <IntLink href="/tools/og-preview-checker">Open Graph and Twitter Card tags</IntLink>{' '}
        control how your links appear when shared on Facebook, LinkedIn, Twitter, and Slack. For best practices, review Google&apos;s own{' '}
        <ExtLink href="https://developers.google.com/search/docs/appearance/snippet">documentation on title links and meta descriptions</ExtLink>{' '}
        which recommends keeping titles concise and descriptions descriptive. You can also pair this with our <IntLink href="/tools/sitemap-generator">Sitemap Generator</IntLink> to ensure these optimized pages are actually crawled.
      </>,
      <>
        This tool goes beyond simple tag generation — it provides a live preview of how your page will appear as a Google search result and as a social media share card. This lets you fine-tune your title length, description wording, and image before publishing, so you can be confident your snippets look professional everywhere. You can also{' '}
        <IntLink href="/tools/schema-markup-generator">add structured data with our Schema Markup Generator</IntLink>{' '}
        to further enhance how your pages appear in search.
      </>,
      'Every tag is generated according to current best practices. The title tag is kept within Google\'s display limits, the meta description is crafted for maximum SERP impact, and the Open Graph tags include all properties needed for rich social sharing previews.',
    ],
    metaTitle: 'Meta Tags Generator — Free SEO Meta & OG Tag Tool',
    metaDescription:
      'Generate SEO meta tags, Open Graph, and Twitter Card tags with live Google search and social share previews. Free, no signup required.',
    faqs: [
      {
        question: 'What are meta tags and why do they matter for SEO?',
        answer:
          'Meta tags are HTML elements in the <head> of your page that provide information to search engines and social platforms. The title tag and meta description are the most important for SEO — they determine how your page appears in search results and directly influence click-through rates.',
      },
      {
        question: 'What is the ideal length for a meta title and description?',
        answer:
          'Google typically displays 50-60 characters for titles and 150-160 characters for descriptions. This tool shows a live Google preview so you can see exactly how your tags will be truncated, if at all.',
      },
      {
        question: 'What are Open Graph tags?',
        answer:
          'Open Graph (OG) tags are meta tags used by Facebook, LinkedIn, and other social platforms to control how your page appears when shared. They include og:title, og:description, og:image, og:url, and og:site_name.',
      },
      {
        question: 'Do I need Twitter Card tags separately?',
        answer:
          'Twitter uses Twitter Card tags (twitter:card, twitter:title, etc.) for its share previews. However, if Twitter Card tags are missing, Twitter falls back to Open Graph tags. This tool generates both for maximum compatibility.',
      },
      {
        question: 'Where do I paste the generated meta tags?',
        answer:
          'Paste the generated HTML tags inside the <head> section of your web page, before the closing </head> tag. If you are using a CMS like WordPress, you can use an SEO plugin or a custom fields approach instead.',
      },
    ],
    relatedTools: ['schema-markup-generator', 'sitemap-generator', 'og-preview-checker'],
    icon: Tag,
    keywords: ['meta tags', 'open graph', 'twitter card', 'seo', 'og tags'],
  },
  {
    slug: 'schema-markup-generator',
    name: 'Schema Markup Generator',
    category: 'seo-tools',
    shortDescription:
      'Generate JSON-LD structured data for Article, FAQPage, SoftwareApplication, Organization, and BreadcrumbList.',
    longDescription: [
      'A Schema Markup Generator is a developer utility designed to produce valid JSON-LD structured data that search engines use to deeply understand web content. By selecting a schema type and filling in your details, it instantly creates the exact code required to make your pages eligible for rich results like star ratings and FAQ accordions. This ensures your code is perfectly formatted to increase your search visibility.',
      <>
        Search engines like Google use structured data to enable rich results — enhanced listings that show star ratings, FAQ accordions, breadcrumb trails, event details, and more directly in search results. These rich results can significantly increase your visibility and click-through rates. You can validate your generated markup using{' '}
        <ExtLink href="https://search.google.com/test/rich-results">Google&apos;s Rich Results Test</ExtLink>{' '}
        before publishing. The full vocabulary is defined at{' '}
        <ExtLink href="https://schema.org">schema.org</ExtLink>.
      </>,
      <>
        This tool supports five of the most commonly needed schema types: Article (for blog posts and news), FAQPage (for frequently asked questions), SoftwareApplication (for apps and tools), Organization (for business information), and BreadcrumbList (for navigation trails). Simply select the schema type, fill in the relevant fields, and copy the generated JSON-LD. Once your structured data is live, pair it with our{' '}
        <IntLink href="/tools/meta-tags-generator">Meta Tags Generator</IntLink>{' '}
        for maximum search visibility, and then submit it using a <IntLink href="/tools/sitemap-generator">sitemap</IntLink>.
      </>,
      'The generated markup follows schema.org specifications and Google\'s structured data guidelines. The tool validates that required fields are filled before generating output, so you can be confident the markup will be accepted by search engines.',
    ],
    metaTitle: 'Schema Markup Generator — Free JSON-LD Structured Data Tool',
    metaDescription:
      'Generate JSON-LD schema markup for Article, FAQPage, SoftwareApplication, Organization, and BreadcrumbList. Valid structured data for rich search results.',
    faqs: [
      {
        question: 'What is schema markup and why is it important?',
        answer:
          'Schema markup is structured data (typically JSON-LD) that you add to your web pages to help search engines understand your content. It enables rich results in search listings, such as FAQ accordions, star ratings, and breadcrumb trails.',
      },
      {
        question: 'What is JSON-LD?',
        answer:
          'JSON-LD (JavaScript Object Notation for Linked Data) is Google\'s recommended format for structured data. It is a JavaScript notation embedded in a <script type="application/ld+json"> tag in the page head or body.',
      },
      {
        question: 'Which schema types does this tool support?',
        answer:
          'This tool supports Article, FAQPage, SoftwareApplication, Organization, and BreadcrumbList schema types. These cover the most common structured data needs for content sites, SaaS products, and business pages.',
      },
      {
        question: 'How do I add the generated schema to my page?',
        answer:
          'Paste the generated JSON-LD script tag inside the <head> section of your HTML, or anywhere in the body. Google reads JSON-LD regardless of its position on the page, but the head is the conventional location.',
      },
      {
        question: 'Will schema markup guarantee rich results in Google?',
        answer:
          'No. Schema markup makes your content eligible for rich results, but Google decides whether to display them based on relevance, quality, and other factors. However, valid structured data is a prerequisite for rich results.',
      },
    ],
    relatedTools: ['meta-tags-generator', 'sitemap-generator', 'broken-link-checker'],
    icon: FileCode,
    keywords: ['schema markup', 'json-ld', 'structured data', 'rich results'],
  },
  {
    slug: 'llms-txt-generator',
    name: 'llms.txt Generator',
    category: 'ai-tools',
    shortDescription:
      'Generate an llms.txt file to help AI crawlers from ChatGPT, Perplexity, and Claude understand your site.',
    longDescription: [
      'An llms.txt Generator is an online utility that creates a structured markdown file to guide AI crawlers—like ChatGPT, Claude, and Perplexity—in understanding your website. By generating a standardized summary of your site\'s purpose and key pages, it ensures language models can accurately index and cite your content. This functions similarly to a robots.txt file, but is specifically built for modern AI system ingestion.',
      <>
        When AI assistants like ChatGPT, Perplexity, and Claude encounter your site, they need to understand what your content is about and which pages matter most. An llms.txt file provides a concise, machine-readable summary of your site, including its name, purpose, and key pages — all in a format that language models can easily parse. The official proposal is available at{' '}
        <ExtLink href="https://llmstxt.org">llmstxt.org</ExtLink>.
      </>,
      <>
        The format follows the emerging llms.txt standard: an H1 heading with your site name, a blockquote summary, and H2 sections listing key links. This structure mirrors how language models process markdown, making it easy for them to extract and reference your content accurately. To ensure your AI integration is cost-effective, use our{' '}
        <IntLink href="/tools/token-counter">Token Counter</IntLink> to estimate prompt limits, or generate structural outlines with the <IntLink href="/tools/ai-content-brief-generator">AI Content Brief Generator</IntLink>.
      </>,
      'By providing an llms.txt file, you increase the likelihood that AI systems will correctly represent your site in their responses, cite your content accurately, and direct users to the right pages. It is a simple but powerful step toward making your site AI-friendly.',
    ],
    metaTitle: 'llms.txt Generator — Make Your Site AI-Friendly | Free Tool',
    metaDescription:
      'Generate an llms.txt file to help AI crawlers from ChatGPT, Perplexity, and Claude understand your site. Follow the emerging llms.txt standard.',
    faqs: [
      {
        question: 'What is llms.txt?',
        answer:
          'llms.txt is a standardized text file (similar to robots.txt) that provides a concise, machine-readable summary of your website for AI crawlers and large language models. It follows a markdown-style format with an H1 site name, blockquote summary, and H2 sections with key links.',
      },
      {
        question: 'Why does my site need an llms.txt file?',
        answer:
          'AI assistants like ChatGPT, Perplexity, and Claude crawl the web to build their knowledge. An llms.txt file helps them understand your site structure, purpose, and key pages, so they can represent your content accurately in their responses.',
      },
      {
        question: 'Where should I put the llms.txt file?',
        answer:
          'Place the llms.txt file at the root of your website, e.g., https://yoursite.com/llms.txt. This is the conventional location that AI crawlers check, similar to robots.txt.',
      },
      {
        question: 'Is llms.txt an official standard?',
        answer:
          'llms.txt is an emerging community standard, not an official W3C or IETF specification. However, it is gaining adoption among AI-focused sites and tools as a way to communicate with language models.',
      },
      {
        question: 'What should I include in my llms.txt file?',
        answer:
          'Include your site name, a concise summary of what your site does, and links to your most important pages grouped by section. Focus on the pages that best represent your site\'s value to users and AI systems.',
      },
    ],
    relatedTools: ['meta-tags-generator', 'schema-markup-generator', 'token-counter'],
    icon: FileText,
    keywords: ['llms.txt', 'ai crawlers', 'chatgpt', 'perplexity', 'claude'],
  },
  {
    slug: 'broken-link-checker',
    name: 'Broken Link Checker',
    category: 'dev-tools',
    shortDescription:
      'Check any web page for broken links. Get HTTP status codes, response times, and link status in a table.',
    longDescription: [
      'A Broken Link Checker is an auditing tool that scans web pages to identify dead outbound and internal links by testing their HTTP status codes. It fetches the page, extracts all anchor tags, and checks for 404 errors, redirects, and timeouts. This helps webmasters quickly detect and fix broken references before they negatively impact user experience and SEO rankings.',
      <>
        Simply enter the URL of the page you want to check, and the tool fetches the page, extracts every &lt;a href&gt; link, and checks each link&apos;s HTTP status in parallel. The results are displayed in a sortable table showing the link URL, status code, status category (OK, Broken, Redirect), and response time. If you find broken links pointing to pages that no longer exist, you should use our{' '}
        <IntLink href="/tools/sitemap-generator">Sitemap Generator</IntLink>{' '}
        to update your XML structure, and then verify crawling rules with the <IntLink href="/tools/robots-txt-generator">Robots.txt Generator</IntLink>.
      </>,
      <>
        The checker handles redirects, timeouts, and CORS-restricted responses gracefully. Links that cannot be reached due to CORS policies or network errors are clearly marked, so you are not left guessing whether a link is actually broken or just inaccessible from the checker. For monitoring your site&apos;s indexing status,{' '}
        <ExtLink href="https://support.google.com/webmasters/answer/7440203">Google Search Console&apos;s coverage report</ExtLink>{' '}
        complements this tool by showing which pages Google can and cannot index.
      </>,
      'Regular link auditing is a best practice for any website. Broken links accumulate over time as external sites reorganize, delete pages, or go offline. Running this tool periodically helps you catch and fix broken links before they impact your search rankings or user experience.',
    ],
    metaTitle: 'Broken Link Checker — Free Online Tool for Dead Link Detection',
    metaDescription:
      'Check any web page for broken links. Get HTTP status codes, response times, and link status. Free, fast, no signup required.',
    faqs: [
      {
        question: 'How does the Broken Link Checker work?',
        answer:
          'The tool fetches the page you enter, extracts all <a href> links, and checks each link\'s HTTP status code in parallel with a concurrency limit. Results are displayed in a table with status code, status category, and response time.',
      },
      {
        question: 'What HTTP status codes are considered broken?',
        answer:
          'Status codes in the 4xx range (403, 404, 410) and 5xx range (500, 502, 503) are considered broken. 3xx codes are redirects. 2xx codes are OK. Links that cannot be reached due to network or CORS errors are marked as "Error".',
      },
      {
        question: 'Why are some links marked as "Error" instead of broken?',
        answer:
          'Some websites block automated requests or enforce CORS policies that prevent the checker from reading the response. These links are marked as "Error" because the tool cannot determine their actual status — they may or may not be broken.',
      },
      {
        question: 'Is there a limit on how many links can be checked?',
        answer:
          'The tool checks links in parallel batches with a reasonable concurrency limit to avoid overwhelming servers. There is no hard limit on the number of links, but very large pages may take longer to process.',
      },
      {
        question: 'How often should I check for broken links?',
        answer:
          'For most sites, a monthly link audit is sufficient. High-traffic sites or sites with many external links may benefit from weekly checks. Always re-check after major content updates or site migrations.',
      },
    ],
    relatedTools: ['sitemap-generator', 'meta-tags-generator', 'robots-txt-generator'],
    icon: Link2,
    keywords: ['broken links', 'dead links', 'http status', 'link checker'],
  },
  {
    slug: 'token-counter',
    name: 'Token Counter for AI/LLMs',
    category: 'ai-tools',
    shortDescription:
      'Count tokens, characters, and words for any text. Estimate costs for GPT-4, Claude, and other LLMs.',
    longDescription: [
      'A Token Counter is an analytical tool used to calculate the exact number of tokens, words, and characters within a given text block. Since large language models (LLMs) charge based on token usage, this utility helps developers accurately estimate API costs and manage context window limits before submitting complex prompts.',
      <>
        A token is roughly equivalent to 4 characters of English text or about 3/4 of a word. However, the exact token count depends on the tokenizer used by each model. This tool uses a browser-based approximation that is accurate enough for cost estimation and context planning, though it should not be treated as an exact billing figure. For reference,{' '}
        <ExtLink href="https://platform.openai.com/docs/guides/chat">OpenAI&apos;s tokenizer documentation</ExtLink>{' '}
        and{' '}
        <ExtLink href="https://docs.anthropic.com/en/docs/about-claude/pricing">Anthropic&apos;s pricing page</ExtLink>{' '}
        provide the official token counts and rates for their respective models.
      </>,
      <>
        As you type or paste text, the tool updates counts in real time (debounced to avoid lag). It shows the estimated token count, character count, word count, and approximate cost for popular models including GPT-4o, GPT-4o-mini, Claude 3.5 Sonnet, and Claude 3 Haiku at current published pricing. If you are building AI-facing content, consider generating an{' '}
        <IntLink href="/tools/llms-txt-generator">llms.txt file</IntLink>{' '}
        for crawlers, or using the <IntLink href="/tools/ai-content-brief-generator">AI Content Brief Generator</IntLink> to structure your prompts optimally.
      </>,
      'Understanding token counts helps you plan your API usage, stay within context windows, avoid unexpected costs, and optimize your prompts. For developers building AI applications, this tool provides a quick way to estimate how much a prompt will cost before sending it to an API.',
    ],
    metaTitle: 'Token Counter for AI & LLMs — Free GPT/Claude Token Estimator',
    metaDescription:
      'Count tokens, characters, and words for any text. Estimate costs for GPT-4, Claude, and other LLMs. Free, real-time, no signup required.',
    faqs: [
      {
        question: 'What is a token in the context of LLMs?',
        answer:
          'A token is the basic unit of text that a language model processes. In English, one token is roughly 4 characters or about 3/4 of a word. Tokens determine API costs, context window usage, and rate limits for models like GPT-4 and Claude.',
      },
      {
        question: 'How accurate is the token count?',
        answer:
          'This tool uses a browser-based approximation that is accurate enough for cost estimation and context planning. The exact token count depends on the specific tokenizer used by each model. For exact billing, refer to your API provider\'s usage dashboard.',
      },
      {
        question: 'Which models are supported for cost estimation?',
        answer:
          'The tool estimates costs for GPT-4o, GPT-4o-mini, Claude 3.5 Sonnet, and Claude 3 Haiku at current published pricing. Prices are approximate and for reference only — always check your provider for exact rates.',
      },
      {
        question: 'Does my text leave my browser?',
        answer:
          'No. The token counting is done entirely in your browser. Your text is never sent to any server. This tool is 100% client-side and privacy-friendly.',
      },
      {
        question: 'Why is token counting important for prompt engineering?',
        answer:
          'Knowing your token count helps you stay within context windows, avoid unexpected API costs, and optimize prompt length. It is especially important when working with long documents or when you need to fit content within a model\'s context limit.',
      },
    ],
    relatedTools: ['llms-txt-generator', 'meta-tags-generator', 'schema-markup-generator'],
    icon: Hash,
    keywords: ['token counter', 'llm tokens', 'gpt tokens', 'ai cost', 'tokenization'],
  },
  {
    slug: 'sitemap-generator',
    name: 'Sitemap Generator',
    category: 'seo-tools',
    shortDescription:
      'Generate a valid XML sitemap from a list of URLs. Set priority and changefreq per URL.',
    longDescription: [
      'A Sitemap Generator is a web application that automatically builds valid XML sitemaps from a provided list of URLs. By generating a structured file detailing your site\'s hierarchy, URL priorities, and change frequencies, it enables search engines to systematically crawl and index your content without relying solely on internal linking.',
      <>
        Sitemaps are especially valuable for new websites, large sites with many pages, sites with rich media content, and sites with pages that are not well-linked internally. By submitting a sitemap to{' '}
        <ExtLink href="https://support.google.com/webmasters/answer/7451001">Google Search Console&apos;s sitemap submission page</ExtLink>, you ensure search engines know about all your pages and can crawl them more intelligently.{' '}
        <ExtLink href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview">Google&apos;s sitemap documentation</ExtLink>{' '}
        provides detailed guidance on best practices.
      </>,
      <>
        This tool lets you add URLs one by one or paste multiple URLs at once (one per line). For each URL, you can optionally set a priority (0.0 to 1.0) and a change frequency. The tool generates a valid XML sitemap that follows the sitemaps.org protocol. Before generating your sitemap, you can use our{' '}
        <IntLink href="/tools/broken-link-checker">Broken Link Checker</IntLink>{' '}
        to find dead links, and then define your crawl rules with the <IntLink href="/tools/robots-txt-generator">Robots.txt Generator</IntLink>.
      </>,
      'The generated sitemap can be copied to your clipboard or downloaded as an XML file. Simply upload it to your website root (e.g., sitemap.xml) and submit it to Google Search Console. For dynamic sites, you may want to regenerate the sitemap periodically or use a server-side sitemap generator.',
    ],
    metaTitle: 'Sitemap Generator — Free XML Sitemap Builder for SEO',
    metaDescription:
      'Generate a valid XML sitemap from a list of URLs. Set priority and changefreq per URL. Copy or download as sitemap.xml. Free, no signup.',
    faqs: [
      {
        question: 'What is an XML sitemap and why do I need one?',
        answer:
          'An XML sitemap is a file that lists all the pages on your website that you want search engines to crawl and index. It helps search engines discover your content, especially for new sites, large sites, or sites with pages that are not well-linked internally.',
      },
      {
        question: 'What are priority and changefreq?',
        answer:
          'Priority (0.0 to 1.0) indicates the relative importance of a URL compared to other URLs on your site. Changefreq tells search engines how often the page is likely to change. Note that Google has stated it largely ignores these attributes, but they are still part of the sitemap protocol.',
      },
      {
        question: 'Where should I put my sitemap.xml file?',
        answer:
          'Upload the sitemap.xml file to the root directory of your website, e.g., https://yoursite.com/sitemap.xml. Then submit the sitemap URL in Google Search Console and Bing Webmaster Tools.',
      },
      {
        question: 'How many URLs can I include in a sitemap?',
        answer:
          'A single sitemap can contain up to 50,000 URLs and be up to 50MB in size. If you have more URLs, you need to create a sitemap index file that references multiple sitemap files.',
      },
      {
        question: 'Should I use a sitemap if my site is small?',
        answer:
          'For very small sites (under 50 pages) with good internal linking, a sitemap is less critical but still recommended. It does not hurt and ensures search engines discover all your pages, including new ones.',
      },
    ],
    relatedTools: ['meta-tags-generator', 'schema-markup-generator', 'broken-link-checker'],
    icon: GitBranch,
    keywords: ['sitemap', 'xml sitemap', 'seo', 'google search console'],
  },
  {
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo-tools',
    shortDescription:
      'Generate a valid robots.txt file with allow/disallow rules and sitemap URL. Copy or download.',
    longDescription: [
      'A Robots.txt Generator is a configuration tool that produces directives to instruct search engine crawlers on how to navigate a website. By specifying allow and disallow rules, it prevents bots from indexing private or unnecessary directories, ensuring your crawl budget is spent solely on your most valuable pages.',
      <>
        A well-configured robots.txt file gives you fine-grained control over how search engines interact with your content. You can allow all crawlers by default, then add specific Disallow rules for paths you want to keep out of search results — admin panels, staging environments, internal search pages, or duplicate content. The official specification is maintained at{' '}
        <ExtLink href="https://www.rfc-editor.org/rfc/rfc9309.html">RFC 9309</ExtLink>{' '}
        and{' '}
        <ExtLink href="https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt">Google&apos;s robots.txt documentation</ExtLink>{' '}
        provides practical guidance.
      </>,
      <>
        One common mistake is using robots.txt to block pages you want kept out of search results. Disallow tells crawlers not to crawl a page, but it does not prevent the page from being indexed if it is linked from other sites. For true de-indexing, use the noindex meta tag instead. Another frequent error is accidentally blocking CSS and JavaScript files, which can prevent Google from rendering your pages correctly. You can{' '}
        <IntLink href="/tools/sitemap-generator">add your sitemap URL</IntLink>{' '}
        directly in the robots.txt file so crawlers discover it automatically, and use our{' '}
        <IntLink href="/tools/broken-link-checker">Broken Link Checker</IntLink>{' '}
        to audit your site for dead links.
      </>,
      'The generated robots.txt follows the standard format: a User-agent directive, Allow and Disallow rules, and an optional Sitemap directive. Simply fill in the rules you need, copy or download the file, and upload it to your website root.',
      'A good robots.txt file is short and targeted. Most sites only need to disallow a handful of paths — admin areas, internal search, cart and checkout pages, and temporary or staging directories. If you have a large site with faceted navigation (like an e-commerce store with filter parameters), you may also want to disallow URL parameters that generate duplicate content. The key principle is to block only what genuinely should not be crawled, and to let Google access everything else. Over-blocking is a more common and more damaging mistake than under-blocking.',
    ],
    metaTitle: 'Robots.txt Generator — Free Online Robots.txt Builder Tool',
    metaDescription:
      'Generate a valid robots.txt file with allow/disallow rules and sitemap URL. Avoid common mistakes like blocking CSS/JS. Free, no signup.',
    faqs: [
      {
        question: 'What is robots.txt and what does it do?',
        answer:
          'robots.txt is a text file at the root of your website that tells search engine crawlers which pages they may and may not crawl. It is the first file most crawlers request when visiting your site.',
      },
      {
        question: 'Does Disallow prevent a page from being indexed?',
        answer:
          'No. Disallow tells crawlers not to crawl a page, but if the page is linked from other websites, Google may still index it. To prevent indexing, use a noindex meta tag on the page itself, not a Disallow rule in robots.txt.',
      },
      {
        question: 'Should I block CSS and JavaScript files in robots.txt?',
        answer:
          'No. Blocking CSS and JavaScript files can prevent Google from rendering your pages correctly, which may hurt your search rankings. Only block files that should genuinely not be crawled, like admin panels or internal search results.',
      },
    ],
    relatedTools: ['sitemap-generator', 'meta-tags-generator', 'broken-link-checker'],
    icon: Bot,
    keywords: ['robots.txt', 'crawling', 'seo', 'disallow', 'user-agent'],
  },
  {
    slug: 'og-preview-checker',
    name: 'OG Preview Checker',
    category: 'seo-tools',
    shortDescription:
      'Check how any URL appears when shared on social media. Extract and preview Open Graph and Twitter Card tags.',
    longDescription: [
      'An OG Preview Checker is a diagnostic tool that extracts Open Graph and Twitter Card meta tags from a URL to generate live social media previews. It enables marketers and developers to verify exactly how their links will appear on platforms like Facebook, LinkedIn, and Twitter before publishing, ensuring optimal click-through rates.',
      <>
        When someone shares a link to your site, social platforms read the{' '}
        <IntLink href="/tools/meta-tags-generator">Open Graph and Twitter Card meta tags</IntLink>{' '}
        on your page to build the preview card — the title, description, and image that appear alongside the link. If these tags are missing or malformed, platforms will guess, often pulling in the wrong title, a truncated description, or no image at all. You can check your tags against{' '}
        <ExtLink href="https://developers.facebook.com/tools/debug/">Facebook&apos;s Sharing Debugger</ExtLink>{' '}
        and{' '}
        <ExtLink href="https://cards-dev.twitter.com/validator">Twitter&apos;s Card Validator</ExtLink>{' '}
        for the official previews.
      </>,
      <>
        This tool shows you exactly which tags were found and which are missing, so you know precisely what to fix. Common issues include missing og:image tags, og:title tags that are too long, or Twitter Card tags that are absent entirely (Twitter falls back to Open Graph tags, but explicit Twitter Card tags give you more control). If you find missing tags,{' '}
        <IntLink href="/tools/meta-tags-generator">use our Meta Tags Generator</IntLink>{' '}
        to create properly formatted Open Graph and Twitter Card tags for your pages, and periodically scan your social images with the <IntLink href="/tools/broken-link-checker">Broken Link Checker</IntLink> to ensure they remain accessible.
      </>,
      'The checker fetches the page server-side, so it sees exactly what a social crawler would see — not what your browser renders after JavaScript executes. This is important because some social platforms do not execute JavaScript, so a dynamically set og:image may not be visible to them.',
      'Beyond just checking your own pages, this tool is useful for auditing competitor pages or any site you admire. Seeing which Open Graph tags successful sites use — and how they structure their titles and descriptions — can inform your own social sharing strategy. The tool also shows you the raw extracted values for every tag, so you can copy the exact content of a well-optimized og:title or og:description and adapt it for your own pages.',
    ],
    metaTitle: 'OG Preview Checker — Free Open Graph & Twitter Card Preview Tool',
    metaDescription:
      'Check how any URL appears when shared on social media. Extract and preview Open Graph and Twitter Card tags. Free, no signup.',
    faqs: [
      {
        question: 'What are Open Graph tags and why do they matter?',
        answer:
          'Open Graph (OG) tags are meta tags that control how your page appears when shared on social platforms like Facebook, LinkedIn, and Twitter. They include og:title, og:description, og:image, and og:url. Without them, social platforms guess what to show, often incorrectly.',
      },
      {
        question: 'Why is my social preview showing the wrong image?',
        answer:
          'This usually means your og:image tag is missing, points to a broken URL, or the image is too small. Social platforms typically require images to be at least 1200x630 pixels. Use this tool to check what tags are actually on your page.',
      },
      {
        question: 'Does this tool execute JavaScript on the page?',
        answer:
          'No. The tool fetches the raw HTML of the page, just like a social media crawler would. This is intentional — most social platforms do not execute JavaScript, so if your OG tags are set dynamically via JavaScript, they will not be visible to social crawlers.',
      },
    ],
    relatedTools: ['meta-tags-generator', 'schema-markup-generator', 'robots-txt-generator'],
    icon: Eye,
    keywords: ['open graph', 'og preview', 'twitter card', 'social sharing', 'og tags'],
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolConfig[] {
  return tools.filter((t) => t.category === category);
}

export function getRelatedTools(slug: string): ToolConfig[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedTools
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolConfig => t !== undefined);
}

export const toolSlugs = tools.map((t) => t.slug);
