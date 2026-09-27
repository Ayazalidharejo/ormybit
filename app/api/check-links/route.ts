import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 10;
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

interface LinkResult {
  url: string;
  status: number;
  statusText: string;
  responseTime: number;
  error?: string;
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

    // Fetch the page
    let pageHtml: string;
    try {
      const pageResponse = await fetch(targetUrl.toString(), {
        headers: {
          'User-Agent': 'MyToolOrbit-BrokenLinkChecker/1.0',
          Accept: 'text/html,application/xhtml+xml',
        },
        signal: AbortSignal.timeout(15000),
      });

      if (!pageResponse.ok) {
        return NextResponse.json(
          { error: `Failed to fetch page: HTTP ${pageResponse.status}` },
          { status: 502 }
        );
      }

      pageHtml = await pageResponse.text();
    } catch {
      return NextResponse.json(
        { error: 'Could not fetch the page. It may be down or blocking automated requests.' },
        { status: 502 }
      );
    }

    // Extract all href links
    const hrefPattern = /href=["']([^"']+)["']/gi;
    const rawLinks = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = hrefPattern.exec(pageHtml)) !== null) {
      const href = match[1];
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('javascript:')
      ) {
        try {
          const resolvedUrl = new URL(href, targetUrl.origin).toString();
          rawLinks.add(resolvedUrl);
        } catch {
          // skip invalid URLs
        }
      }
    }

    const linksToCheck = Array.from(rawLinks).slice(0, 100);

    if (linksToCheck.length === 0) {
      return NextResponse.json({ links: [] });
    }

    // Check links with concurrency limit
    const CONCURRENCY = 8;
    const results: LinkResult[] = [];

    const checkLink = async (linkUrl: string): Promise<LinkResult> => {
      const startTime = Date.now();
      try {
        const response = await fetch(linkUrl, {
          method: 'HEAD',
          headers: {
            'User-Agent': 'MyToolOrbit-BrokenLinkChecker/1.0',
            Accept: '*/*',
          },
          redirect: 'follow',
          signal: AbortSignal.timeout(10000),
        });

        const responseTime = Date.now() - startTime;
        return {
          url: linkUrl,
          status: response.status,
          statusText: response.statusText,
          responseTime,
        };
      } catch (err) {
        const responseTime = Date.now() - startTime;
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';

        // Try GET if HEAD fails (some servers reject HEAD)
        try {
          const response = await fetch(linkUrl, {
            method: 'GET',
            headers: {
              'User-Agent': 'MyToolOrbit-BrokenLinkChecker/1.0',
              Accept: '*/*',
            },
            redirect: 'follow',
            signal: AbortSignal.timeout(10000),
          });

          return {
            url: linkUrl,
            status: response.status,
            statusText: response.statusText,
            responseTime: Date.now() - startTime,
          };
        } catch {
          return {
            url: linkUrl,
            status: 0,
            statusText: 'Error',
            responseTime,
            error: errorMessage.includes('timeout')
              ? 'Request timed out'
              : 'Could not reach URL',
          };
        }
      }
    };

    // Process in batches
    for (let i = 0; i < linksToCheck.length; i += CONCURRENCY) {
      const batch = linksToCheck.slice(i, i + CONCURRENCY);
      const batchResults = await Promise.all(batch.map(checkLink));
      results.push(...batchResults);
    }

    return NextResponse.json({ links: results });
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
