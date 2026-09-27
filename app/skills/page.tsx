import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { TechStackContent } from '@/components/portfolio-sections';

export const metadata: Metadata = {
  title: 'Tech Stack', description: 'Technologies and tools, grouped by the work they support.',
  alternates: { canonical: '/skills/' },
};
export default function Page() {
  return (
    <div className="page">
      <PageIntro eyebrow="Portfolio" title="Tech Stack" description="Technologies and tools, grouped by the work they support." />
      <TechStackContent />
    </div>
  );
}
