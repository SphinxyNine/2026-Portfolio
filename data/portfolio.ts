export type ProjectVisibility = 'public' | 'limited' | 'private';
export type Project = {
  slug: string; enabled: boolean; placeholder: boolean; visibility: ProjectVisibility;
  title: string; client: string; year: string; category: string; summary: string;
  role: string; responsibilities: string[]; tools: string[];
  screenshots: { src: string; alt: string }[];
  liveUrl: string; caseStudyUrl: string; sections: { title: string; body: string }[];
};

export const profile = {
  name: 'Zyron Jade Fausto', shortName: 'Zyron Fausto', initials: 'ZF',
  title: 'Web Developer & Automation Specialist',
  expertise: ['Web Development', 'Funnels', 'CRM', 'Automation'],
  location: 'Philippines', photo: '/profile/dazayy.jpeg',
  photoAlt: 'Illustrated character avatar chosen by Zyron Jade Fausto',
  email: 'jade.fausto17@gmail.com',
  resume: '', // Add only the updated, approved résumé.
  introduction: "I build responsive websites, funnels, CRM workflows, and business automations. My work combines development, GoHighLevel, integrations, analytics, and practical technical support.",
  socials: { linkedin: 'https://linkedin.com/in/zyron-fausto/', github: 'https://github.com/SphinxyNine' },
  seo: {
    description: 'Portfolio of Zyron Jade Fausto, a web developer and automation specialist working with websites, funnels, CRM systems, integrations, and digital automation.',
    canonical: 'https://professional-portfolio.golivedigital-jz.chatgpt.site',
  },
};

export const overviewHighlights = [
  { value: 'Web', label: 'Responsive websites' },
  { value: 'Systems', label: 'Funnels & CRM' },
  { value: 'Automation', label: 'Workflows & integrations' },
];

export const plannedPosts = [
  { title: 'Building a portfolio around verified work', topic: 'Process' },
  { title: 'What I automate with GoHighLevel', topic: 'Automation' },
  { title: 'From website requirements to implementation', topic: 'Development' },
];

// Candidates from the brief. Roles, dates, results, and case studies need approval.
function projectDraft(slug: string, client: string, title: string, category: string): Project {
  return { slug, client, title, category, enabled: true, placeholder: true,
    visibility: 'public', year: '', summary: '', role: '', responsibilities: [],
    tools: [], screenshots: [], liveUrl: '', caseStudyUrl: '', sections: [] };
}
export const projects: Project[] = [
  projectDraft('morocco-expedition', 'Bear Grylls Survival Academy', 'Morocco Expedition Funnel', 'Funnels & CRM'),
  projectDraft('novectus-medical', 'Novectus Medical Corporation', 'ActiGraft / Medical Website', 'Web development'),
  projectDraft('linkfreight-express', 'Linkfreight Express International', 'Corporate Website', 'Web development'),
  projectDraft('airbridge-freight', 'Airbridge Freight International', 'Corporate Website', 'Web development'),
  projectDraft('homebuddy-ph', 'HomeBuddy PH', 'ManyChat / Automation System', 'Automation'),
  projectDraft('golive-digital', 'GoLive Digital Solutions', 'Web / Digital Systems', 'Web development & automation'),
];

export type Experience = {
  company: string; role: string; startDate: string; endDate: string; location: string;
  summary: string; responsibilities: string[]; tools: string[];
  current: boolean | null; statusNote?: string;
};
export const experience: Experience[] = [
  {
    company: 'Zeta Dev X / Freelance Development', role: 'Fullstack Web Developer',
    startDate: 'May 2024', endDate: '', current: null,
    statusNote: 'Listed as ongoing in the previous résumé; current status to confirm.',
    location: 'Remote',
    summary: 'Developed responsive websites for small businesses. Worked with clients to gather requirements and implement their websites.',
    responsibilities: ['Web development', 'Client requirements'], tools: ['React', 'Node.js', 'MongoDB'],
  },
  {
    company: 'GCF South Metro International School', role: 'IT Specialist',
    startDate: 'February 2023', endDate: 'May 2024', current: false, location: 'Las Piñas',
    summary: 'Managed network configurations, supported a Google Workspace migration, and maintained school devices. Provided technical support and laptop repairs.',
    responsibilities: ['Network administration', 'Device maintenance', 'Technical support'],
    tools: ['Google Workspace', 'VLANs', 'Firewalls'],
  },
  {
    company: 'GCF South Metro Church', role: 'Youth Ministry Head Tech Volunteer',
    startDate: 'March 2020', endDate: 'January 2025', current: false, location: 'Las Piñas',
    summary: 'Led the volunteer technical team for live events. Supported audio, video, and streaming systems, and trained volunteers in troubleshooting.',
    responsibilities: ['Volunteer training', 'Live event support'], tools: ['Audio / video systems', 'Live streaming'],
  },
];
export function experiencePeriod(item: Experience) {
  if (item.current) return `${item.startDate} – Present`;
  if (item.endDate) return `${item.startDate} – ${item.endDate}`;
  return `From ${item.startDate}`;
}

export const skills = [
  { title: 'Web development', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'GitHub'], pending: [] as string[] },
  { title: 'Funnels & CRM', items: ['GoHighLevel', 'Landing pages', 'Forms', 'CRM workflows'], pending: ['Pipelines'] },
  { title: 'Automation & integration', items: ['Business automation', 'Integrations'], pending: ['ManyChat', 'Webhooks', 'Google Sheets', 'API integrations'] },
  { title: 'Analytics', items: ['Analytics implementation'], pending: ['Google Analytics 4', 'Google Tag Manager', 'Meta Pixel', 'Conversion tracking'] },
  { title: 'Design / development tools', items: ['Figma', 'Postman'], pending: ['VS Code', 'Notion', 'Lovable'] },
  { title: 'Other web platforms', items: ['Shopify', 'WordPress', 'Webflow', 'Framer'], pending: [] as string[] },
];
export type Credential = {
  name: string; provider: string; year: string; credentialURL: string;
  certificateImage: string; type: 'Certification' | 'Training' | 'Education';
};
export const credentials: Credential[] = [
  { name: 'Full-Stack Web Development (MERN)', provider: 'Zuitt Coding Bootcamp', year: 'June 2024', credentialURL: '', certificateImage: '', type: 'Certification' },
  { name: 'Network Administration Training', provider: 'The Poor IT Guy', year: 'March 2023', credentialURL: '', certificateImage: '', type: 'Training' },
  { name: 'Bachelor of Science in Computer Science', provider: 'Pamantasan ng Lungsod ng Muntinlupa', year: 'August 2022', credentialURL: '', certificateImage: '', type: 'Education' },
];
export const enabledProjects = projects.filter((project) => project.enabled && project.visibility !== 'private');
export const caseStudyProjects = enabledProjects;
export function getProject(slug: string) {
  return caseStudyProjects.find((project) => project.slug === slug);
}
