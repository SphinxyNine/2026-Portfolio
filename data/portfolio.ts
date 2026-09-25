export type ProjectVisibility = 'public' | 'limited' | 'private';

export type CaseStudySection = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  enabled: boolean;
  placeholder: boolean;
  visibility: ProjectVisibility;
  category: string;
  title: string;
  summary: string;
  role: string;
  tools: string[];
  objective: string;
  year: string;
  image: string;
  alt: string;
  liveUrl: string;
  client: string;
  responsibilities: string[];
  outcome: string;
  sections: CaseStudySection[];
};

export const profile = {
  draft: true,
  name: 'YOUR NAME',
  initials: 'YN',
  photo: '',
  title: 'Web, Funnel & Automation Specialist',
  shortTitle: 'Digital solutions specialist',
  location: 'Philippines',
  availability: '',
  email: '',
  resume: '',
  introduction:
    'I build websites, funnels, CRM systems, automations, and practical digital solutions for businesses.',
  socials: {
    linkedin: '',
    github: '',
  },
  seo: {
    description:
      'Personal portfolio featuring web development, funnels, CRM systems, workflow automation, analytics, and digital implementation projects.',
    canonical: '',
  },
};

export const projects: Project[] = [
  {
    slug: 'funnel-crm',
    enabled: true,
    placeholder: true,
    visibility: 'public',
    category: 'Funnels & CRM',
    title: 'A clearer path from inquiry to action.',
    summary:
      'Project placeholder for a funnel and CRM implementation. Add the business context, your contribution, and the verified outcome.',
    role: 'Add your role and responsibilities',
    tools: ['GoHighLevel', 'CRM', 'Workflow automation'],
    objective: 'Add the project objective',
    year: '',
    image: '',
    alt: '',
    liveUrl: '',
    client: '',
    responsibilities: [],
    outcome: '',
    sections: [],
  },
  {
    slug: 'business-website',
    enabled: true,
    placeholder: true,
    visibility: 'public',
    category: 'Web development',
    title: 'A business website built around clarity.',
    summary:
      'Project placeholder for a corporate website or product microsite. Describe the audience, requirements, and implementation.',
    role: 'Add your role and responsibilities',
    tools: ['HTML', 'CSS', 'JavaScript'],
    objective: 'Add the project objective',
    year: '',
    image: '',
    alt: '',
    liveUrl: '',
    client: '',
    responsibilities: [],
    outcome: '',
    sections: [],
  },
  {
    slug: 'chatbot-automation',
    enabled: true,
    placeholder: true,
    visibility: 'public',
    category: 'Automation & chatbots',
    title: 'Less repetition. More useful conversations.',
    summary:
      'Project placeholder for a chatbot or workflow automation. Explain the process, integrations, and your responsibilities.',
    role: 'Add your role and responsibilities',
    tools: ['ManyChat', 'Webhooks', 'Google Sheets'],
    objective: 'Add the project objective',
    year: '',
    image: '',
    alt: '',
    liveUrl: '',
    client: '',
    responsibilities: [],
    outcome: '',
    sections: [],
  },
  {
    slug: 'selected-client-work',
    enabled: true,
    placeholder: true,
    visibility: 'private',
    category: 'Digital systems',
    title: 'Selected client work.',
    summary: 'Details available upon request.',
    role: '',
    tools: [],
    objective: '',
    year: '',
    image: '',
    alt: '',
    liveUrl: '',
    client: '',
    responsibilities: [],
    outcome: '',
    sections: [],
  },
];

export const experience = [
  {
    period: 'DATES TO ADD',
    role: 'Your current professional role',
    company: 'Company / organization',
    description:
      'Add a short description of your scope, the systems you work on, and your responsibilities.',
    tools: [] as string[],
    placeholder: true,
  },
  {
    period: 'DATES TO ADD',
    role: 'Your previous role or independent work',
    company: 'Company / independent',
    description:
      'Add relevant earlier experience and the type of work you delivered.',
    tools: [] as string[],
    placeholder: true,
  },
];

export const skills = [
  {
    title: 'Web development',
    description: 'Responsive interfaces and maintainable web experiences.',
    items: ['HTML', 'CSS', 'JavaScript', 'Responsive development', 'Git & GitHub'],
  },
  {
    title: 'Funnels & CRM',
    description: 'Customer journeys connected to usable sales systems.',
    items: ['GoHighLevel', 'Landing pages', 'Forms & pipelines', 'CRM setup'],
  },
  {
    title: 'Automation',
    description: 'Workflows that reduce repetitive operational tasks.',
    items: ['ManyChat', 'Webhooks', 'Google Sheets', 'API integrations', 'Workflow automation'],
  },
  {
    title: 'Analytics',
    description: 'Implementation that makes performance visible.',
    items: ['Google Analytics 4', 'Google Tag Manager', 'Meta Pixel', 'Conversion tracking'],
  },
  {
    title: 'Design & build tools',
    description: 'Tools used to plan, build, and communicate digital work.',
    items: ['Figma', 'VS Code', 'Notion', 'Lovable'],
  },
];

export const credentials: Array<{
  name: string;
  provider: string;
  year: string;
  url: string;
  type: 'Certification' | 'Education' | 'Course' | 'Training';
}> = [];

export const about = [
  'I work between development, digital systems, and client implementation.',
  'Most of my work involves taking a business requirement and turning it into something usable — whether that is a website, funnel, CRM workflow, chatbot, analytics setup, or automation.',
  'I particularly enjoy projects where design and technical implementation need to work together.',
];

export const enabledProjects = projects.filter((project) => project.enabled);
export const caseStudyProjects = enabledProjects.filter(
  (project) => project.visibility !== 'private',
);

export function getProject(slug: string) {
  return caseStudyProjects.find((project) => project.slug === slug);
}
