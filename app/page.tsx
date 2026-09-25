import { ArrowRight, BarChart3, Blocks, GitBranch, MonitorSmartphone, Workflow } from 'lucide-react';
import Link from 'next/link';
import { CtaPanel } from '@/components/cta-panel';
import { DraftBadge } from '@/components/draft-badge';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { enabledProjects, profile } from '@/data/portfolio';

const capabilityIcons = [MonitorSmartphone, GitBranch, Workflow, BarChart3];

const capabilities = [
  ['Websites', 'Responsive, clear, maintainable'],
  ['Funnels & CRM', 'Connected journeys and pipelines'],
  ['Automation', 'Useful workflows and integrations'],
  ['Analytics', 'Tracking that supports decisions'],
];

export default function OverviewPage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="eyebrow">Portfolio / {profile.location}</span>
            {profile.draft && <DraftBadge />}
          </div>
          <h1>
            I connect business needs with <span>working digital systems.</span>
          </h1>
          <p>{profile.introduction}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/work/">
              Explore selected work <ArrowRight size={17} />
            </Link>
            <Link className="button button-quiet" href="/about/">
              More about me
            </Link>
          </div>
        </div>

        <Reveal className="system-panel" delay={0.12}>
          <div className="system-panel-header">
            <div>
              <span className="status-light" />
              <span>What I connect</span>
            </div>
            <Blocks size={19} />
          </div>
          <div className="system-panel-flow">
            {capabilities.map(([title, description], index) => {
              const Icon = capabilityIcons[index];
              return (
                <div className="system-node" key={title}>
                  <span><Icon size={17} /></span>
                  <div>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="system-panel-footer">
            <span>Requirement</span><span>→</span><span>Implementation</span><span>→</span><span>Outcome</span>
          </div>
        </Reveal>
      </section>

      <section className="home-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">02 / Selected work</p>
            <h2>Projects built around real requirements.</h2>
          </div>
          <Link className="inline-link" href="/work/">View all work <ArrowRight size={15} /></Link>
        </div>
        <div className="featured-projects">
          {enabledProjects.slice(0, 2).map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
      </section>

      <Reveal className="home-section focus-section">
        <div>
          <p className="eyebrow">Current focus</p>
          <h2>Technical implementation with the business context still attached.</h2>
        </div>
        <p>
          The strongest work happens when the site, funnel, CRM, automation, and tracking setup are treated as one connected system.
        </p>
      </Reveal>

      <CtaPanel />
    </div>
  );
}
