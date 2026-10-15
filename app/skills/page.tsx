import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { TechStackContent } from '@/components/portfolio-sections';

export const metadata: Metadata = {
  title: 'Tech Stack', description: 'The development, CRM, automation, and tracking tools behind my client work.',
  alternates: { canonical: '/skills/' },
};
export default function Page() {
  return (
    <div className="page">
      <PageIntro eyebrow="Portfolio" title="Tech Stack" description="The development, CRM, automation, and tracking tools behind my client work." />
      <TechStackContent />
    </div>
  );
}
