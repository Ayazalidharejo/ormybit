'use client';

import { useEffect, useState } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mytoolorbit-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mytoolorbit-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('mytoolorbit-cookie-consent', 'dismissed');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 animate-fade-in-up">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-subtle bg-card p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-secondary-muted">
            We use cookies to improve your experience. By continuing, you agree to our{' '}
            <Link href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 sm:shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-secondary-muted hover:text-foreground"
          >
            Dismiss
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
