export const siteConfig = {
  name: 'MyToolOrbit',
  description:
    'Free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users.',
  url: 'https://mytoolorbit.com',
  links: {
    twitter: 'https://twitter.com/mytoolorbit',
    github: 'https://github.com/mytoolorbit',
    contact: '/contact',
  },
  categories: [
    {
      slug: 'seo-tools',
      name: 'SEO Tools',
      description:
        'Optimize your website for search engines with meta tags, schema markup, sitemaps, and link analysis.',
      icon: 'Search',
    },
    {
      slug: 'dev-tools',
      name: 'Developer Tools',
      description:
        'Utilities for developers including token counting, link checking, and more.',
      icon: 'Code2',
    },
    {
      slug: 'ai-tools',
      name: 'AI Tools',
      description:
        'Tools for AI and LLM workflows including token counting and llms.txt generation.',
      icon: 'Sparkles',
    },
  ],
};

export type SiteConfig = typeof siteConfig;
