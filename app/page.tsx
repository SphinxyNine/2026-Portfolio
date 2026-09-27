import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { ProjectsContent, TechStackContent, ExperienceContent, CertificationsContent } from '@/components/portfolio-sections';
import { overviewHighlights, plannedPosts, profile } from '@/data/portfolio';

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
        <div className="hero-grid">
          <figure className="hero-portrait" aria-label="Current profile image">
            <Image src={profile.photo} alt={profile.photoAlt} fill sizes="(max-width: 700px) 80vw, 380px" priority />
            <figcaption>Current profile image</figcaption>
          </figure>
          <div className="hero-copy">
            <p className="eyebrow"><MapPin size={13} aria-hidden="true" /> {profile.location}</p>
            <h1 id="intro-heading">{profile.name}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-description">{profile.introduction}</p>
            <ul className="expertise" aria-label="Areas of work">{profile.expertise.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="hero-actions">
              <a className="button button-primary animated-control" href="#projects">View Projects <span className="motion-icon"><ArrowDown size={16} /></span></a>
              <a className="button button-quiet animated-control" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="motion-icon"><ArrowUpRight size={16} /></span></a>
            </div>
            <div className="hero-socials" aria-label="Social profiles">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
            </div>
            {profile.resume && <a className="inline-link resume-link" href={profile.resume} download>Download Résumé <ArrowDown size={15} /></a>}
          </div>
        </div>
        <ul className="overview-highlights" aria-label="Work focus">
          {overviewHighlights.map((item) => <li key={item.value}><strong>{item.value}</strong><span>{item.label}</span></li>)}
        </ul>
      </section>
      <section id="build-log" className="build-log" aria-labelledby="build-log-heading">
        <header className="section-heading build-log-heading">
          <span className="section-index" aria-hidden="true">00</span>
          <h2 id="build-log-heading">Build log</h2>
          <span className="draft-badge">Planned writing</span>
        </header>
        <div className="post-list">
          {plannedPosts.map((post) => (
            <article className="post-row" key={post.title}>
              <h3>{post.title}</h3><p>{post.topic}</p>
            </article>
          ))}
        </div>
      </section>
      {sections.map(({ id, title, component: Content }, index) => (
        <section className="portfolio-section" id={id} data-nav-section aria-labelledby={`${id}-heading`} tabIndex={-1} key={id}>
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
