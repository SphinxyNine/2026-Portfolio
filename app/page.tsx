import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  GraduationCap,
  Music2,
  Network,
} from 'lucide-react';
import Link from 'next/link';
import { GitHubContributions } from '@/components/github-contributions';
import { HeroPortraitCarousel } from '@/components/hero-portrait-carousel';
import { SelectedWorkCarousel } from '@/components/selected-work-carousel';
import {
  credentials,
  coreStack,
  experience,
  experiencePeriod,
  overviewHighlights,
  plannedPosts,
  profile,
  selectedWorkProjects,
} from '@/data/portfolio';

const featuredExperience = [experience[0], experience[1], experience[3]];
const credentialIcons = {
  Certification: Award,
  Training: Network,
  Education: GraduationCap,
};

export default function HomePage() {
  return (
    <div className="page home-page">
      <section id="introduction" className="hero" aria-labelledby="intro-heading" tabIndex={-1}>
        <div className="hero-grid">
          <HeroPortraitCarousel portraits={profile.portraits} />
          <div className="hero-copy">
            <h1 className="hero-name" id="intro-heading">{profile.overviewName}</h1>
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

      <section className="home-section featured-work" aria-labelledby="featured-work-heading">
        <header className="section-heading home-section-heading">
          <span className="section-index" aria-hidden="true">01</span>
          <h2 id="featured-work-heading">Selected work</h2>
          <Link className="inline-link section-link" href="/work">All projects <ArrowRight size={14} /></Link>
        </header>
        <SelectedWorkCarousel projects={selectedWorkProjects} />
      </section>

      <section className="home-section" aria-labelledby="experience-preview-heading">
        <header className="section-heading home-section-heading">
          <span className="section-index" aria-hidden="true">02</span>
          <h2 id="experience-preview-heading">Experience</h2>
          <Link className="inline-link section-link" href="/experience">Full history <ArrowRight size={14} /></Link>
        </header>
        <div className="home-experience-list">
          {featuredExperience.map((item) => (
            <article className="home-experience-row" key={`${item.company}-${item.role}`}>
              <p>{experiencePeriod(item)}</p>
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </article>
          ))}
        </div>
        <div className="home-stack-preview">
          <div className="home-stack-header">
            <p className="subsection-label">Core stack</p>
            <Link className="inline-link" href="/skills">View all <ArrowRight size={14} /></Link>
          </div>
          <ul className="tag-list home-stack-tags" aria-label="Core tools">
            {coreStack.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      </section>

      <section className="home-section" aria-labelledby="credentials-preview-heading">
        <header className="section-heading home-section-heading">
          <span className="section-index" aria-hidden="true">03</span>
          <h2 id="credentials-preview-heading">Certifications & education</h2>
          <Link className="inline-link section-link" href="/credentials">View credentials <ArrowRight size={14} /></Link>
        </header>
        <div className="home-credential-grid">
          {credentials.map((credential) => {
            const Icon = credentialIcons[credential.type];
            return (
              <article className="home-credential-card" key={credential.name}>
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                <p className="eyebrow">{credential.type}</p>
                <h3>{credential.name}</h3>
                <p>{credential.provider}</p>
                <p className="credential-card-date">{credential.year}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="build-log" className="home-section build-log" aria-labelledby="build-log-heading">
        <header className="section-heading home-section-heading build-log-heading">
          <span className="section-index" aria-hidden="true">04</span>
          <h2 id="build-log-heading">Build log</h2>
          <Link className="inline-link section-link" href="/blog">View blog <ArrowRight size={14} /></Link>
        </header>
        <p className="section-note">Planned topics — articles are in progress.</p>
        <div className="post-list">
          {plannedPosts.map((post) => (
            <article className="post-row" key={post.title}>
              <h3>{post.title}</h3><p>{post.topic}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="lab-preview-heading">
        <header className="section-heading home-section-heading">
          <span className="section-index" aria-hidden="true">05</span>
          <h2 id="lab-preview-heading">Interactive lab</h2>
          <span className="section-link">Try something</span>
        </header>
        <div className="home-lab-grid">
          <Link className="home-lab-card animated-control" href="/lab/piano">
            <span className="home-lab-icon"><Music2 size={21} strokeWidth={1.5} aria-hidden="true" /></span>
            <p className="eyebrow">Musical playground</p>
            <h3>Play Pocket Keys</h3>
            <p>Tap a one-octave piano, shift its range, or play it with your keyboard.</p>
            <span className="inline-link">Play piano <span className="motion-icon"><ArrowRight size={14} aria-hidden="true" /></span></span>
          </Link>
        </div>
      </section>

      <GitHubContributions />
    </div>
  );
}
