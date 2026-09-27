import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
  return project ? { title: project.title, description: project.summary || 'Project details are being prepared.', alternates: { canonical: `/work/${slug}/` } } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const facts = [['Client', project.client], ['Role', project.role], ['Year', project.year]].filter(([, value]) => value);
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
        </div>
      </header>
      {project.screenshots.length ? project.screenshots.map((shot) => <Image key={shot.src} className="case-study-screenshot" src={shot.src} alt={shot.alt} width={1280} height={800} />) : (
        <div className="case-study-visual"><ImageIcon size={28} aria-hidden="true" /><p>Screenshot to follow</p></div>
      )}
      {!!project.responsibilities.length && <section className="case-study-body"><h2>Responsibilities</h2><ul className="experience-responsibilities">{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section>}
      <div className="case-study-body">{project.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>
    </article>
  );
}
