'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

// Submits to /api/lead (Follow Up Boss). If the CRM isn't configured
// or errors, falls back to opening a pre-filled email.
export function ContactForm({ subject = 'Website Inquiry' }: { subject?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      subject,
      name: String(f.get('name') ?? ''),
      email: String(f.get('email') ?? ''),
      phone: String(f.get('phone') ?? ''),
      interest: String(f.get('interest') ?? ''),
      area: String(f.get('area') ?? ''),
      price: String(f.get('price') ?? ''),
      message: String(f.get('message') ?? ''),
    };

    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
      throw new Error('lead endpoint unavailable');
    } catch {
      // Fallback: open a pre-filled email
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Interested in: ${data.interest}`,
        `Area: ${data.area}`,
        `Price range: ${data.price}`,
        '',
        data.message,
      ].join('\n');
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus('sent');
    }
  }

  if (status === 'sent') {
    return (
      <p className="border border-line bg-paper p-8 font-serif text-2xl">
        Thank you — your message is on its way. Jordan will be in touch
        shortly.
      </p>
    );
  }

  const field =
    'w-full border border-line bg-paper px-4 py-3.5 text-sm placeholder:text-mist/70 focus:border-coal focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="sr-only" htmlFor="name">Name</label>
      <input id="name" name="name" required placeholder="Name" className={field} />
      <label className="sr-only" htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required placeholder="Email" className={field} />
      <label className="sr-only" htmlFor="phone">Phone</label>
      <input id="phone" name="phone" type="tel" placeholder="Phone" className={field} />
      <label className="sr-only" htmlFor="interest">Interested in</label>
      <select id="interest" name="interest" className={field} defaultValue="Buying">
        <option>Buying</option>
        <option>Selling</option>
        <option>Selling & Buying</option>
        <option>Renting</option>
        <option>Other</option>
      </select>
      <label className="sr-only" htmlFor="area">Desired area</label>
      <input id="area" name="area" placeholder="Desired area or neighborhood" className={field} />
      <label className="sr-only" htmlFor="price">Price range</label>
      <input id="price" name="price" placeholder="Price range or estimated value" className={field} />
      <label className="sr-only" htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows={4}
        placeholder="Your message"
        className={`${field} sm:col-span-2`}
      />
      <label className="flex items-start gap-3 text-xs leading-relaxed text-mist sm:col-span-2">
        <input type="checkbox" required className="mt-0.5" />
        I agree to be contacted by {site.name} via call, email, and text for
        real estate services. Reply “stop” to opt out at any time. Message and
        data rates may apply.
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-solid" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        <p className="mt-4 text-xs text-mist">
          Your information will remain private and will only be used to respond
          to your inquiry.
        </p>
      </div>
    </form>
  );
}
