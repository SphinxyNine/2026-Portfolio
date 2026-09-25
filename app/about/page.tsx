import type { Metadata } from 'next';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { DraftBadge } from '@/components/draft-badge';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { about, profile } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'About',
  description: 'About my work across development, digital systems, and client implementation.',
};

export default function AboutPage() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="06 / About"
        title="Between business requirements and technical execution."
        description="A short introduction to how I approach digital work and the kinds of problems I enjoy solving."
      />
      <div className="about-grid">
        <Reveal className="about-statement">
          <p>Design makes the system understandable.</p>
          <p>Implementation makes it useful.</p>
          <div><MapPin size={16} /> Based in {profile.location}</div>
        </Reveal>
        <Reveal className="about-copy" delay={0.08}>
          <DraftBadge>Provisional introduction</DraftBadge>
          {about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <Link className="inline-link" href="/experience/">View experience <ArrowRight size={15} /></Link>
        </Reveal>
      </div>
    </div>
  );
}
