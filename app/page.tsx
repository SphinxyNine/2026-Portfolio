import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, FileBadge, Layers3, MapPin, PackageOpen, ShoppingBag, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { overviewHighlights, plannedPosts, profile } from '@/data/portfolio';

const pagePreviews = [
  { href: '/work', title: 'Projects', description: 'Client websites, funnels, CRM systems, and automation work.', meta: '6 selected projects', icon: Layers3 },
  { href: '/skills', title: 'Tech stack', description: 'Tools used across development, GoHighLevel, automation, and analytics.', meta: '6 skill groups', icon: Wrench },
  { href: '/experience', title: 'Experience', description: 'Current roles at 5KeysSolution and GoLive Digital Solutions, plus earlier work.', meta: '5 roles', icon: BriefcaseBusiness },
  { href: '/credentials', title: 'Certifications', description: 'Professional training, certification, and computer science education.', meta: '3 credentials', icon: FileBadge },
  { href: '/resources', title: 'Resources', description: 'A planned collection of useful references, tools, and implementation guides.', meta: 'Coming soon', icon: PackageOpen },
  { href: '/shop', title: 'Shop', description: 'Resume and website templates currently being prepared.', meta: 'Coming soon', icon: ShoppingBag },
];
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
      <section className="landing-pages" aria-labelledby="landing-pages-heading">
        <header className="section-heading">
          <span className="section-index" aria-hidden="true">01</span>
          <h2 id="landing-pages-heading">Explore</h2>
        </header>
        <div className="page-preview-grid">
          {pagePreviews.map(({ href, title, description, meta, icon: Icon }) => (
            <Link className="page-preview-card animated-control" href={href} key={href}>
              <span className="page-preview-icon motion-icon" aria-hidden="true"><Icon size={17} strokeWidth={1.5} /></span>
              <span className="page-preview-meta">{meta}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="page-preview-action">Open page <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
      <section id="build-log" className="build-log" aria-labelledby="build-log-heading">
        <header className="section-heading build-log-heading">
          <span className="section-index" aria-hidden="true">02</span>
          <h2 id="build-log-heading">Build log</h2>
          <Link className="inline-link build-log-link" href="/blog">View blog <ArrowRight size={14} /></Link>
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
