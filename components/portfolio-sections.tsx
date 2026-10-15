import { ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { credentials, enabledProjects, experience, experiencePeriod, skills } from '@/data/portfolio';
import { isSafeExternalUrl } from '@/lib/links';
import { ProjectsCollection } from './projects-collection';
import { TagList } from './tag-list';
import { ViewCollection } from './view-collection';

export function ProjectsContent() {
  return <ProjectsCollection projects={enabledProjects} />;
}
export function TechStackContent() {
  return (
    <div className="stack-list">
      {skills.map((group) => (
        <div className="stack-row" key={group.title}>
          <h3>{group.title}</h3>
          <div>
            <p className="stack-description">{group.description}</p>
            <TagList items={group.items} />
            {group.learning && <div className="stack-learning"><p className="subsection-label">Currently building with · Learning & practice</p><TagList items={group.learning} /></div>}
          </div>
        </div>
      ))}
    </div>
  );
}
export function ExperienceContent() {
  return (
    <>
      <p className="section-note">Current roles and selected earlier experience.</p>
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-row" key={item.company}>
            <p className="experience-date">{experiencePeriod(item)}</p>
            <div>
              <h3>{item.role}</h3>
              <p className="experience-company">{item.company}</p>
              <p className="experience-summary">{item.summary}</p>
              {!!item.responsibilities.length && <ul className="experience-responsibilities">{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>}
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
    <ViewCollection storageKey="credentials" countLabel={`${credentials.length} credentials`}>
      <div className="credential-collection">
        {credentials.map((item) => {
          const Icon = item.type === 'Education' ? GraduationCap : Award;
          return (
            <article className="credential-card" key={item.name}>
              <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              <div className="credential-card-main">
                <p className="eyebrow">{item.type}</p>
                <h3>{item.name}</h3>
                <p>{item.provider}</p>
                {item.certificateImage && <Image className="certificate-image" src={item.certificateImage} alt={`${item.name} certificate`} width={600} height={420} />}
                {isSafeExternalUrl(item.credentialURL) && <a className="inline-link" href={item.credentialURL} target="_blank" rel="noopener noreferrer">View credential <ArrowUpRight size={15} /></a>}
              </div>
              {item.year && <p className="credential-date">{item.year}</p>}
            </article>
          );
        })}
      </div>
    </ViewCollection>
  );
}
