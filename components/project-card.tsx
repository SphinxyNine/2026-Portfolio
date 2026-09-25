'use client';

import { ArrowUpRight, EyeOff, ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/portfolio';
import { DraftBadge } from '@/components/draft-badge';
import { TagList } from '@/components/tag-list';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const projectNumber = String(index + 1).padStart(2, '0');

  if (project.visibility === 'private') {
    return (
      <motion.article
        className="private-project-card"
        initial={{ opacity: 0, y: 18 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <span className="project-number">{projectNumber}</span>
        <span className="private-icon"><EyeOff size={20} /></span>
        <div>
          <p className="eyebrow">Private client work</p>
          <h2>Selected client implementation</h2>
          <p>Details available upon request.</p>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${project.slug}/`} className="project-card-link" aria-label={`View ${project.title}`}>
        <div className="project-card-visual">
          {project.image ? (
            <Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
          ) : (
            <div className="visual-placeholder" aria-label="Project image to be added">
              <span className="project-number">{projectNumber}</span>
              <ImageIcon size={28} strokeWidth={1.25} />
              <small>Approved project image to be added</small>
              <span>{project.category}</span>
            </div>
          )}
        </div>
        <div className="project-card-content">
          <div className="project-card-meta">
            <p className="eyebrow">{project.category}</p>
            {project.placeholder && <DraftBadge>Project placeholder</DraftBadge>}
          </div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <TagList items={project.tools} />
          <span className="card-action">View case study outline <ArrowUpRight size={16} /></span>
        </div>
      </Link>
    </motion.article>
  );
}
