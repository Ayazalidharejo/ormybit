'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:hello@mytoolorbit.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 text-lg text-secondary-muted">
          Have a question, suggestion, or found a bug? We would love to hear from you.
        </p>
      </div>

      {sent ? (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-foreground">Thanks for reaching out!</h2>
          <p className="mt-2 text-sm text-secondary-muted">
            Your email client should have opened with your message. If not, email us directly at{' '}
            <a href="mailto:hello@mytoolorbit.com" className="text-primary hover:underline">
              hello@mytoolorbit.com
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-subtle bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-background border-subtle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-background border-subtle"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              className="bg-background border-subtle min-h-[140px]"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            Send message
          </Button>
        </form>
      )}

      <div className="mt-8 rounded-lg border border-subtle bg-card p-4">
        <p className="text-sm text-secondary-muted">
          Prefer email? Reach us directly at{' '}
          <a href="mailto:hello@mytoolorbit.com" className="text-primary hover:underline">
            hello@mytoolorbit.com
          </a>
        </p>
      </div>
    </div>
  );
}
