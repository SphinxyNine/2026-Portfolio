'use client';

import { Check, Copy, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/portfolio';
import { AnimatedThemeSelector } from '@/components/ui/animated-theme-toggler';

export function ThemeToggle() {
  return <AnimatedThemeSelector />;
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
      <p className="contact-invite">Have a project, collaboration, or idea to discuss? Send me a note.</p>
      <div className="email-row">
        <a className="email-link" ref={address} href={`mailto:${profile.email}`}>
          <span className="email-icon" aria-hidden="true"><Mail size={15} strokeWidth={1.7} /></span>
          <span>{profile.email}</span>
        </a>
        <button className="icon-button" type="button" onClick={copy} aria-label="Copy email address">
          {status === 'Email copied' ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <p className="copy-status" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
