import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  record.count++;
  return true;
}

function isSafeUrl(urlObj: URL): boolean {
  const hostname = urlObj.hostname;
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./) ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.local')
  ) {
    return false;
  }
  return true;
}

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
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

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

    if (!isSafeUrl(targetUrl)) {
      return NextResponse.json(
        { error: 'Local or internal network URLs are not allowed.' },
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
