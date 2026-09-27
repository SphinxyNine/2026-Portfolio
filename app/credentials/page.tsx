import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { CertificationsContent } from '@/components/portfolio-sections';

export const metadata: Metadata = {
  title: 'Certifications', description: 'Certifications, training, and education.',
  alternates: { canonical: '/credentials/' },
};
export default function Page() {
  return (
    <div className="page">
      <PageIntro eyebrow="Portfolio" title="Certifications" description="Certifications, training, and education." />
      <CertificationsContent />
    </div>
  );
}
