import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      return NextResponse.json(
        { error: 'Admin credentials not configured on server' },
        { status: 500 }
      );
    }

    if (email !== adminEmail) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, adminPasswordHash);

    if (!isValid) {
      console.log('Password mismatch', { password, adminPasswordHash });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signJwt({ email });

    const response = NextResponse.json({ success: true });
    
    // Set HTTP-only cookie
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
