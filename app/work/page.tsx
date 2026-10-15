import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ProjectsContent } from '@/components/portfolio-sections';

export const metadata: Metadata = {
  title: 'Projects', description: 'Selected client work across websites, funnels, CRM systems, and automation.',
  alternates: { canonical: '/work/' },
};
export default function Page() {
  return (
    <div className="page projects-page">
      <PageIntro eyebrow="Portfolio" title="Projects" description="Selected client work across websites, funnels, CRM systems, and automation." />
      <ProjectsContent />
    </div>
  );
}
