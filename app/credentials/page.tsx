import type { Metadata } from 'next';
import { BadgeCheck, ExternalLink, FileBadge2 } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { credentials } from '@/data/portfolio';
import { isSafeExternalUrl } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Credentials',
  description: 'Certifications, professional training, courses, and education.',
};

export default function CredentialsPage() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="05 / Credentials"
        title="Verified learning and professional development."
        description="Certifications, training, courses, and education can live here without competing with the work itself."
      />
      {credentials.length ? (
        <div className="credentials-list">
          {credentials.map((credential, index) => (
            <Reveal className="credential-row" key={`${credential.name}-${credential.provider}`} delay={index * 0.05}>
              <span className="credential-icon"><BadgeCheck size={20} /></span>
              <div><p className="eyebrow">{credential.type}</p><h2>{credential.name}</h2><p>{credential.provider}</p></div>
              <span>{credential.year}</span>
              {isSafeExternalUrl(credential.url) && (
                <a href={credential.url} target="_blank" rel="noreferrer" aria-label={`Verify ${credential.name}`}>
                  <ExternalLink size={17} />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="empty-state">
          <span><FileBadge2 size={28} /></span>
          <div>
            <h2>Credentials will be added here.</h2>
            <p>No certifications, training, or education have been invented for this draft.</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
