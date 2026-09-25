import { NextRequest, NextResponse } from 'next/server';

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

function extractMetaContent(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${property}["']`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (!targetUrl.protocol.startsWith('http')) {
      return NextResponse.json(
        { error: 'URL must use HTTP or HTTPS protocol' },
        { status: 400 }
      );
    }

    let html: string;
    try {
      const response = await fetch(targetUrl.toString(), {
        headers: {
          'User-Agent': 'MyToolOrbit-OgChecker/1.0 (compatible; social crawler preview)',
          Accept: 'text/html,application/xhtml+xml',
        },
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to fetch page: HTTP ${response.status}` },
          { status: 502 }
        );
      }

      html = await response.text();
    } catch {
      return NextResponse.json(
        { error: 'Could not fetch the page. It may be down or blocking automated requests.' },
        { status: 502 }
      );
    }

    const title = extractMetaContent(html, 'og:title');
    const description = extractMetaContent(html, 'og:description');
    const image = extractMetaContent(html, 'og:image');
    const siteName = extractMetaContent(html, 'og:site_name');
    const ogUrl = extractMetaContent(html, 'og:url');
    const twitterCard = extractMetaContent(html, 'twitter:card');
    const twitterTitle = extractMetaContent(html, 'twitter:title');
    const twitterDescription = extractMetaContent(html, 'twitter:description');
    const twitterImage = extractMetaContent(html, 'twitter:image');

    const allTags = [
      { name: 'og:title', value: title },
      { name: 'og:description', value: description },
      { name: 'og:image', value: image },
      { name: 'og:site_name', value: siteName },
      { name: 'og:url', value: ogUrl },
      { name: 'twitter:card', value: twitterCard },
      { name: 'twitter:title', value: twitterTitle },
      { name: 'twitter:description', value: twitterDescription },
      { name: 'twitter:image', value: twitterImage },
    ];

    const foundTags = allTags.filter((t) => t.value).map((t) => t.name);
    const missingTags = allTags.filter((t) => !t.value).map((t) => t.name);

    const data: OgData = {
      title,
      description,
      image,
      siteName,
      twitterCard,
      twitterTitle,
      twitterDescription,
      twitterImage,
      url: ogUrl || targetUrl.toString(),
      foundTags,
      missingTags,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
