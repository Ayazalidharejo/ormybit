import { NextRequest, NextResponse } from 'next/server';

interface LinkResult {
  url: string;
  status: number;
  statusText: string;
  responseTime: number;
  error?: string;
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
