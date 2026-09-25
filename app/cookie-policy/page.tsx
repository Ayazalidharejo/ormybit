import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'MyToolOrbit cookie policy. We use minimal cookies and localStorage for consent preferences. No tracking cookies.',
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
        Cookie Policy
      </h1>
      <div className="space-y-6 text-secondary-muted leading-relaxed">
        <p className="text-sm text-secondary-muted/70">Last updated: September 2024</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device by your browser when you visit a
            website. They are widely used to make websites work more efficiently and to provide
            information to site owners. MyToolOrbit uses cookies and similar technologies
            (including localStorage) sparingly and transparently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Cookies we use</h2>
          <p>
            Currently, MyToolOrbit uses only localStorage to store your cookie consent
            preference (whether you have accepted or dismissed our cookie banner). This is
            stored locally on your device and is not transmitted to our servers.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-subtle">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-subtle bg-muted">
                  <th className="px-4 py-3 text-left font-medium text-secondary-muted">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-secondary-muted">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-secondary-muted">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-subtle">
                  <td className="px-4 py-3 text-foreground">mytoolorbit-cookie-consent</td>
                  <td className="px-4 py-3">localStorage</td>
                  <td className="px-4 py-3">Stores cookie consent preference</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Future cookies</h2>
          <p>
            In the future, we may integrate Google Analytics or Google AdSense. These services
            use cookies to measure traffic and display relevant ads. If we add these services:
          </p>
          <ul className="mt-3 space-y-2 pl-5 list-disc">
            <li>
              <strong className="text-foreground">Google Analytics</strong> would use cookies to
              collect anonymized usage data (page views, session duration, traffic source).
            </li>
            <li>
              <strong className="text-foreground">Google AdSense</strong> would use cookies to
              display personalized ads based on your interests and interaction history.
            </li>
          </ul>
          <p className="mt-3">
            We will update this policy before adding any such services. You will always have the
            option to opt out via our cookie consent banner or your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Managing cookies</h2>
          <p>
            You can control and delete cookies through your browser settings. Most browsers
            allow you to refuse cookies or alert you when cookies are being sent. Disabling
            cookies may affect the functionality of some features. To clear your cookie
            consent preference, you can clear localStorage for mytoolorbit.com in your browser
            settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Third-party cookies</h2>
          <p>
            We do not currently use any third-party cookies. If we add third-party services in
            the future, their cookie practices will be disclosed here.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
          <p>
            If you have questions about our cookie practices, please contact us at{' '}
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
