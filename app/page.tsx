import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ProjectsContent, TechStackContent, ExperienceContent, CertificationsContent } from '@/components/portfolio-sections';
import { profile } from '@/data/portfolio';

const sections = [
  { id: 'projects', title: 'Projects', component: ProjectsContent },
  { id: 'tech-stack', title: 'Tech Stack', component: TechStackContent },
  { id: 'experience', title: 'Experience', component: ExperienceContent },
  { id: 'certifications', title: 'Certifications', component: CertificationsContent },
];
export default function HomePage() {
  return (
    <div className="page home-page">
      <section id="introduction" className="hero" aria-labelledby="intro-heading" tabIndex={-1}>
        <p className="eyebrow">Personal portfolio <span aria-hidden="true">/</span> {profile.location}</p>
        <h1 id="intro-heading">{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <ul className="expertise" aria-label="Areas of work">{profile.expertise.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">View Projects <ArrowDown size={16} /></a>
          <a className="button button-quiet" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /></a>
        </div>
        {profile.resume && <a className="inline-link resume-link" href={profile.resume} download>Download Résumé <ArrowDown size={15} /></a>}
      </section>
      {sections.map(({ id, title, component: Content }, index) => (
        <section className="portfolio-section" id={id} aria-labelledby={`${id}-heading`} tabIndex={-1} key={id}>
          <header className="section-heading">
            <span className="section-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h2 id={`${id}-heading`}>{title}</h2>
          </header>
          <Content />
        </section>
      ))}
    </div>
  );
}
