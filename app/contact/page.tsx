import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { CopyEmail } from '@/components/contact-controls';
import { profile } from '@/data/portfolio';
export const metadata: Metadata = { title: 'Contact', alternates: { canonical: '/contact/' } };
export default function ContactPage() {
  return (
    <div className="page">
      <PageIntro eyebrow="Portfolio" title="Contact" description="Email me or connect on LinkedIn and GitHub." />
      <div className="simple-copy">
        <CopyEmail />
        <div className="contact-methods">
          {Object.entries(profile.socials).map(([label, href]) => <a className="contact-method" key={label} href={href} target="_blank" rel="noopener noreferrer">{label === 'linkedin' ? 'LinkedIn' : 'GitHub'} <ArrowUpRight size={16} /></a>)}
        </div>
      </div>
    </div>
  );
}
