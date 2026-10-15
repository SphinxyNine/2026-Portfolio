import type { Metadata } from 'next';
import { RetiredLab } from '@/components/retired-lab';

export const metadata: Metadata = {
  title: 'Projects',
  robots: { index: false, follow: true },
  alternates: { canonical: '/work/' },
};

export default function WorkflowLabPage() {
  return <RetiredLab />;
}
