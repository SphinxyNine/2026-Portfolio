import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { overviewHighlights, plannedPosts, profile } from '@/data/portfolio';
export default function HomePage() {
  return (
    <div className="page home-page">
      <section id="introduction" className="hero" aria-labelledby="intro-heading" tabIndex={-1}>
        <div className="hero-grid">
          <figure className="hero-portrait">
            <Image src={profile.photo} alt={profile.photoAlt} fill sizes="(max-width: 700px) 80vw, 380px" priority />
          </figure>
          <div className="hero-copy">
            <p className="eyebrow"><MapPin size={13} aria-hidden="true" /> {profile.location}</p>
            <h1 id="intro-heading">{profile.name}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-description">{profile.introduction}</p>
            <ul className="expertise" aria-label="Areas of work">{profile.expertise.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="hero-actions">
              <Link className="button button-primary animated-control" href="/work">View Projects <span className="motion-icon"><ArrowRight size={16} /></span></Link>
              <a className="button button-quiet animated-control" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="motion-icon"><ArrowUpRight size={16} /></span></a>
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
    </div>
  );
}
