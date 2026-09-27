import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ProjectsContent } from '@/components/portfolio-sections';

export const metadata: Metadata = {
  title: 'Projects', description: 'Project details and screenshots are being prepared.',
  alternates: { canonical: '/work/' },
};
export default function Page() {
  return (
    <div className="page">
      <PageIntro eyebrow="Portfolio" title="Projects" description="Project details and screenshots are being prepared." />
      <ProjectsContent />
    </div>
  );
}
