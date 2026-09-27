import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { profile } from '@/data/portfolio';
export const metadata: Metadata = { title: 'About', alternates: { canonical: '/about/' } };
export default function AboutPage() {
  return <div className="page"><PageIntro eyebrow="About" title={profile.name} description={profile.title} /><p className="simple-copy">{profile.introduction}</p></div>;
}
