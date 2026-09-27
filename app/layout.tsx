import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { SiteShell } from '@/components/site-shell';
import { profile } from '@/data/portfolio';
import './globals.css';

const canonical = profile.seo.canonical || undefined;

export const metadata: Metadata = {
  metadataBase: canonical ? new URL(canonical) : undefined,
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.seo.description,
  applicationName: `${profile.name} Portfolio`,
  alternates: canonical ? { canonical } : undefined,
  openGraph: {
    type: 'website',
    title: `${profile.name} — ${profile.title}`,
    description: profile.seo.description,
    url: canonical,
    siteName: `${profile.name} Portfolio`,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t;try{t=localStorage.getItem('portfolio-theme')}catch(e){}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()` }} />
      </head>
      <body className={GeistSans.className}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
