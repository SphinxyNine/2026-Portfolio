'use client';

import { useState } from 'react';
import type { Project, ProjectCategory } from '@/data/portfolio';
import { ProjectCard } from './project-card';
import { ViewCollection } from './view-collection';

const filters: { value: 'all' | ProjectCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'funnels-crm', label: 'Funnels & CRM' },
  { value: 'automation', label: 'Automation' },
];

export function ProjectsCollection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const visible = projects.filter((project) => filter === 'all' || project.categories.includes(filter));
  return (
    <>
      <div className="project-filters" role="group" aria-label="Filter projects by category">
        {filters.map(({ value, label }) => (
          <button key={value} type="button" aria-pressed={filter === value} aria-controls="project-results" onClick={() => setFilter(value)}>{label}</button>
        ))}
      </div>
      <ViewCollection storageKey="projects" countLabel={`${visible.length} of ${projects.length} projects`}>
        <p className="control-label" role="status">{visible.length} projects shown for {filters.find((item) => item.value === filter)?.label}.</p>
        <div className="project-grid" id="project-results">
          {visible.map((project) => <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />)}
        </div>
        {!visible.length && <p>No projects in this category yet.</p>}
      </ViewCollection>
    </>
  );
}
