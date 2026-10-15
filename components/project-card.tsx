import { ArrowRight, ArrowUpRight, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/data/portfolio';
import { ProjectImagePreview } from '@/components/project-image-preview';
import { TagList } from '@/components/tag-list';
import { isSafeExternalUrl } from '@/lib/links';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  if (project.visibility === 'private') return null;
  const screenshot = project.screenshots[0];
  return (
    <article className="project-card">
      <div className="project-card-visual">
        {screenshot ? <ProjectImagePreview screenshot={screenshot} title={project.title} /> : (
          <div className="visual-placeholder">
            <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
            <ImageIcon size={24} strokeWidth={1.25} aria-hidden="true" />
            <span>Screenshot to follow</span>
          </div>
        )}
      </div>
      <div className="project-card-content">
        <p className="project-client">{project.client}</p>
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        {project.summary && <p>{project.summary}</p>}
        {project.role && <p className="project-role">Role: {project.role}</p>}
        <TagList items={project.tools} />
        <div className="project-card-actions">
          {project.placeholder ? <span className="project-status">Details pending</span> : (
            <Link className="project-card-details" href={isSafeExternalUrl(project.caseStudyUrl) ? project.caseStudyUrl : `/work/${project.slug}/`}>
              View details <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
          {!project.placeholder && isSafeExternalUrl(project.liveUrl) && (
            <a className="inline-link project-card-live" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={15} aria-hidden="true" /></a>
          )}
        </div>
      </div>
    </article>
  );
}
