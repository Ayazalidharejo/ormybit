import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CookieConsent } from '@/components/layout/cookie-consent';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://mytoolorbit.com'),
  title: {
    default: 'MyToolOrbit — Free Online Tools for Developers, Creators & SEO',
    template: '%s — MyToolOrbit',
  },
  description:
    'Free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users. Meta tag generators, schema markup, llms.txt, token counter, and more.',
  openGraph: {
    type: 'website',
    siteName: 'MyToolOrbit',
    title: 'MyToolOrbit — Free Online Tools for Developers, Creators & SEO',
    description:
      'Free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyToolOrbit — Free Online Tools for Developers, Creators & SEO',
    description:
      'Free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
