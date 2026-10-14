'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
import type { Project } from '@/data/portfolio';

type Gesture = { pointerId: number; startX: number; startY: number; dragging: boolean };

function wrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

function cardOffset(index: number, activeIndex: number, length: number) {
  const forward = wrappedIndex(index - activeIndex, length);
  return forward > length / 2 ? forward - length : forward;
}

export function SelectedWorkCarousel({ projects }: { projects: readonly Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<Gesture | null>(null);
  const lastDragAt = useRef(0);
  const count = projects.length;

  if (!count) return null;

  function show(index: number) {
    setActiveIndex(wrappedIndex(index, count));
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    gesture.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, dragging: false };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (!current.dragging && (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy))) return;
    if (!current.dragging) {
      current.dragging = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDragX(Math.max(-180, Math.min(180, dx)));
  }

  function finishGesture(event: ReactPointerEvent<HTMLDivElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    gesture.current = null;
    if (current.dragging) {
      lastDragAt.current = Date.now();
      const dx = event.clientX - current.startX;
      const halfwayToNextCard = Math.min(169, event.currentTarget.clientWidth * 0.405);
      if (!cancelled && Math.abs(dx) > halfwayToNextCard) show(activeIndex + (dx < 0 ? 1 : -1));
    }
    setDragX(0);
    setDragging(false);
  }

  function onClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (Date.now() - lastDragAt.current < 300) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(activeIndex + 1);
    }
  }

  return (
    <div className="selected-work-carousel">
      <div
        className="coverflow-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects. Use left and right arrow keys to change projects."
        tabIndex={0}
        data-dragging={dragging}
        style={{ '--drag-x': `${dragX}px` } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => finishGesture(event)}
        onPointerCancel={(event) => finishGesture(event, true)}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        onDragStart={(event) => event.preventDefault()}
      >
        {projects.map((project, index) => {
          const offset = cardOffset(index, activeIndex, count);
          const active = offset === 0;
          const adjacent = Math.abs(offset) === 1;
          const side = active ? 'active' : adjacent ? offset < 0 ? 'prev' : 'next' : 'far';
          const screenshot = project.screenshots[0];
          const style = {
            '--card-shift': `${offset * 338}px`,
            '--mobile-shift': `${offset * 92}%`,
            '--card-rotate': `${offset * -7}deg`,
          } as CSSProperties;

          return (
            <article
              className="coverflow-card"
              data-side={side}
              key={project.slug}
              style={style}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${project.client}`}
            >
              <div className="coverflow-card-content" aria-hidden={!active}>
                {screenshot && (
                  <div className="coverflow-image">
                    <Image src={screenshot.src} alt={active ? screenshot.alt : ''} fill sizes="(max-width: 700px) 90vw, 660px" draggable={false} />
                  </div>
                )}
                <div className="coverflow-copy">
                  <p className="eyebrow">{project.category}</p>
                  <p className="project-client">{project.client}</p>
                  <h3>{project.title}</h3>
                  <p className="coverflow-summary">{project.summary}</p>
                  <ul className="tag-list coverflow-tags" aria-label="Tools and technologies">
                    {project.tools.slice(0, 4).map((tool) => <li key={tool}>{tool}</li>)}
                  </ul>
                  <Link className="inline-link coverflow-link" href={`/work/${project.slug}`} tabIndex={active ? 0 : -1}>
                    View project <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              {adjacent && (
                <button
                  className="coverflow-select"
                  type="button"
                  tabIndex={-1}
                  aria-label={`Show ${project.client}: ${project.title}`}
                  onClick={() => show(index)}
                />
              )}
            </article>
          );
        })}
      </div>
      <div className="coverflow-controls">
        <p aria-live="polite"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span> / {String(count).padStart(2, '0')}</span><span className="sr-only"> — {projects[activeIndex].client}: {projects[activeIndex].title}</span></p>
        <div className="coverflow-arrows" aria-label="Project carousel controls">
          <button type="button" aria-label="Previous project" disabled={count < 2} onClick={() => show(activeIndex - 1)}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" aria-label="Next project" disabled={count < 2} onClick={() => show(activeIndex + 1)}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
