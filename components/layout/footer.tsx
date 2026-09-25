import Link from 'next/link';
import { Orbit, Twitter, Github, Mail } from 'lucide-react';

const footerLinks = {
  Tools: [
    { href: '/tools/seo-tools', label: 'SEO Tools' },
    { href: '/tools/dev-tools', label: 'Developer Tools' },
    { href: '/tools/ai-tools', label: 'AI Tools' },
    { href: '/tools', label: 'All Tools' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/guides', label: 'Guides' },
  ],
  Legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <Orbit className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">MyToolOrbit</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-secondary-muted">
              Free, fast, privacy-friendly online tools for developers, SEO professionals, and AI users.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://twitter.com/mytoolorbit"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-subtle text-secondary-muted transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/mytoolorbit"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-subtle text-secondary-muted transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="/contact"
                aria-label="Contact"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-subtle text-secondary-muted transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-subtle pt-6">
          <p className="text-sm text-secondary-muted">
            &copy; {new Date().getFullYear()} MyToolOrbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
