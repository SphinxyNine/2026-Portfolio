import type { Metadata } from 'next';
import { PackageOpen } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'Resources', description: 'Useful references and tools for web development and automation.',
  alternates: { canonical: '/resources/' },
};

export default function ResourcesPage() {
  return (
    <div className="page">
      <PageIntro eyebrow="Explore" title="Resources" description="A focused collection of useful references, tools, and implementation guides." />
      <section className="placeholder-panel" aria-labelledby="resources-status">
        <PackageOpen size={22} strokeWidth={1.5} aria-hidden="true" />
        <div><p className="eyebrow">Coming soon</p><h2 id="resources-status">Collection in progress</h2><p>Resources will be added after each recommendation has been reviewed and organized.</p></div>
      </section>
    </div>
  );
}
