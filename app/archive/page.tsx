import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { PageIntro } from '@/components/page-intro';

const portfolioHistory = [
  {
    title: 'macOS Portfolio',
    label: 'Interface experiment',
    description: 'A desktop-inspired portfolio built around macOS-style folders, navigation, and a dock interface.',
    status: 'Archived edition',
    image: '/archive/macos-portfolio.jpg',
    imageAlt: 'macOS-inspired ZDX portfolio homepage',
    url: 'https://macos-portfolio-rosy-gamma.vercel.app/',
  },
  {
    title: 'ZDX 3D Portfolio',
    label: '3D portfolio concept',
    description: 'A dark portfolio iteration exploring 3D presentation, movement, and visual storytelling.',
    status: 'Archived edition',
    image: '/archive/3d-portfolio-zdx.jpeg',
    imageAlt: 'ZDX Development 3D portfolio homepage',
    url: 'https://3d-portfolio-zdx.vercel.app/',
  },
  {
    title: 'Zeta Dev X 2025',
    label: '2025 portfolio',
    description: 'A portfolio edition focused on clear, functional web experiences and a direct project-first introduction.',
    status: 'Archived edition',
    image: '/projects/zetadevx.png',
    imageAlt: 'Zeta Dev X 2025 portfolio homepage',
    url: 'https://zdx2025portfolio.vercel.app/',
  },
];

const experiments = [
  {
    title: 'HMM Cards — Version 1',
    label: 'Interactive experiment',
    description: 'An interactive conversation-card experience with question categories, card mixing, language options, and fullscreen play.',
    status: 'Version 1',
    image: '/archive/hmm-cards-v1.jpg',
    imageAlt: 'HMM Cards version 1 interactive question card',
    url: 'https://hmmcardsversion1.vercel.app/',
  },
];

function ArchiveCollection({ id, title, description, items }: { id: string; title: string; description: string; items: typeof portfolioHistory }) {
  return (
    <section className="archive-collection" aria-labelledby={id}>
      <header className="archive-collection-heading">
        <div><p className="eyebrow">{String(items.length).padStart(2, '0')} {items.length === 1 ? 'entry' : 'entries'}</p><h2 id={id}>{title}</h2></div>
        <p>{description}</p>
      </header>
      <div className="archive-grid">
        {items.map((item) => (
          <article className="archive-entry" key={item.url}>
            <a className="archive-entry-image" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title}`}>
              <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" />
            </a>
            <div className="archive-entry-content">
              <div className="archive-entry-meta"><span>{item.label}</span><span>{item.status}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a className="inline-link" href={item.url} target="_blank" rel="noopener noreferrer">Visit archived site <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

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

      <div className="archive-directory">
        <ArchiveCollection id="portfolio-history" title="Portfolio history" description="Earlier portfolio editions that show how the presentation, design choices, and technical approach changed over time." items={portfolioHistory} />
        <ArchiveCollection id="experiments" title="Experiments" description="Interactive builds and exploratory ideas kept for their process, personality, or lessons learned." items={experiments} />
      </div>
    </div>
  );
}
