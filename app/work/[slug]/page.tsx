import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, ImageIcon, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DraftBadge } from '@/components/draft-badge';
import { TagList } from '@/components/tag-list';
import { caseStudyProjects, getProject } from '@/data/portfolio';
import { isSafeExternalUrl } from '@/lib/links';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const outline = project.sections.length
    ? project.sections
    : [
        { title: 'Context', body: 'Add the client or business context that shaped this project.' },
        { title: 'Challenge', body: 'Explain the problem, constraints, and what needed to change.' },
        { title: 'Approach', body: 'Describe your decisions, implementation, and responsibilities.' },
        { title: 'Outcome', body: 'Add a verified result or a clear description of what was delivered.' },
      ];

  return (
    <article className="page case-study">
      <Link className="back-link" href="/work/"><ArrowLeft size={16} /> All work</Link>
      <header className="case-study-header">
        <div>
          <div className="case-study-meta">
            <p className="eyebrow">{project.category}</p>
            {project.placeholder && <DraftBadge>Case study outline</DraftBadge>}
          </div>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <div className="case-study-facts">
          <dl>
            <div><dt>Role</dt><dd>{project.role || 'To be added'}</dd></div>
            <div><dt>Client</dt><dd>{project.client || 'To be confirmed'}</dd></div>
            <div><dt>Year</dt><dd>{project.year || 'To be added'}</dd></div>
            <div><dt>Visibility</dt><dd>{project.visibility === 'limited' ? 'Limited details' : 'Public'}</dd></div>
          </dl>
          <TagList items={project.tools} />
          {isSafeExternalUrl(project.liveUrl) && (
            <a className="inline-link" href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit project <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </header>

      <div className="case-study-visual">
        <ImageIcon size={32} strokeWidth={1.2} />
        <span>Approved project screenshots will appear here</span>
      </div>

      {project.visibility === 'limited' && (
        <div className="limited-notice"><LockKeyhole size={18} /> This case study shows approved details only.</div>
      )}

      <div className="case-study-body">
        {outline.map((section, index) => (
          <section key={section.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{section.title}</h2><p>{section.body}</p></div>
          </section>
        ))}
      </div>
    </article>
  );
}
