import type { Metadata } from 'next';
import { ShoppingBag } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'Shop', description: 'Resume and website templates by Zy Fausto.',
  alternates: { canonical: '/shop/' },
};

export default function ShopPage() {
  return (
    <div className="page">
      <PageIntro eyebrow="Explore" title="Shop" description="Resume and website templates are planned for this space." />
      <section className="placeholder-panel" aria-labelledby="shop-status">
        <ShoppingBag size={22} strokeWidth={1.5} aria-hidden="true" />
        <div><p className="eyebrow">Coming soon</p><h2 id="shop-status">Templates in development</h2><p>Products will appear here once their previews, licenses, and support details are ready.</p></div>
      </section>
    </div>
  );
}
