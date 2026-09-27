'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/portfolio';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export function ThemeToggle() {
  return <AnimatedThemeToggler />;
}
export function CopyEmail() {
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const address = useRef<HTMLAnchorElement>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('Email copied');
      timer.current = setTimeout(() => setStatus(''), 2600);
    } catch {
      // Keep the complete email visible and select it for manual copying.
      const selection = window.getSelection();
      if (address.current && selection) {
        const range = document.createRange();
        range.selectNodeContents(address.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus('Copy unavailable. Select the email and copy manually.');
      timer.current = setTimeout(() => setStatus(''), 6500);
    }
  }
  return (
    <div className="email-area">
      <p className="eyebrow">Contact</p>
      <div className="email-row">
        <a ref={address} href={`mailto:${profile.email}`}>{profile.email}</a>
        <button className="icon-button" type="button" onClick={copy} aria-label="Copy email address">
          {status === 'Email copied' ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <p className="copy-status" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
