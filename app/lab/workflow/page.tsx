import type { Metadata } from 'next';
import { AutomationPlayground } from '@/components/automation-playground';
import { PageIntro } from '@/components/page-intro';

export const metadata: Metadata = {
  title: 'Build a Workflow',
  description: 'Build and run a small CRM automation workflow in Zy Fausto’s interactive portfolio lab.',
  alternates: { canonical: '/lab/workflow/' },
};

export default function WorkflowLabPage() {
  return (
    <div className="page lab-page">
      <PageIntro eyebrow="Interactive lab" title="Build a Workflow" description="Choose an event, add automation steps, and run a simple CRM workflow." />
      <AutomationPlayground />
    </div>
  );
}
