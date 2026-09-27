import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ExperienceContent } from '@/components/portfolio-sections';

export const metadata: Metadata = {
  title: 'Experience', description: 'Web development, IT support, and volunteer technical work.',
  alternates: { canonical: '/experience/' },
};
export default function Page() {
  return (
    <div className="page">
      <PageIntro eyebrow="Portfolio" title="Experience" description="Web development, IT support, and volunteer technical work." />
      <ExperienceContent />
    </div>
  );
}
