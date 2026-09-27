'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-lg text-secondary-muted">
        Sorry, we couldn't find the page you're looking for. You will be redirected to the home page in <span className="font-semibold text-primary">{countdown}</span> seconds.
      </p>
      
      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Go to Homepage Now
        </Link>
      </Button>
    </div>
  );
}
