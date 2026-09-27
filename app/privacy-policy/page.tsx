import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'MyToolOrbit privacy policy. We do not collect personal data. All tools run client-side in your browser.',
  alternates: { canonical: '/privacy-policy' },

  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy',
    description: 'MyToolOrbit privacy policy. We do not collect personal data. All tools run client-side in your browser.',
    url: '/privacy-policy',
    type: 'website',
    siteName: 'MyToolOrbit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description: 'MyToolOrbit privacy policy. We do not collect personal data. All tools run client-side in your browser.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
        Privacy Policy
      </h1>
      <div className="space-y-6 text-secondary-muted leading-relaxed">
        <p className="text-sm text-secondary-muted/70">Last updated: September 2024</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
          <p>
            MyToolOrbit is committed to your privacy. This policy explains what information we
            collect, how we use it, and the choices you have. The short version: we run almost
            everything client-side in your browser, and we do not collect personal data from
            tool usage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Tool data</h2>
          <p>
            Six of our eight tools run entirely in your browser. The text you enter into the
            Token Counter, the URLs you submit to the Meta Tags Generator, the schema data you
            configure, and the sitemap entries you build are never sent to our servers. We do
            not store, log, or transmit your tool inputs. Two tools — the Broken Link Checker
            and the OG Preview Checker — use API routes that send the URL you enter to our
            server so we can fetch the page on your behalf. We do not store the URL, the
            results, or any identifying information after the check is complete. No data is
            written to a database, and no logs are retained.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Analytics</h2>
          <p>
            We may use privacy-friendly analytics in the future to understand which tools are
            most used and how visitors find the site. Any analytics we implement will be
            anonymized and will not track individual users across sessions. We will never sell
            or share analytics data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Cookies</h2>
          <p>
            MyToolOrbit uses a single cookie consent preference stored in your browser&apos;s
            localStorage to remember whether you have dismissed or accepted our cookie banner.
            We do not use tracking cookies. In the future, we may use Google Analytics or Google
            AdSense, which use cookies — see our Cookie Policy for details. You can control
            cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Third-party services</h2>
          <p>
            We do not currently use third-party services that process your data. If we add
            third-party tools or advertising in the future, we will update this policy to
            disclose what data they process and how to opt out.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Data retention</h2>
          <p>
            Because we do not collect personal data from tool usage, there is no data to retain
            or delete. The only data stored is your cookie consent preference in your own
            browser, which you can clear at any time through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Children&apos;s privacy</h2>
          <p>
            MyToolOrbit is not directed at children under 13, and we do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. We will update the &quot;last
            updated&quot; date at the top of this page whenever we make changes. We encourage
            you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us at{' '}
            <a href="mailto:hello@mytoolorbit.com" className="text-primary hover:underline">
              hello@mytoolorbit.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
