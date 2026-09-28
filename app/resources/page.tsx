import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';

type Resource = {
  name: string;
  description: string;
  href: string;
};

type ResourceGroup = {
  title: string;
  resources: Resource[];
};

const resourceGroups: ResourceGroup[] = [
  {
    title: 'Learn AI / ML',
    resources: [
      {
        name: 'DeepLearning.AI',
        description: 'Courses on machine learning, deep learning, and generative AI.',
        href: 'https://www.deeplearning.ai/courses/',
      },
      {
        name: 'fast.ai — Practical Deep Learning',
        description: 'A practical, code-first deep learning course for developers.',
        href: 'https://course.fast.ai/',
      },
      {
        name: 'Hugging Face LLM Course',
        description: 'Hands-on lessons covering transformers, NLP, and language models.',
        href: 'https://huggingface.co/learn/llm-course/chapter1/1',
      },
      {
        name: 'Google ML Crash Course',
        description: 'An interactive introduction to core machine learning concepts.',
        href: 'https://developers.google.com/machine-learning/crash-course',
      },
      {
        name: 'Hugging Face Deep RL Course',
        description: 'A free practical course on deep reinforcement learning.',
        href: 'https://huggingface.co/learn/deep-rl-course/unit0/introduction',
      },
      {
        name: 'Kaggle Learn',
        description: 'Short practical courses on Python, machine learning, and data.',
        href: 'https://www.kaggle.com/learn',
      },
    ],
  },
  {
    title: 'AI Engineering & LLMs',
    resources: [
      {
        name: 'Anthropic Prompt Engineering',
        description: 'Official guidance for designing effective prompts for Claude.',
        href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
      },
      {
        name: 'Anthropic Cookbook',
        description: 'Practical examples for agents, retrieval, tools, and integrations.',
        href: 'https://github.com/anthropics/anthropic-cookbook',
      },
      {
        name: 'OpenAI Cookbook',
        description: 'Code examples and guides for building with OpenAI models.',
        href: 'https://cookbook.openai.com/',
      },
      {
        name: 'LangChain Docs',
        description: 'Documentation for building agentic and LLM-powered applications.',
        href: 'https://docs.langchain.com/',
      },
      {
        name: 'A Year of Building with LLMs',
        description: 'Field notes and lessons from shipping production LLM products.',
        href: 'https://applied-llms.org/',
      },
      {
        name: "Chip Huyen's Blog",
        description: 'Essays on AI systems, machine learning, and production engineering.',
        href: 'https://huyenchip.com/blog/',
      },
    ],
  },
  {
    title: 'Developer Fundamentals / CS',
    resources: [
      {
        name: 'The Odin Project',
        description: 'A free full-stack development curriculum built around projects.',
        href: 'https://www.theodinproject.com/',
      },
      {
        name: 'freeCodeCamp',
        description: 'Interactive programming lessons, projects, and certifications.',
        href: 'https://www.freecodecamp.org/learn/',
      },
      {
        name: 'Harvard CS50x',
        description: 'Harvard’s free introduction to computer science and programming.',
        href: 'https://cs50.harvard.edu/x/',
      },
      {
        name: 'MDN Web Docs',
        description: 'A trusted reference for HTML, CSS, JavaScript, and browser APIs.',
        href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development',
      },
      {
        name: 'roadmap.sh',
        description: 'Community-built learning roadmaps for developer roles and tools.',
        href: 'https://roadmap.sh/',
      },
      {
        name: 'Teach Yourself CS',
        description: 'A focused path through core computer science books and lectures.',
        href: 'https://teachyourselfcs.com/',
      },
      {
        name: 'System Design Primer',
        description: 'An open-source guide to designing scalable software systems.',
        href: 'https://github.com/donnemartin/system-design-primer',
      },
    ],
  },
  {
    title: 'Cybersecurity',
    resources: [
      {
        name: 'PortSwigger Web Security Academy',
        description: 'Free lessons and interactive labs for web application security.',
        href: 'https://portswigger.net/web-security',
      },
      {
        name: 'TryHackMe Learning Paths',
        description: 'Guided, browser-based cybersecurity learning and practice rooms.',
        href: 'https://tryhackme.com/paths',
      },
      {
        name: 'Hack The Box Academy',
        description: 'Hands-on modules for penetration testing and defensive security.',
        href: 'https://academy.hackthebox.com/',
      },
      {
        name: 'OWASP Web Security Testing Guide',
        description: 'A structured reference for testing web applications securely.',
        href: 'https://owasp.org/www-project-web-security-testing-guide/',
      },
      {
        name: 'picoCTF',
        description: 'Beginner-friendly security challenges created by Carnegie Mellon.',
        href: 'https://picoctf.org/',
      },
      {
        name: 'OverTheWire',
        description: 'Command-line security games that build practical Linux skills.',
        href: 'https://overthewire.org/wargames/',
      },
    ],
  },
  {
    title: 'Networking',
    resources: [
      {
        name: 'Cisco Networking Academy',
        description: 'Networking courses covering foundations, devices, and operations.',
        href: 'https://www.netacad.com/courses/networking',
      },
      {
        name: 'Practical Networking',
        description: 'Clear lessons on subnetting, routing, switching, and packet flow.',
        href: 'https://www.practicalnetworking.net/',
      },
      {
        name: 'Cloudflare Learning Center',
        description: 'Readable guides to networks, routing, protocols, DNS, and security.',
        href: 'https://www.cloudflare.com/learning/network-layer/',
      },
      {
        name: 'Professor Messer Network+',
        description: 'A free video course covering practical networking fundamentals.',
        href: 'https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/',
      },
      {
        name: "Beej's Guide to Network Programming",
        description: 'A friendly introduction to sockets and network programming.',
        href: 'https://beej.us/guide/bgnet/',
      },
      {
        name: 'Wireshark Documentation',
        description: 'Official guides for capturing and understanding network traffic.',
        href: 'https://www.wireshark.org/docs/',
      },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Resources',
  description: 'A curated collection of learning resources for development, AI, cybersecurity, and networking.',
  alternates: { canonical: '/resources/' },
};

export default function ResourcesPage() {
  return (
    <div className="page resources-page">
      <PageIntro
        eyebrow="Explore"
        title="Resources"
        description="A practical library of courses, references, and hands-on learning sites for software development, AI, cybersecurity, and networking."
      />

      <div className="resource-directory">
        {resourceGroups.map((group) => {
          const headingId = `resource-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return (
            <section className="resource-group" key={group.title} aria-labelledby={headingId}>
              <h2 id={headingId}>{group.title}</h2>
              <ul className="resource-grid">
                {group.resources.map((resource) => (
                  <li key={resource.href}>
                    <a href={resource.href} target="_blank" rel="noopener noreferrer">
                      <span className="resource-name">
                        {resource.name}
                        <ArrowUpRight size={13} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="resource-description">{resource.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
