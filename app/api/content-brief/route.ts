import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const runtime = 'edge';

// Very basic in-memory rate limiting (since Edge runtime doesn't have a global state that persists reliably,
// this is just on a per-isolate basis, but better than nothing for a simple check)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5; // max 5 requests per minute per IP
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

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { keyword, competitors = [] } = body;

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    let competitorContext = '';
    
    // Fetch and parse competitors if provided
    if (competitors && competitors.length > 0) {
      const fetchPromises = competitors.map(async (url: string) => {
        try {
          const targetUrl = new URL(url);
          const hostname = targetUrl.hostname;
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
            return null;
          }

          const res = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            signal: AbortSignal.timeout(5000), // 5 seconds timeout
          });
          
          if (!res.ok) return null;
          
          const html = await res.text();
          const $ = cheerio.load(html);
          
          // Remove scripts and styles
          $('script, style, nav, footer, header').remove();
          
          let pageText = '';
          $('h1, h2, h3').each((_, el) => {
            pageText += `${el.tagName}: ${$(el).text().trim()}\n`;
          });
          
          let bodyText = $('body').text().replace(/\s+/g, ' ').trim();
          // Truncate to first 2000 chars of body text
          bodyText = bodyText.substring(0, 2000);
          
          return `URL: ${url}\nHeadings:\n${pageText}\nBody sample: ${bodyText}\n`;
        } catch (error) {
          console.error(`Failed to fetch competitor ${url}:`, error);
          return null;
        }
      });
      
      const results = await Promise.all(fetchPromises);
      const successfulFetches = results.filter(Boolean);
      
      if (successfulFetches.length > 0) {
        competitorContext = "Here is some content extracted from top-ranking competitor pages for this keyword. Use this to inform the structure and topics to cover, but ensure the resulting brief is unique and comprehensive:\n\n" + successfulFetches.join("\n---\n");
      } else {
        competitorContext = "Note: Competitor URLs were provided but could not be fetched. Please generate the best possible brief based solely on the keyword.";
      }
    }

    const prompt = `You are an expert SEO strategist and content writer. Create a comprehensive, highly-structured content brief for the target keyword: "${keyword}".
    
${competitorContext}

Return a JSON object with the following exact structure:
{
  "suggestedTitle": "A compelling H1 title",
  "outline": [
    { "heading": "H2 heading text", "notes": "One-line note on what to cover in this section" }
  ],
  "questionsToAnswer": [
    "Question 1", "Question 2", "..." // 5-8 specific, genuinely useful 'People Also Ask' style questions
  ],
  "targetWordCount": "e.g., 1500-2000 words",
  "relatedEntities": [
    "Entity 1", "Entity 2", "..." // 3-5 related keywords or semantic entities worth mentioning naturally
  ]
}`;

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1500,
        response_format: { type: "json_object" },
        messages: [
          { 
            role: 'system', 
            content: "You are an expert SEO AI that strictly outputs JSON. You must return only valid JSON matching the exact structure requested, without any markdown formatting."
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ]
      })
    });

    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      console.error("OpenAI API error:", errorText);
      return NextResponse.json({ error: 'Failed to generate brief from AI' }, { status: 500 });
    }

    const openAiData = await openAiResponse.json();
    const textResponse = openAiData.choices[0].message.content;
    
    try {
      const jsonResponse = JSON.parse(textResponse);
      return NextResponse.json(jsonResponse);
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", textResponse);
      return NextResponse.json({ error: 'AI returned invalid format' }, { status: 500 });
    }

  } catch (error) {
    console.error("Content brief generation error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
