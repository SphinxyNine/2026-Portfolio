import type { Metadata } from 'next';
import { FileText, LayoutTemplate, ShoppingBag } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { ViewCollection } from '@/components/view-collection';

const plannedProducts = [
  { title: 'Professional Résumé Template', type: 'Résumé template', description: 'A focused résumé layout for web, CRM, and automation roles.', icon: FileText },
  { title: 'Portfolio Website Template', type: 'Website template', description: 'A dark, responsive portfolio system for independent digital professionals.', icon: LayoutTemplate },
];

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
      <ViewCollection storageKey="shop" countLabel={`${plannedProducts.length} planned products`}>
        <div className="shop-collection">
          {plannedProducts.map(({ title, type, description, icon: Icon }) => (
            <article className="shop-item" key={title}>
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              <div><p className="eyebrow">{type}</p><h3>{title}</h3><p>{description}</p></div>
              <span>In development</span>
            </article>
          ))}
        </div>
      </ViewCollection>
    </div>
  );
}
