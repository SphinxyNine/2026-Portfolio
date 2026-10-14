export type ProjectVisibility = 'public' | 'limited' | 'private';
export type Project = {
  slug: string; enabled: boolean; placeholder: boolean; visibility: ProjectVisibility;
  title: string; client: string; year: string; category: string; summary: string;
  role: string; responsibilities: string[]; tools: string[];
  screenshots: { src: string; alt: string }[];
  liveUrl: string; caseStudyUrl: string; sections: { title: string; body: string }[];
};

export const profile = {
  name: 'Zy Fausto', shortName: 'Zy Fausto', overviewName: 'Zyron Jade Fausto',
  title: 'Web Developer & Automation Specialist',
  expertise: ['Web Development', 'Funnels', 'CRM', 'Automation'],
  location: 'Philippines', photo: '/profile/zy-image-landing.png',
  photoAlt: 'Halftone portrait of Zy Fausto wearing a cap and glasses',
  email: 'jade.fausto17@gmail.com',
  resume: '', // Add only the updated, approved résumé.
  introduction: "I turn business requirements into responsive websites and practical automation systems—from landing pages and funnels to CRM workflows, tracking, and integrations.",
  socials: { linkedin: 'https://linkedin.com/in/zyron-fausto/', github: 'https://github.com/SphinxyNine' },
  seo: {
    description: 'Portfolio of Zy Fausto, a web developer and automation specialist working with websites, funnels, CRM systems, integrations, and digital automation.',
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
  {
    slug: 'morocco-expedition', enabled: true, placeholder: false, visibility: 'public',
    title: 'Funnel & CRM Implementation', client: 'Bear Grylls Survival Academy', year: '2026', category: 'Funnels & CRM',
    summary: 'GoHighLevel campaign funnels, booking workflows, CRM automation, and conversion tracking for expedition products.',
    role: 'Web & Automation Specialist',
    responsibilities: [
      'Developed and maintained campaign landing, reservation, confirmation, and supporting pages.',
      'Implemented inquiry and booking workflows, CRM tagging, lead notifications, and automated follow-ups.',
      'Built responsive custom sections and refined layouts from stakeholder feedback.',
      'Supported GA4 and Google Tag Manager events with UTM-based attribution.',
      'Managed content updates, image optimization, launch preparation, and iterative revisions.',
    ],
    tools: ['GoHighLevel', 'HTML', 'CSS', 'JavaScript', 'GA4', 'Google Tag Manager'],
    screenshots: [], liveUrl: '', caseStudyUrl: '', sections: [],
  },
  {
    slug: '5keyssolution-company-website', enabled: true, placeholder: false, visibility: 'public',
    title: 'Company Website', client: '5KeysSolution', year: '', category: 'Web development',
    summary: 'A responsive business website presenting the company story, services, and contact pathways.',
    role: 'Web Developer',
    responsibilities: [
      'Built a responsive company website presenting the 5KeysSolution brand and service offering.',
      'Structured clear navigation, company information, service sections, and contact pathways.',
      'Implemented branded visual sections and responsive layouts across screen sizes.',
    ],
    tools: ['Web development', 'Responsive design', 'Frontend implementation'],
    screenshots: [{ src: '/archive/5keyssolution.jpg', alt: '5KeysSolution company website homepage' }],
    liveUrl: 'https://5keyssolution-official.vercel.app/', caseStudyUrl: '',
    sections: [{ title: 'Overview', body: 'The website gives 5KeysSolution a focused online presence with a clear introduction to the business, its services, and the next step for potential clients.' }],
  },
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
    company: '5KeysSolution', role: 'Web & Automation Specialist',
    startDate: 'February 2026', endDate: '', current: true, location: 'Remote',
    summary: 'Building GoHighLevel funnels, CRM workflows, tracking systems, and responsive client experiences.',
    responsibilities: [
      'Build and maintain responsive landing pages, funnels, and campaign pages in GoHighLevel for client projects, including Bear Grylls Survival Academy.',
      'Configure CRM workflows, forms, pipelines, tags, lead routing, booking flows, and automated follow-ups from campaign and operational requirements.',
      'Develop and customize page functionality with HTML, CSS, and JavaScript across desktop, tablet, and mobile.',
      'Implement and maintain GA4, Google Tag Manager, UTM tracking, and conversion events for lead-generation and booking funnels.',
      'Translate client feedback and business requirements into technical updates from initial build through launch and post-launch improvements.',
      'Optimize media assets, page structure, and frontend performance while maintaining brand and design consistency.',
    ],
    tools: ['GoHighLevel', 'CRM', 'Funnels', 'Workflows', 'Pipelines', 'HTML', 'CSS', 'JavaScript', 'GA4', 'GTM'],
  },
  {
    company: 'GoLive Digital Solutions', role: 'Founder',
    startDate: 'June 2026', endDate: '', current: true, location: 'Remote',
    summary: 'Founded an independent freelance practice focused on web development and business automation.',
    responsibilities: ['Business ownership', 'Freelance web development', 'Client automation projects'],
    tools: ['Web development', 'Automation'],
  },
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
  { title: 'Funnels & CRM', items: ['GoHighLevel', 'Landing pages', 'Forms', 'CRM workflows', 'Pipelines'], pending: [] as string[] },
  { title: 'Automation & integration', items: ['Business automation', 'Integrations', 'Lead routing', 'Automated follow-ups'], pending: ['ManyChat', 'Webhooks', 'Google Sheets', 'API integrations'] },
  { title: 'Analytics', items: ['Google Analytics 4', 'Google Tag Manager', 'UTM tracking', 'Conversion tracking'], pending: ['Meta Pixel'] },
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
