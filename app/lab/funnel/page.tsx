import type { Metadata } from 'next';
import { FunnelChallenge } from '@/components/funnel-challenge';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'Fix the Funnel',
  description: 'Find and repair four conversion issues in an interactive landing-page challenge by Zy Fausto.',
  alternates: { canonical: '/lab/funnel/' },
};

export default function FunnelLabPage() {
  return (
    <div className="page lab-page">
      <PageIntro eyebrow="Interactive lab" title="Fix the Funnel" description="Inspect a sample landing page, click its weak points, and see how each improvement helps." />
      <FunnelChallenge />
    </div>
  );
}
