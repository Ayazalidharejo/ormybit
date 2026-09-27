import { NextRequest, NextResponse } from 'next/server';
import { checkRepetitions, calculateBurstiness, checkGenericPhrases } from '@/lib/quality-config';
import { verifyJwt } from '@/lib/auth';

// Helper to check auth
async function checkAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  const payload = await verifyJwt(token);
  return !!payload;
}

// Remove HTML tags for plain text analysis
function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

export async function POST(req: NextRequest) {
  try {
    const isAuth = await checkAuth(req);
    if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { content } = await req.json();
    if (!content) return NextResponse.json({ error: 'Content is required' }, { status: 400 });

    const plainText = stripHtml(content);

    // 1. LanguageTool API Call
    let grammarResults = null;
    try {
      const ltRes = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          text: plainText,
          language: 'en-US'
        })
      });
      if (ltRes.status === 429) {
        grammarResults = { rateLimited: true, message: "LanguageTool API rate limit reached. Please wait a minute before checking grammar again." };
      } else if (ltRes.ok) {
        grammarResults = await ltRes.json();
      } else {
        grammarResults = { error: "LanguageTool API returned an error." };
      }
    } catch (err) {
      console.error("LanguageTool fetch failed:", err);
      grammarResults = { error: "Failed to connect to LanguageTool API." };
    }

    // 2. Heuristic Content Quality Score
    const repetitions = checkRepetitions(plainText);
    const burstiness = calculateBurstiness(plainText);
    const genericMatches = checkGenericPhrases(plainText);

    return NextResponse.json({
      grammar: grammarResults,
      quality: {
        repetitions,
        burstiness,
        genericMatches
      }
    });
  } catch (error) {
    console.error('Quality check error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
