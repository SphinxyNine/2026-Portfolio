import type { Metadata } from 'next';
import { BriefcaseBusiness } from 'lucide-react';
import { DraftBadge } from '@/components/draft-badge';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { TagList } from '@/components/tag-list';
import { experience } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience across web development, digital systems, automation, and client implementation.',
};

export default function ExperiencePage() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="03 / Experience"
        title="The work behind the work."
        description="A concise professional history focused on scope, responsibilities, and the systems delivered. Replace the entries below with verified experience."
      />
      <div className="timeline">
        {experience.map((item, index) => (
          <Reveal className="timeline-item" delay={index * 0.06} key={`${item.role}-${index}`}>
            <div className="timeline-marker"><BriefcaseBusiness size={17} /><span /></div>
            <p className="timeline-period">{item.period}</p>
            <div className="timeline-copy">
              {item.placeholder && <DraftBadge>Experience placeholder</DraftBadge>}
              <h2>{item.role}</h2>
              <p className="timeline-company">{item.company}</p>
              <p>{item.description}</p>
              <TagList items={item.tools} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
