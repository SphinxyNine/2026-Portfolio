'use client';

import { Expand, X } from 'lucide-react';
import { SkeletonImage } from './skeleton-image';
import { useRef } from 'react';

type Screenshot = { src: string; alt: string };

export function ProjectImagePreview({ screenshot, title }: { screenshot: Screenshot; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="project-preview-trigger"
        type="button"
        aria-label={`Enlarge preview of ${title}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <SkeletonImage src={screenshot.src} alt={screenshot.alt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 520px" />
        <span className="project-preview-hint" aria-hidden="true"><Expand size={14} /> Preview image</span>
      </button>
      <div className="project-preview-hover" aria-hidden="true">
        <div className="project-preview-hover-image">
          <SkeletonImage src={screenshot.src} alt="" sizes="(max-width: 900px) 90vw, 760px" />
        </div>
        <p>{title}</p>
      </div>
      <dialog
        ref={dialogRef}
        className="project-preview-dialog"
        aria-label={`${title} image preview`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="project-preview-dialog-header">
          <p>{title}</p>
          <button type="button" aria-label="Close image preview" onClick={() => dialogRef.current?.close()}><X size={18} /></button>
        </div>
        <div className="project-preview-dialog-image">
          <SkeletonImage src={screenshot.src} alt={screenshot.alt} sizes="(max-width: 700px) 95vw, 1000px" />
        </div>
      </dialog>
    </>
  );
}
