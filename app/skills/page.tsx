import type { Metadata } from 'next';
import { BarChart3, Braces, GitBranch, PenTool, Workflow } from 'lucide-react';
import { DraftBadge } from '@/components/draft-badge';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { skills } from '@/data/portfolio';

const icons = [Braces, GitBranch, Workflow, BarChart3, PenTool];

export const metadata: Metadata = {
  title: 'Skills & tools',
  description: 'Capabilities across web development, funnels, CRM systems, automation, analytics, and design tools.',
};

export default function SkillsPage() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="04 / Skills & tools"
        title="A connected toolkit for digital implementation."
        description="Grouped by the work they support, without arbitrary proficiency scores. This initial list comes from the portfolio brief and still needs confirmation."
      />
      <div className="page-note"><DraftBadge>Provisional capability list</DraftBadge></div>
      <div className="skills-grid">
        {skills.map((group, index) => {
          const Icon = icons[index];
          return (
            <Reveal className="skill-card" delay={index * 0.04} key={group.title}>
              <div className="skill-card-top">
                <span className="skill-icon"><Icon size={21} /></span>
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
