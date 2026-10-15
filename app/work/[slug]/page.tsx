import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TagList } from '@/components/tag-list';
import { caseStudyProjects, getProject, projectTypeLabels } from '@/data/portfolio';
import { ProjectWorkflow } from '@/components/project-workflow';
import { ProjectImagePreview } from '@/components/project-image-preview';
import { isSafeExternalUrl } from '@/lib/links';

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary || 'Project details are being prepared.', alternates: { canonical: `/work/${slug}/` } } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const facts = [['Client', project.client], ['Project type', projectTypeLabels[project.projectType]], ['Role', project.role], ['Year', project.year], ['Status', project.status]].filter(([, value]) => value);
  const automation = project.categories.includes('automation');
  const introSections = automation ? project.sections.filter((section) => ['Overview', 'Problem'].includes(section.title)) : [];
  const remainingSections = project.sections.filter((section) => !introSections.includes(section));
  return (
    <article className="page case-study">
      <Link className="back-link" href="/work"><ArrowLeft size={16} /> Back to projects</Link>
      <header className="case-study-header">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        {project.summary && <p>{project.summary}</p>}
        {project.placeholder && <p className="section-note">This is a provisional project entry. The case study and screenshots are not yet available.</p>}
        <div className="case-study-facts">
          <dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <TagList items={project.tools} />
          {!project.placeholder && isSafeExternalUrl(project.liveUrl) && <a className="inline-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight size={15} /></a>}
          {isSafeExternalUrl(project.demoUrl || '') && <a className="inline-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">View demo <ArrowUpRight size={15} /></a>}
          {isSafeExternalUrl(project.githubUrl || '') && <a className="inline-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={15} /></a>}
        </div>
      </header>
      {!!introSections.length && <div className="case-study-body">{introSections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>}
      {project.workflowDiagram && <section className="case-study-body"><h2>Workflow</h2><ProjectWorkflow diagram={project.workflowDiagram} /></section>}
      {project.screenshots.length ? <section className="case-study-gallery" aria-label="Project screenshots">{project.screenshots.map((shot) => <figure key={shot.src}><div className="project-card-visual"><ProjectImagePreview screenshot={shot} title={project.title} /></div>{shot.caption && <figcaption>{shot.caption}</figcaption>}</figure>)}</section> : (
        <div className="case-study-visual"><ImageIcon size={28} aria-hidden="true" /><p>Screenshot to follow</p></div>
      )}
      {!!project.responsibilities.length && <section className="case-study-body"><h2>{automation ? 'My role' : 'Responsibilities'}</h2><ul className="experience-responsibilities">{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section>}
      <div className="case-study-body">{remainingSections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>
    </article>
  );
}
