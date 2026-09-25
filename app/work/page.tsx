import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ProjectCard } from '@/components/project-card';
import { enabledProjects } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Selected work',
  description: 'Selected web, funnel, CRM, automation, and digital implementation work.',
};

export default function WorkPage() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="02 / Selected work"
        title="Work that connects the interface to the system behind it."
        description="A growing collection of websites, funnels, CRM setups, automations, and digital implementations. Current entries are honest placeholders until approved project material is added."
      />
      <div className="project-grid">
        {enabledProjects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.slug} />
        ))}
      </div>
    </div>
  );
}
