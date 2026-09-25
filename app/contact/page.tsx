import type { Metadata } from 'next';
import { ArrowUpRight, CodeXml, ContactRound, Mail, MessageSquareText } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { profile } from '@/data/portfolio';
import { isSafeExternalUrl, isValidEmail } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact details for freelance projects, collaborations, and professional opportunities.',
};

const methods = [
  { label: 'Email', value: profile.email, href: isValidEmail(profile.email) ? `mailto:${profile.email}` : '', icon: Mail },
  { label: 'LinkedIn', value: 'View profile', href: profile.socials.linkedin, icon: ContactRound },
  { label: 'GitHub', value: 'View profile', href: profile.socials.github, icon: CodeXml },
];

export default function ContactPage() {
  const activeMethods = methods.filter((method) => method.href && (method.href.startsWith('mailto:') || isSafeExternalUrl(method.href)));

  return (
    <div className="page contact-page">
      <PageIntro
        eyebrow="07 / Contact"
        title="Let’s talk about what needs to work."
        description="For freelance projects, collaborations, or professional opportunities, use any of the contact options below."
      />

      {activeMethods.length ? (
        <div className="contact-methods">
          {activeMethods.map(({ label, value, href, icon: Icon }) => (
            <a className="contact-method" href={href} key={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
              <span><Icon size={21} /></span>
              <div><small>{label}</small><strong>{value}</strong></div>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      ) : (
        <div className="empty-state contact-empty">
          <span><MessageSquareText size={28} /></span>
          <div>
            <h2>Contact details to be added.</h2>
            <p>Add your email, LinkedIn, and GitHub URLs in the central portfolio data file.</p>
          </div>
        </div>
      )}
    </div>
  );
}
