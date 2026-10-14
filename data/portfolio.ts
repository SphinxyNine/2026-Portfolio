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
  location: 'Philippines',
  portraits: [
    { src: '/profile/zy-image-landing-2.png', alt: 'Illustrated portrait of Zy Fausto with a green abstract background', treatment: 'cutout' as const },
    { src: '/profile/zy-image-landing.png', alt: 'Halftone portrait of Zy Fausto wearing a cap and glasses', treatment: 'cutout' as const },
  ],
  email: 'jade.fausto17@gmail.com',
  resume: '', // Add only the updated, approved résumé.
  introduction: "I turn business requirements into responsive websites and practical automation systems—from landing pages and funnels to CRM workflows, tracking, and integrations.",
  socials: { linkedin: 'https://linkedin.com/in/zyron-fausto/', github: 'https://github.com/SphinxyNine' },
  seo: {
    description: 'Portfolio of Zy Fausto, a web developer and automation specialist working with websites, funnels, CRM systems, integrations, and digital automation.',
    canonical: 'https://zyfausto-portfolio.vercel.app/',
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

export const projects: Project[] = [
  {
    slug: 'bgsa-corporate-events', enabled: true, placeholder: false, visibility: 'public',
    title: 'Corporate Events Funnel', client: 'Bear Grylls Survival Academy', year: '2026', category: 'GoHighLevel · Funnels & CRM',
    summary: 'A campaign experience for corporate team-building events, with clear paths to book a discovery call or request a brochure.',
    role: 'Web & Automation Specialist',
    responsibilities: [
      'Built and refined responsive GoHighLevel campaign sections for the events offer.',
      'Connected discovery-call and brochure inquiry paths with CRM follow-up workflows.',
      'Adapted layouts, copy, and media for desktop and mobile screens.',
      'Supported campaign analytics and conversion tracking with GA4 and Google Tag Manager.',
    ],
    tools: ['GoHighLevel', 'HTML', 'CSS', 'JavaScript', 'CRM Workflows', 'GA4', 'GTM'],
    screenshots: [{ src: '/projects/BGSA-Event-PreviewPhoto.jpg', alt: 'Bear Grylls Survival Academy corporate events landing page' }],
    liveUrl: 'https://events.beargryllssurvivalacademy.com/', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The page introduces the corporate team-building experience and gives visitors direct routes to a discovery call and brochure.' },
      { title: 'Implementation', body: 'I worked on the GoHighLevel page build, responsive sections, inquiry flow, and tracking setup as part of the client implementation.' },
    ],
  },
  {
    slug: 'morocco-expedition', enabled: true, placeholder: false, visibility: 'public',
    title: 'Morocco Expedition Funnel', client: 'Bear Grylls Survival Academy', year: '2026', category: 'GoHighLevel · Funnels & CRM',
    summary: 'A responsive expedition campaign and reservation journey for the Sahara to Summit experience in Morocco.',
    role: 'Web & Automation Specialist',
    responsibilities: [
      'Developed and maintained landing, reservation, confirmation, and supporting campaign pages.',
      'Implemented inquiry and booking workflows, CRM tags, lead notifications, and follow-ups.',
      'Built responsive custom sections and refined layouts from stakeholder feedback.',
      'Supported GA4 and Google Tag Manager events with UTM attribution.',
      'Managed content revisions, image optimization, and launch preparation.',
    ],
    tools: ['GoHighLevel', 'HTML', 'CSS', 'JavaScript', 'CRM Workflows', 'GA4', 'GTM'],
    screenshots: [{ src: '/projects/BGSA-Expedition-PreviewPhoto.jpg', alt: 'Bear Grylls Survival Academy Morocco expedition landing page' }],
    liveUrl: 'https://morocco.expedition.beargryllssurvivalacademy.com/', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The campaign presents the eight-day Sahara to Summit trip, its itinerary, preparation details, and a reservation enquiry path.' },
      { title: 'Implementation', body: 'My work covered responsive GoHighLevel pages, booking and lead flows, content updates, and conversion tracking.' },
    ],
  },
  {
    slug: 'golive-digital', enabled: true, placeholder: false, visibility: 'public',
    title: 'GoLive Digital Website', client: 'GoLive Digital Solutions', year: '2026', category: 'Web development',
    summary: 'An agency website introducing web, funnel, and automation services with a clear path for project inquiries.',
    role: 'Founder & Web Developer',
    responsibilities: [
      'Created a responsive site for the agency brand and service offering.',
      'Organized services, pricing, process, and company information around client needs.',
      'Built calls to action that lead visitors toward a project inquiry.',
    ],
    tools: ['React', 'Next.js', 'JavaScript', 'Responsive Design'],
    screenshots: [{ src: '/projects/GoLive-PreviewPhoto.jpg', alt: 'GoLive Digital Solutions website homepage' }],
    liveUrl: 'https://golivedigitalweb.vercel.app/', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The site presents GoLive Digital Solutions as a partner for websites, funnels, branding, and automation.' },
      { title: 'Build', body: 'The page structure moves from the core offer to services, process, pricing, and a project inquiry so visitors can understand the work and get in touch.' },
    ],
  },
  {
    slug: 'novectus-medical', enabled: true, placeholder: false, visibility: 'public',
    title: 'Novectus Official Website', client: 'Novectus Medical Corporation', year: '', category: 'Web development',
    summary: 'A responsive corporate website presenting the medical company, its products, and contact information.',
    role: 'Freelance Web Developer',
    responsibilities: [
      'Built the company-facing web experience and responsive page layouts.',
      'Organized company and product information for straightforward browsing.',
      'Created clear navigation between product details and contact paths.',
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    screenshots: [{ src: '/projects/Novectus-PreviewPhoto.jpg', alt: 'Novectus Medical Corporation website homepage' }],
    liveUrl: 'https://novectusmedcorp.com/', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The website introduces Novectus Medical Corporation and makes its healthcare products easier to discover.' },
      { title: 'Build', body: 'The project focuses on a clear company introduction, product navigation, responsive presentation, and contact access.' },
    ],
  },
  {
    slug: 'actigraft', enabled: true, placeholder: false, visibility: 'public',
    title: 'ActiGraft Product Page', client: 'Novectus Medical Corporation', year: '', category: 'Web development',
    summary: 'A dedicated product page explaining the ActiGraft wound-care system and guiding visitors to contact the team.',
    role: 'Freelance Web Developer',
    responsibilities: [
      'Built a focused product page within the Novectus website.',
      'Presented the product message, imagery, and supporting information in a responsive layout.',
      'Added clear paths to explore the system or contact the team.',
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    screenshots: [{ src: '/projects/Actigraft-PreviewPhoto.jpg', alt: 'ActiGraft product page on the Novectus website' }],
    liveUrl: 'https://novectusmedcorp.com/actigraft.html', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'ActiGraft has its own page so visitors can understand the wound-care product without searching through the wider company site.' },
      { title: 'Build', body: 'The layout combines product information, a prominent product image, and direct contact and exploration actions.' },
    ],
  },
  {
    slug: 'linkfreight-express', enabled: true, placeholder: false, visibility: 'public',
    title: 'Linkfreight Express Website', client: 'Linkfreight Express International', year: '', category: 'Web development',
    summary: 'A freight company website presenting logistics services and a direct route to request a quote.',
    role: 'Freelance Web Developer',
    responsibilities: [
      'Built responsive pages for the company profile, services, and contact flow.',
      'Structured the freight offering around service discovery and quote requests.',
      'Adapted the brand presentation across desktop and mobile layouts.',
    ],
    tools: ['React', 'Vite', 'JavaScript', 'Responsive Design'],
    screenshots: [{ src: '/projects/Linkfreight-PreviewPhoto.jpg', alt: 'Linkfreight Express International website homepage' }],
    liveUrl: 'https://linkfreightexpressintl.vercel.app/', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The site introduces Linkfreight Express and its air, ocean, customs, warehousing, and trucking services.' },
      { title: 'Build', body: 'Service sections and quote calls to action help visitors move from an overview of the business to an inquiry.' },
    ],
  },
  {
    slug: 'airbridge-freight', enabled: true, placeholder: false, visibility: 'public',
    title: 'Airbridge Freight Website', client: 'Airbridge Freight International', year: '', category: 'Web development',
    summary: 'A responsive logistics website highlighting freight services and making quote requests easy to find.',
    role: 'Freelance Web Developer',
    responsibilities: [
      'Built the company website with a responsive freight-focused visual layout.',
      'Organized service and company information for prospective customers.',
      'Added clear navigation and request-a-quote actions.',
    ],
    tools: ['React', 'Vite', 'JavaScript', 'Responsive Design'],
    screenshots: [{ src: '/projects/Airbridge-PreviewPhoto.jpg', alt: 'Airbridge Freight International website homepage' }],
    liveUrl: 'https://airfreightexpressintl.vercel.app/', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The site gives Airbridge Freight a clear online presentation of its logistics services and company background.' },
      { title: 'Build', body: 'A prominent freight hero, service navigation, and quote calls to action support visitors looking for logistics help.' },
    ],
  },
  {
    slug: '5keyssolution-company-website', enabled: true, placeholder: false, visibility: 'public',
    title: '5KeysSolution Company Website', client: '5KeysSolution', year: '', category: 'Web development',
    summary: 'A responsive business website presenting the company story, services, and contact pathways.',
    role: 'Web Developer',
    responsibilities: [
      'Built a responsive company website presenting the 5KeysSolution brand and service offering.',
      'Structured clear navigation, company information, service sections, and contact pathways.',
      'Implemented branded visual sections and responsive layouts across screen sizes.',
    ],
    tools: ['React', 'Vite', 'JavaScript', 'Responsive Design'],
    screenshots: [{ src: '/projects/5Keys-PreviewPhoto.jpg', alt: '5KeysSolution company website homepage' }],
    liveUrl: 'https://5keyssolution-official.vercel.app/', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The website gives 5KeysSolution a focused online presence with a clear introduction to its strategic HR and business consultancy services.' },
      { title: 'Build', body: 'The homepage combines branded visuals with company information, service navigation, and contact actions.' },
    ],
  },
  {
    slug: 'homebuddy-ph', enabled: true, placeholder: false, visibility: 'public',
    title: 'HomeBuddy Chat Automation', client: 'HomeBuddy PH', year: '', category: 'Chat automation',
    summary: 'A Facebook Messenger flow that helps visitors find service information and routes common questions through an interactive menu.',
    role: 'Automation Builder',
    responsibilities: [
      'Built the welcome and main-menu automation in ManyChat.',
      'Organized common service questions into linked conversation paths.',
      'Connected the published flow to the HomeBuddy Facebook page.',
    ],
    tools: ['ManyChat', 'Facebook Messenger', 'Conversation Flows', 'Automation'],
    screenshots: [
      { src: '/projects/HomeBuddy-PreviewPhoto.jpg', alt: 'HomeBuddy Facebook page and Messenger conversation' },
      { src: '/projects/Homebuddy-Automation-PreviewPhoto.jpg', alt: 'HomeBuddy welcome and main-menu automation in ManyChat' },
    ],
    liveUrl: 'https://www.facebook.com/profile.php?id=61591516410705', caseStudyUrl: '',
    sections: [
      { title: 'Overview', body: 'The automation gives Facebook visitors a guided way to ask about HomeBuddy services directly in Messenger.' },
      { title: 'Flow', body: 'A welcome menu branches into common questions and service paths, keeping the conversation organized for both visitors and the team.' },
    ],
  },
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
export const selectedWorkSlugs = ['morocco-expedition', 'novectus-medical', 'golive-digital'] as const;
export const selectedWorkProjects = selectedWorkSlugs
  .map((slug) => enabledProjects.find((project) => project.slug === slug))
  .filter((project): project is Project => project !== undefined);
export const caseStudyProjects = enabledProjects;
export function getProject(slug: string) {
  return caseStudyProjects.find((project) => project.slug === slug);
}
