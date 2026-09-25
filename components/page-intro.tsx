'use client';

import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.header
      className="page-intro"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-intro-copy">{description}</p>
    </motion.header>
  );
}
