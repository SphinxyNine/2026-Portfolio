'use client';

import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Portrait = {
  src: string;
  alt: string;
  treatment: 'cutout' | 'crop';
};

export function HeroPortraitCarousel({ portraits }: { portraits: readonly Portrait[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePortrait = portraits[activeIndex];

  function showNextPortrait() {
    setActiveIndex((current) => (current + 1) % portraits.length);
  }

  return (
    <figure className={`hero-portrait hero-portrait--${activePortrait.treatment}`}>
      <button
        className="hero-portrait-button"
        type="button"
        aria-label={`Show next portrait. Currently showing image ${activeIndex + 1} of ${portraits.length}: ${activePortrait.alt}`}
        onClick={showNextPortrait}
      >
        {portraits.map((portrait, index) => (
          <Image
            className={`hero-portrait-media hero-portrait-media--${portrait.treatment}${index === activeIndex ? ' is-active' : ''}`}
            key={portrait.src}
            src={portrait.src}
            alt={index === activeIndex ? portrait.alt : ''}
            aria-hidden={index !== activeIndex}
            fill
            sizes="(max-width: 700px) 80vw, 430px"
            priority={index === 0}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        ))}
        <span className="hero-portrait-hint" aria-hidden="true">
          <RefreshCw size={12} />
          Click to change
          <span>{activeIndex + 1}/{portraits.length}</span>
        </span>
      </button>
      <figcaption className="sr-only" aria-live="polite">Showing portrait {activeIndex + 1} of {portraits.length}.</figcaption>
    </figure>
  );
}
