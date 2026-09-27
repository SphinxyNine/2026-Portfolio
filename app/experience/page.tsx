import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ExperienceContent } from '@/components/portfolio-sections';

export const metadata: Metadata = {
  title: 'Experience', description: 'GoHighLevel funnels, CRM automation, web development, analytics implementation, and IT support experience.',
  alternates: { canonical: '/experience/' },
};
export default function Page() {
  return (
    <div className="page">
      <PageIntro eyebrow="Portfolio" title="Experience" description="Current work in GoHighLevel, web development, CRM automation, analytics, and client implementation." />
      <ExperienceContent />
    </div>
  );
}
