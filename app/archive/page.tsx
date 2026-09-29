import type { Metadata } from 'next';
import { FlaskConical, History } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';

const archiveShelves = [
  {
    eyebrow: 'Portfolio history',
    title: 'Earlier portfolio editions',
    description: 'Past versions of this portfolio can live here with screenshots, dates, technologies, and a short note about what changed in the next iteration.',
    status: 'Ready to catalogue',
    items: ['Screenshots', 'Live or saved links', 'Build notes'],
    icon: History,
  },
  {
    eyebrow: 'Experiments',
    title: 'Prototypes and unfinished builds',
    description: 'Small tools, learning projects, paused ideas, and useful mistakes can stay visible here without being presented as finished professional work.',
    status: 'Open collection',
    items: ['Prototypes', 'Learning builds', 'Paused ideas'],
    icon: FlaskConical,
  },
];

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Earlier portfolio versions, experiments, prototypes, and unfinished builds by Zy Fausto.',
  alternates: { canonical: '/archive/' },
};

export default function ArchivePage() {
  return (
    <div className="page archive-page">
      <PageIntro
        eyebrow="Explore"
        title="Archive"
        description="Earlier portfolio versions, side experiments, and unfinished builds—kept as a record of what I learned and how the work evolved."
      />

      <p className="archive-note">Finished client work stays in Projects. Items here keep their honest status: shipped, paused, unfinished, or retired.</p>

      <div className="archive-shelves">
        {archiveShelves.map(({ eyebrow, title, description, status, items, icon: Icon }) => (
          <section className="archive-shelf" key={title} aria-labelledby={title.replaceAll(' ', '-').toLowerCase()}>
            <header className="archive-shelf-header">
              <span className="archive-shelf-icon"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
              <div>
                <p className="eyebrow">{eyebrow}</p>
                <h2 id={title.replaceAll(' ', '-').toLowerCase()}>{title}</h2>
              </div>
              <span className="archive-status">{status}</span>
            </header>
            <p>{description}</p>
            <ul className="archive-tags" aria-label={`Details saved with ${title}`}>
              {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
