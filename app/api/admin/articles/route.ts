import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import { verifyJwt } from '@/lib/auth';

// Helper to check auth
async function checkAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  const payload = await verifyJwt(token);
  return !!payload;
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const articles = await Article.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();
    
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const article = await Article.create(data);
    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create article', details: error.message }, { status: 500 });
  }
}
