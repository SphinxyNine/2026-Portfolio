import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page not-found">
      <p className="eyebrow">404 / Not found</p>
      <h1>This page is not part of the portfolio.</h1>
      <p>The link may be outdated, or the project may not be publicly available.</p>
      <Link className="button button-primary" href="/#introduction"><ArrowLeft size={17} /> Back to introduction</Link>
    </div>
  );
}
