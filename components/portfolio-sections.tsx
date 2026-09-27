import { ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { credentials, enabledProjects, experience, experiencePeriod, skills } from '@/data/portfolio';
import { isSafeExternalUrl } from '@/lib/links';
import { ProjectCard } from './project-card';
import { TagList } from './tag-list';

export function ProjectsContent() {
  return (
    <>
      <p className="section-note">Project details and screenshots are being prepared. These entries are provisional.</p>
      <div className="project-grid">
        {enabledProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </>
  );
}
export function TechStackContent() {
  return (
    <div className="stack-list">
      {skills.map((group) => (
        <div className="stack-row" key={group.title}>
          <h3>{group.title}</h3>
          <div>
            <TagList items={group.items} />
            {!!group.pending.length && (
              <details className="pending-tools">
                <summary>Additional tools to confirm</summary>
                <p>{group.pending.join(' · ')}</p>
              </details>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export function ExperienceContent() {
  return (
    <>
      <p className="section-note">Selected experience from my previous résumé. Newer roles and current details will be added.</p>
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-row" key={item.company}>
            <p className="experience-date">{experiencePeriod(item)}</p>
            <div>
              <h3>{item.role}</h3>
              <p className="experience-company">{item.company}</p>
              <p className="experience-summary">{item.summary}</p>
              <TagList items={item.tools} />
              {item.statusNote && <p className="content-note">{item.statusNote}</p>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
export function CertificationsContent() {
  return (
    <div className="credentials-list">
      {['Certifications & training', 'Education'].map((group) => (
        <div className="credential-group" key={group}>
          <h3 className="subsection-label">{group}</h3>
          {credentials.filter((item) => (item.type === 'Education') === (group === 'Education')).map((item) => {
            const Icon = item.type === 'Education' ? GraduationCap : Award;
            return (
              <article className="credential-row" key={item.name}>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.provider}</p>
                  {item.certificateImage && <Image className="certificate-image" src={item.certificateImage} alt={`${item.name} certificate`} width={600} height={420} />}
                  {isSafeExternalUrl(item.credentialURL) && <a className="inline-link" href={item.credentialURL} target="_blank" rel="noopener noreferrer">View credential <ArrowUpRight size={15} /></a>}
                </div>
                {item.year && <p className="credential-date">{item.year}</p>}
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
}
