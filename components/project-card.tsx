import { ArrowUpRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/portfolio';
import { TagList } from '@/components/tag-list';
import { isSafeExternalUrl } from '@/lib/links';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  if (project.visibility === 'private') return null;
  const screenshot = project.screenshots[0];
  return (
    <article className="project-card">
      <div className="project-card-visual">
        {screenshot ? <Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /> : (
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
        {project.placeholder ? <span className="project-status">Details pending</span> : (
          <Link className="inline-link" href={isSafeExternalUrl(project.caseStudyUrl) ? project.caseStudyUrl : `/work/${project.slug}/`}>
            View project <ArrowUpRight size={15} />
          </Link>
        )}
        {!project.placeholder && isSafeExternalUrl(project.liveUrl) && (
          <a className="inline-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={15} /></a>
        )}
      </div>
    </article>
  );
}
