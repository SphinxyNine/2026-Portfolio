import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CtaPanel() {
  return (
    <section className="cta-panel">
      <div>
        <p className="eyebrow">Have a project in mind?</p>
        <h2>Let&apos;s make the requirements clear and the solution useful.</h2>
      </div>
      <Link className="button button-primary" href="/contact/">
        Get in touch <ArrowRight size={17} />
      </Link>
    </section>
  );
}
